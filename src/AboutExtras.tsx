import { useEffect, useRef, useState } from 'react';
import { Check, Code2, UserRound } from 'lucide-react';
import {
  siC,
  siFigma,
  siGit,
  siGithub,
  siJavascript,
  siPython,
  siSupabase,
  siTypescript,
  siVercel,
} from 'simple-icons';
import { portfolio as p, projects, type PortfolioProject } from './portfolio';
import { designIcons } from './designIcons';
import { editorIcons } from './editorIcons';

export const techIcons = {
  Python: siPython,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  C: siC,
  Figma: siFigma,
  Git: siGit,
  GitHub: siGithub,
  Vercel: siVercel,
  Supabase: siSupabase,
  Photoshop: designIcons.adobephotoshop,
  Illustrator: designIcons.adobeillustrator,
  Canva: designIcons.canva,
  'VS Code': editorIcons.visualstudiocode,
};

const languageDescriptions: Record<string, string> = {
  Python: 'Scripting, algorithms, and backend automation.',
  TypeScript: 'Type-safe UI components and predictable app state.',
  JavaScript: 'Interactive browser views and Node.js / Express APIs.',
  C: 'Low-level memory management, pointers, and systems logic.',
};

const toolkit = p.tools.filter((t) => t.category !== 'IDE & AI');

function getProjectStackSet(proj: PortfolioProject): Set<string> {
  const matched = new Set<string>();
  const allNames = [...p.skills, ...toolkit.map((t) => t.name)];
  for (const tech of proj.technologies) {
    const low = tech.toLowerCase();
    for (const name of allNames) {
      if (low === name.toLowerCase() || low.startsWith(`${name.toLowerCase()} `)) {
        matched.add(name);
      }
    }
  }
  if (proj.caseStudyDetail?.startingDesign.lofiPrototype.url?.includes('figma.com')) {
    matched.add('Figma');
  }
  if (proj.repository || proj.id === 'project-3') {
    matched.add('Git');
    matched.add('GitHub');
  }
  return matched;
}

const MORPH_DURATION_MS = 650;
const PORTRAIT_IMG_ASPECT = 1280 / 720;

const VERT_SRC = `
attribute vec2 aPos;
varying vec2 vScreen;
void main() {
  vScreen = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision mediump float;
varying vec2 vScreen;
uniform sampler2D uDark;
uniform sampler2D uLight;
uniform float uProgress;
uniform float uCanvasAspect;
uniform float uImgAspect;

vec2 coverTopUv(vec2 sc) {
  if (uCanvasAspect < uImgAspect) {
    float sx = uCanvasAspect / uImgAspect;
    return vec2(0.5 + (sc.x - 0.5) * sx, sc.y);
  }
  float sy = uImgAspect / uCanvasAspect;
  return vec2(sc.x, sc.y * sy);
}

void addLandmark(vec2 uv, vec2 pt, vec2 delta, inout vec2 sumFlow, inout float sumW) {
  vec2 diff = uv - pt;
  diff.x *= uImgAspect;
  float d2 = dot(diff, diff);
  float w = exp(-d2 * 52.0);
  sumFlow += delta * w;
  sumW += w;
}

vec2 landmarkFlow(vec2 uv) {
  vec2 sumFlow = vec2(0.0);
  float sumW = 0.05;
  addLandmark(uv, vec2(0.492, 0.111), vec2(-17.0 / 1280.0,  9.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.387, 0.194), vec2( -9.0 / 1280.0,  7.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.598, 0.194), vec2(-10.0 / 1280.0,  5.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.383, 0.389), vec2( -6.0 / 1280.0,  9.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.613, 0.389), vec2( -5.0 / 1280.0, -5.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.418, 0.465), vec2( -6.0 / 1280.0,  6.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.578, 0.465), vec2( -4.0 / 1280.0,  1.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.498, 0.413), vec2(-10.0 / 1280.0,  8.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.455, 0.503), vec2(-11.0 / 1280.0, -4.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.537, 0.503), vec2(  4.0 / 1280.0, -5.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.496, 0.580), vec2( -4.0 / 1280.0,  6.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.443, 0.674), vec2( -1.0 / 1280.0, -1.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.553, 0.674), vec2(  2.0 / 1280.0, -2.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.492, 0.736), vec2(  2.0 / 1280.0, -3.0 / 720.0), sumFlow, sumW);
  addLandmark(uv, vec2(0.301, 0.833), vec2(  0.0,           0.0),         sumFlow, sumW);
  addLandmark(uv, vec2(0.699, 0.833), vec2( 10.0 / 1280.0, -3.0 / 720.0), sumFlow, sumW);

  float edgeFade = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x)
                 * smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);
  return (sumFlow / sumW) * edgeFade;
}

void main() {
  vec2 uv = coverTopUv(vScreen);
  float m = clamp(uProgress, 0.0, 1.0);
  vec2 flow = landmarkFlow(uv);

  vec2 eyeCenter = vec2(0.491, 0.367);
  vec2 eyeRel = (uv - eyeCenter) / vec2(0.135, 0.095);
  float eyeMask = exp(-dot(eyeRel, eyeRel) * 1.45);
  vec2 glassPull = (uv - eyeCenter) * eyeMask;

  vec2 uvDark = clamp(uv - m * flow + glassPull * (m * 0.14), 0.001, 0.999);
  vec2 uvLight = clamp(
    uv + (1.0 - m) * flow - glassPull * ((1.0 - m) * 0.24) - vec2(0.0, (1.0 - m) * eyeMask * 0.018),
    0.001,
    0.999
  );

  vec4 colDark = texture2D(uDark, uvDark);
  vec4 colLight = texture2D(uLight, uvLight);
  float blend = smoothstep(0.0, 1.0, m);
  float alpha = clamp(blend + eyeMask * sin(m * 3.14159265) * 0.12, 0.0, 1.0);
  gl_FragColor = mix(colDark, colLight, alpha);
}
`;

