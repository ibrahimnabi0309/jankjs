import { initJankJS } from 'jankjs';

// Mount the HUD (demo is always in "dev" mode)
initJankJS({
  position: 'bottom-right',
  theme: 'dark',
  metrics: ['jank', 'cls', 'lcp', 'assets'],
  onJank: (event) => {
    log(`[Jank] ${event.value.toFixed(1)} ms at t=${event.timestamp.toFixed(0)} ms`);
  },
});

// ---------------------------------------------------------------------------
// Demo helpers
// ---------------------------------------------------------------------------

const logEl = document.getElementById('log') as HTMLDivElement;

function log(msg: string): void {
  logEl.textContent += `\n${msg}`;
  logEl.scrollTop = logEl.scrollHeight;
}

// Simulate a long task (jank)
document.getElementById('btn-jank')?.addEventListener('click', () => {
  log('[Demo] Triggering 200 ms long task...');
  const start = Date.now();

  while (Date.now() - start < 200) {}
  log('[Demo] Done.');
});

// Simulate a layout shift by abruptly resizing an element
document.getElementById('btn-shift')?.addEventListener('click', () => {
  log('[Demo] Triggering layout shift...');
  const el = document.createElement('div');
  el.style.cssText = 'height:0;background:#4ade80;transition:none;';
  document.body.prepend(el);
  // Force shift without user interaction (no input in the last 500 ms)
  requestAnimationFrame(() => {
    el.style.height = '80px';
    setTimeout(() => el.remove(), 500);
  });
});

// Simulate loading a large resource
document.getElementById('btn-asset')?.addEventListener('click', () => {
  log('[Demo] Fetching large asset...');
  fetch('https://httpbin.org/bytes/102400')
    .then((r) => r.blob())
    .then((b) => log(`[Demo] Loaded ${(b.size / 1024).toFixed(1)} KB`))
    .catch(() => log('[Demo] Fetch failed (network or CORS)'));
});

document.getElementById('btn-clear')?.addEventListener('click', () => {
  logEl.textContent = 'Log cleared.';
});
