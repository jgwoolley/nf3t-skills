#!/usr/bin/env node
// Usage: node check.js <url> [out.png]
const { chromium } = require('playwright');

const url = process.argv[2];
const out = process.argv[3] || '/tmp/verify-web.png';
if (!url) { console.error('usage: check.js <url> [out.png]'); process.exit(2); }

const traefik = process.env.DEVBOX_TRAEFIK || 'devbox-traefik';
const [user, ...rest] = (process.env.DEVBOX_AUTH || '').split(':');
const httpCredentials = user ? { username: user, password: rest.join(':') } : undefined;
const local = (h) => h === 'localhost' || h.endsWith('.localhost') || h === '127.0.0.1' || h === traefik;

(async () => {
  const browser = await chromium.launch({ args: [`--host-resolver-rules=MAP *.localhost ${traefik}`] });
  const ctx = await browser.newContext({ httpCredentials, viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const errors = [], failed = [], hosts = new Set();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => failed.push(`${r.url()} (${r.failure()?.errorText})`));
  page.on('request', (r) => { try { const h = new URL(r.url()).hostname; if (!local(h)) hosts.add(h); } catch {} });
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch((e) => { console.error('goto failed:', e.message); return null; });
  if (res) await page.screenshot({ path: out, fullPage: true });
  console.log(`url:      ${url}`);
  console.log(`status:   ${res ? res.status() : 'no response'}${res && res.status() === 401 ? '  (set DEVBOX_AUTH=admin:<password>)' : ''}`);
  console.log(`title:    ${res ? await page.title() : ''}`);
  console.log(`console errors: ${errors.length ? '\n  ' + errors.join('\n  ') : 'none'}`);
  console.log(`failed requests: ${failed.length ? '\n  ' + failed.join('\n  ') : 'none'}`);
  console.log(`external hosts: ${hosts.size ? [...hosts].join(', ') : 'none'}`);
  if (res) console.log(`screenshot: ${out}`);
  await browser.close();
  process.exit(res && res.status() < 400 && !errors.length ? 0 : 1);
})();