function withVersion(src: string) {
  return `${src}${src.includes('?') ? '&' : '?'}v=2`;
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createTexture(gl: WebGLRenderingContext, img: HTMLImageElement) {
  const tex = gl.createTexture();
  if (!tex) return null;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  return tex;
}

export function Portrait({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const [glReady, setGlReady] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true,
  );

  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<number>(isDark ? 0 : 1);
  const targetRef = useRef<number>(isDark ? 0 : 1);
  const renderRef = useRef<((progress: number) => void) | null>(null);
  const rafRef = useRef<number | null>(null);

  const darkSrc = withVersion(p.portrait.darkSrc);
  const lightSrc = withVersion(p.portrait.lightSrc);

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains('dark'));
    const onThemeEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ dark?: boolean }>).detail;
      setIsDark(typeof detail?.dark === 'boolean' ? detail.dark : document.documentElement.classList.contains('dark'));
    };
    const observer = new MutationObserver(sync);

    window.addEventListener('gk-theme-change', onThemeEvent);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('gk-theme-change', onThemeEvent);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame || failed) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true, powerPreference: 'high-performance' });
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

    loadImg(darkSrc, (img) => { texDark = createTexture(gl, img); });
    loadImg(lightSrc, (img) => { texLight = createTexture(gl, img); });

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
      <div className="mb-4 flex items-center justify-between border-b border-[rgb(var(--g200))] pb-3.5 font-mono text-[11px] leading-none text-[rgb(var(--g500))]">
        <span className="inline-flex items-center gap-2 font-semibold text-[rgb(var(--accent))]">
          <span className="pulse-dot h-2 w-2 rounded-full bg-[rgb(var(--accent))]" aria-hidden="true" />
          <span>Portrait</span>
        </span>
        <span>Gordon College</span>
      </div>

      <div
        ref={frameRef}
        className="portrait-frame relative mx-auto aspect-[10/9] w-full max-w-[360px] overflow-hidden bg-[rgb(var(--g50))] lg:mx-0 lg:max-w-none lg:flex-1 lg:min-h-[290px]"
      >
        {p.portrait.lightSrc && p.portrait.darkSrc && !failed ? (
          <>
            <img
              src={isDark ? darkSrc : lightSrc}
              alt={isDark ? `${p.portrait.alt} (dark mode, without glasses)` : `${p.portrait.alt} (light mode, wearing sunglasses)`}
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
            <span className="mt-1 font-mono text-xs text-[rgb(var(--g500))]">
              {p.title}
            </span>
          </div>
        )}
      </div>

      <figcaption className="mt-3.5">
        <strong className="block font-display-ui text-[14px] font-semibold text-[rgb(var(--ink))]">
          {p.name}
        </strong>
        <span className="font-mono text-xs text-[rgb(var(--g500))]">{p.title}</span>
      </figcaption>
    </figure>
  );
}

