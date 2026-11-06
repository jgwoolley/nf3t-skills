---
name: privacy-by-default
description: Apply the private-by-default rules to any project that handles user data, serves a web page, or pulls in tooling/dependencies. Use when creating a project, adding a feature that touches data, adding a dependency or third-party service, or setting up a build.
---

# Private by default

1. **Process locally.** If a feature can run in the browser (File API, Web Workers, WASM, IndexedDB, Canvas), do it there.
   Nothing the user loads is uploaded. Only add a server component when the browser genuinely cannot do the job, and say why.
2. **No third parties on the page.** No analytics, tag managers, CDN-hosted scripts/fonts/CSS, embeds, or remote icons.
   Self-host assets (npm package or vendored file). Check the built output for foreign hostnames:
   `grep -rhoE 'https?://[a-zA-Z0-9.-]+' dist | sort -u`.
3. **Lock the page down.** Send/Set: `Content-Security-Policy` (default-src 'self', no inline unless hashed),
   `Referrer-Policy: no-referrer`, `Permissions-Policy` denying camera/mic/geolocation unless needed,
   `<meta name="referrer" content="no-referrer">` for static hosting. Outbound links: `rel="noopener noreferrer"`.
4. **Storage is local and minimal.** Prefer in-memory, then `localStorage`/IndexedDB. No cookies unless required. No fingerprinting.
5. **Telemetry off where it cannot be removed.** The devbox sets these in its image; set them in CI/Dockerfiles/`.env.example` too:
   `DO_NOT_TRACK=1 NEXT_TELEMETRY_DISABLED=1 ASTRO_TELEMETRY_DISABLED=1 NUXT_TELEMETRY_DISABLED=1 GATSBY_TELEMETRY_DISABLED=1
   STORYBOOK_DISABLE_TELEMETRY=1 TURBO_TELEMETRY_DISABLED=1 NG_CLI_ANALYTICS=false EXPO_NO_TELEMETRY=1 VERCEL_TELEMETRY_DISABLED=1
   WRANGLER_SEND_METRICS=false CHECKPOINT_DISABLE=1 DOTNET_CLI_TELEMETRY_OPTOUT=1 NPM_CONFIG_UPDATE_NOTIFIER=false NPM_CONFIG_AUDIT=false NPM_CONFIG_FUND=false`.
   For a new framework or CLI, search its docs for the opt-out and add it; mention anything that cannot be disabled.
6. **Dependencies:** prefer few, prefer ones without network calls at runtime; read a new dependency's install/postinstall scripts.
7. **Secrets** stay in git-ignored `.env`/`secrets/`; commit only `.env.example` with placeholders.

When a request conflicts with a rule (e.g. needs an API call), do it the private way if possible, otherwise tell the user what leaves the machine.
