const glyphs = 'ABCDEFGHJKLMNPRSTUVXYZ0123456789#$%&/<>';
const originalTexts = new WeakMap<Text, string>();

// Characters left of the progress point are settled; the rest show random glyphs. Spaces stay put.
export function decodeFrame(text: string, progress: number, random = Math.random) {
  return text.replace(/\S/g, (char, index: number) => index / text.length < progress ? char : glyphs[Math.floor(random() * glyphs.length)]);
}

console.assert(decodeFrame('Gian Karlo', 1) === 'Gian Karlo' && decodeFrame('ab c', 0, () => 0) === 'AA A', 'decodeFrame self-check failed');

/** Decodes every text node inside `root`; returns a cancel function that restores the original text. */
export function scramble(root: HTMLElement, duration: number, onDone?: () => void) {
  // Keep the accessible name readable while the visible text is noise.
  const labelled = root.hasAttribute('aria-label');
  if (!labelled) root.setAttribute('aria-label', root.innerText.replace(/\s+/g, ' ').trim());
  const nodes: [Text, string][] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const textNode = walker.currentNode as Text;
    let orig = originalTexts.get(textNode);
    if (orig === undefined) {
      orig = textNode.textContent ?? '';
      originalTexts.set(textNode, orig);
    }
    nodes.push([textNode, orig]);
  }
  const start = performance.now();
  let frame = 0;
  let finished = false;
  const restore = () => {
    if (finished) return;
    finished = true;
    nodes.forEach(([node, text]) => { node.textContent = text; });
    if (!labelled) root.removeAttribute('aria-label');
    onDone?.();
  };
  let lastUpdate = 0;
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    if (now - lastUpdate > 30 || progress >= 1) {
      lastUpdate = now;
      nodes.forEach(([node, text]) => { node.textContent = decodeFrame(text, progress); });
    }
    if (progress < 1) frame = requestAnimationFrame(tick); else restore();
  };
  frame = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(frame); restore(); };
}
