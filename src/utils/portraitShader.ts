export const MORPH_DURATION_MS = 650;
export const PORTRAIT_IMG_ASPECT = 1280 / 720;

export const VERT_SRC = `
attribute vec2 aPos;
varying vec2 vScreen;
void main() {
  vScreen = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAG_SRC = `
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

export function withVersion(src: string) {
  return `${src}${src.includes('?') ? '&' : '?'}v=2`;
}

export function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function createShader(gl: WebGLRenderingContext, type: number, source: string) {
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

export function createTexture(gl: WebGLRenderingContext, img: HTMLImageElement) {
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