export function Toolkit() {
  const [projectId, setProjectId] = useState<'all' | string>('all');
  const [activeToolName, setActiveToolName] = useState<string | null>(null);

  const selectedProject = projects.find((item) => item.id === projectId);
  const projectStack = selectedProject ? getProjectStackSet(selectedProject) : null;
  const activeTool = toolkit.find((t) => t.name === activeToolName);

  const matchCount = projectStack
    ? p.skills.filter((s) => projectStack.has(s)).length +
      toolkit.filter((t) => projectStack.has(t.name)).length
    : p.skills.length + toolkit.length;

  return (
    <div>
      {/* Project Stack Filter */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[rgb(var(--g200))] pb-4">
        <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Highlight stack used in project">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-[rgb(var(--g400))] mr-1">
            Project:
          </span>
          <button
            type="button"
            aria-pressed={projectId === 'all'}
            onClick={() => setProjectId('all')}
            className={`px-3 py-1.5 font-mono text-xs transition-colors border ${
              projectId === 'all'
                ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent))] font-semibold text-[rgb(var(--accent-fg))]'
                : 'border-[rgb(var(--g200))] text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
            }`}
          >
            All
          </button>
          {projects.map((proj) => {
            const active = projectId === proj.id;
            return (
              <button
                key={proj.id}
                type="button"
                aria-pressed={active}
                onClick={() => setProjectId(active ? 'all' : proj.id)}
                className={`px-3 py-1.5 font-mono text-xs transition-colors border ${
                  active
                    ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent))] font-semibold text-[rgb(var(--accent-fg))]'
                    : 'border-[rgb(var(--g200))] text-[rgb(var(--g500))] hover:text-[rgb(var(--ink))]'
                }`}
              >
                {proj.name}
              </button>
            );
          })}
        </div>
        <span className="font-mono text-xs text-[rgb(var(--accent))] font-medium">
          {selectedProject ? `${matchCount} used in ${selectedProject.name}` : `${matchCount} total`}
        </span>
      </div>

      {/* Core Programming Languages Grid (AGENTS.md: Python, TypeScript, JavaScript, and C) */}
      <div className="mb-10">
        <div className="mb-3.5 flex items-baseline justify-between">
          <h3 className="micro-label">Primary Languages</h3>
          <span className="font-mono text-[11px] text-[rgb(var(--g400))]">{p.skills.length} core</span>
        </div>
        <div className="grid grid-cols-1 divide-y divide-[rgb(var(--g200))] border-y border-[rgb(var(--g200))] sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
          {p.skills.map((lang) => {
            const icon = techIcons[lang as keyof typeof techIcons];
            const isMatch = !projectStack || projectStack.has(lang);
            return (
              <div
                key={lang}
                className={`py-5 transition-opacity sm:px-5 lg:first:pl-0 lg:last:pr-0 ${
                  isMatch ? 'opacity-100' : 'opacity-35'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center text-[rgb(var(--accent))]">
                    {icon ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={icon.path} />
                      </svg>
                    ) : (
                      <Code2 size={18} aria-hidden="true" />
                    )}
                  </span>
                  {projectStack ? (
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider ${
                        isMatch ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--g400))]'
                      }`}
                    >
                      {isMatch && <Check size={11} aria-hidden="true" />}
                      <span>{isMatch ? 'Used' : 'Unused'}</span>
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-[rgb(var(--g400))]">
                      Core
                    </span>
                  )}
                </div>
                <div className="mt-3 font-display-ui text-base font-bold text-[rgb(var(--ink))]">{lang}</div>
                <p className="mt-2 text-xs leading-relaxed text-[rgb(var(--g600))]">
                  {languageDescriptions[lang] || 'Core language.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Frameworks & Tools Compact Grid */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="micro-label">Frameworks, Cloud &amp; Design Tools</h3>
        <span className="font-mono text-[11px] text-[rgb(var(--g400))]">
          {toolkit.length} tools · select for note
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
        {toolkit.map((tool) => {
          const icon = techIcons[tool.name as keyof typeof techIcons];
          const isMatch = !projectStack || projectStack.has(tool.name);
          const isSelected = activeToolName === tool.name;
          return (
            <button
              key={tool.name}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setActiveToolName((curr) => (curr === tool.name ? null : tool.name))}
              className={`group flex min-h-[54px] items-center justify-between gap-2.5 border px-3.5 py-3 text-left transition-all ${
                isSelected
                  ? 'border-[rgb(var(--accent))] bg-[rgb(var(--surface))]'
                  : isMatch
                    ? projectStack
                      ? 'border-[rgb(var(--accent)/0.65)] bg-[rgb(var(--surface))] hover:border-[rgb(var(--accent))]'
                      : 'border-[rgb(var(--g200))] bg-[rgb(var(--surface))] hover:border-[rgb(var(--ink))]'
                    : 'border-dashed border-[rgb(var(--g200))] bg-transparent opacity-35 hover:opacity-75'
              }`}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="flex shrink-0 items-center text-[rgb(var(--accent))]">
                  {icon ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={icon.path} />
                    </svg>
                  ) : (
                    <Code2 size={16} aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0">
                  <strong className="block truncate font-display-ui text-[13px] font-semibold text-[rgb(var(--ink))]">
                    {tool.name}
                  </strong>
                  <span className="block truncate font-mono text-[9.5px] text-[rgb(var(--g400))]">
                    {tool.category}
                  </span>
                </span>
              </span>
              {projectStack && isMatch && (
                <Check size={13} className="shrink-0 text-[rgb(var(--accent))]" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      {/* Single-line Tool / Project Readout */}
      <div className="mt-5 flex min-h-[42px] items-center justify-between gap-3 border-t border-[rgb(var(--g200))] pt-4 font-mono text-xs text-[rgb(var(--g500))]">
        {activeTool ? (
          <span>
            <strong className="text-[rgb(var(--ink))]">{activeTool.name}</strong> ({activeTool.category}) —{' '}
            {activeTool.description}
          </span>
        ) : selectedProject ? (
          <span>
            Highlighted <strong className="text-[rgb(var(--ink))]">{selectedProject.name}</strong> stack.{' '}
            <a href={selectedProject.caseStudy} className="text-[rgb(var(--accent))] hover:underline">
              Open case study →
            </a>
          </span>
        ) : (
          <span>Pick a project to filter its stack, or click any tool for its role.</span>
        )}
      </div>
    </div>
  );
}
