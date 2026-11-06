---
name: verify-web
description: Open a web page in headless Chromium inside the devbox to take a screenshot and report console errors, failed requests and third-party hosts. Use to verify any website or UI change actually works, including http://*.localhost project URLs behind Traefik.
---

# Verify a web page

Run: `node <skill-dir>/check.js <url> [out.png]`   (Playwright and Chromium are preinstalled; `NODE_PATH` is set.)

It prints the title, HTTP status, console errors, failed requests, any non-local hosts contacted (privacy check) and
saves a full-page screenshot (default `/tmp/verify-web.png`; open it with the Read tool to look at it).

Details that matter in the devbox:
- Inside the container `*.localhost` resolves to the container itself, so the script maps it to Traefik
  (`devbox-traefik`) with `--host-resolver-rules`. Use the same URLs as in the browser, e.g. `http://myproj.localhost`.
- Traefik asks for basic auth on every page. Set `DEVBOX_AUTH=admin:<password>` in the environment (the password is
  `CODER_PASSWORD` in the devbox repo's `.env`); the script sends it as HTTP credentials. Put it in `~/.bashrc` once.
- For a container reachable directly on `devbox_network`, use `http://<container>:<port>`; no login is needed.
- Any host other than localhost/the container that shows up under "external hosts" violates `privacy-by-default`: fix it.
