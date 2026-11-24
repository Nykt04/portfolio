import { useEffect, useRef, useState } from 'react';
import { UserRound } from 'lucide-react';
import { portfolio as p } from '../../data/portfolio';
import { useTheme } from '../../hooks/useTheme';
import {
  createShader,
  createTexture,
  easeInOutCubic,
  FRAG_SRC,
  MORPH_DURATION_MS,
  PORTRAIT_IMG_ASPECT,
  VERT_SRC,
  withVersion,
} from '../../utils/portraitShader';

export function Portrait({ className = '' }: { className?: string }) {
  const { isDark } = useTheme();
  const [failed, setFailed] = useState(false);
  const [glReady, setGlReady] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<number>(isDark ? 0 : 1);
  const targetRef = useRef<number>(isDark ? 0 : 1);
  const renderRef = useRef<((progress: number) => void) | null>(null);
  const rafRef = useRef<number | null>(null);

  const darkSrc = withVersion(p.portrait.darkSrc);
  const lightSrc = withVersion(p.portrait.lightSrc);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame || failed) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const buf = gl.createBuffer();
    if (!buf) {
      gl.deleteProgram(program);
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'aPos');
    const uDark = gl.getUniformLocation(program, 'uDark');
    const uLight = gl.getUniformLocation(program, 'uLight');
    const uProgress = gl.getUniformLocation(program, 'uProgress');
    const uCanvasAspect = gl.getUniformLocation(program, 'uCanvasAspect');
    const uImgAspect = gl.getUniformLocation(program, 'uImgAspect');

    let disposed = false;
    let texDark: WebGLTexture | null = null;
    let texLight: WebGLTexture | null = null;
    let loadedCount = 0;

    const draw = (progress: number) => {
      if (disposed || !texDark || !texLight) return;
      const rect = frame.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      gl.viewport(0, 0, w, h);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texDark);
      gl.uniform1i(uDark, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texLight);
      gl.uniform1i(uLight, 1);

      gl.uniform1f(uProgress, progress);
      gl.uniform1f(uCanvasAspect, rect.width / rect.height);
      gl.uniform1f(uImgAspect, PORTRAIT_IMG_ASPECT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loadImg = (src: string, assign: (img: HTMLImageElement) => void) => {
      const img = new Image();
      img.onload = () => {
        if (disposed) return;
        assign(img);
        loadedCount += 1;
        if (loadedCount === 2) {
          renderRef.current = draw;
          setGlReady(true);
          draw(progressRef.current);
        }
      };
      img.onerror = () => {
        if (!disposed) setFailed(true);
      };
      img.src = src;
    };

    loadImg(darkSrc, (img) => {
      texDark = createTexture(gl, img);
    });
    loadImg(lightSrc, (img) => {
      texLight = createTexture(gl, img);
    });

    const ro = new ResizeObserver(() => {
      if (texDark && texLight) draw(progressRef.current);
    });
    ro.observe(frame);

    return () => {
      disposed = true;
      renderRef.current = null;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (texDark) gl.deleteTexture(texDark);
      if (texLight) gl.deleteTexture(texLight);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, [darkSrc, lightSrc, failed]);

  useEffect(() => {
    const nextTarget = isDark ? 0 : 1;
    targetRef.current = nextTarget;
    if (!glReady || !renderRef.current) {
      progressRef.current = nextTarget;
      return;
    }

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || Math.abs(progressRef.current - nextTarget) < 0.001) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      progressRef.current = nextTarget;
      renderRef.current(nextTarget);
      return;
    }

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const startVal = progressRef.current;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = Math.min(1, (now - startTime) / MORPH_DURATION_MS);
      const val = startVal + (nextTarget - startVal) * easeInOutCubic(elapsed);
      progressRef.current = val;
      renderRef.current?.(val);
      if (elapsed < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        progressRef.current = nextTarget;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isDark, glReady]);

  return (
    <figure className={`flex flex-col justify-between ${className}`}>
      <div
        ref={frameRef}
        className="portrait-frame relative mx-auto aspect-[10/9] w-full max-w-[360px] overflow-hidden bg-[rgb(var(--g50))] lg:mx-0 lg:min-h-[290px] lg:max-w-none lg:flex-1"
      >
        {p.portrait.lightSrc && p.portrait.darkSrc && !failed ? (
          <>
            <img
              src={isDark ? darkSrc : lightSrc}
              alt={
                isDark
                  ? `${p.portrait.alt} (dark mode, without glasses)`
                  : `${p.portrait.alt} (light mode, wearing sunglasses)`
              }
              width={1280}
              height={720}
              loading="eager"
              decoding="async"
              onError={() => setFailed(true)}
              className="absolute inset-0 block h-full w-full object-cover object-top"
            />
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 block h-full w-full ${glReady ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--accent)/0.1)] text-[rgb(var(--accent))]">
              <UserRound size={32} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <strong className="mt-3 font-display-ui text-sm font-semibold text-[rgb(var(--ink))]">
              {p.name}
            </strong>
            <span className="mt-1 font-mono text-xs text-[rgb(var(--g500))]">{p.title}</span>
          </div>
        )}
      </div>
    </figure>
  );
}
