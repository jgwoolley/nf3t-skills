---
name: new-project
description: Scaffold a new project (website, web app, tool) in ~/workspace with the standing rules already applied - git repo, privacy defaults, commit-linked build footer, and Traefik labels to get http://<name>.localhost. Use when the user asks to start, create or scaffold a new project.
---

# New project

1. Create `~/workspace/<name>` and `git init`. Ask for / set the `origin` remote (GitHub or GitLab) with `gh repo create` /
   `glab repo create` if the user wants it created (use-clis-first). Never commit anything yourself: tell the user to make the first commit (the footer link needs one to be real).
2. Add `.gitignore` (include `.env`, `secrets/`, `node_modules/`, build output) and `.env.example` with placeholders only.
3. If it is a website: add the footer (`build-footer` skill) and apply `privacy-by-default`
   (CSP and referrer headers, self-hosted assets, telemetry env in the Dockerfile/CI).
4. If it runs as a container, join the shared Traefik, no TLS, one project-prefixed name per router/service:

   ```yaml
   networks:
     proxy:
       external: true
       name: devbox_network
   services:
     web:
       networks: [default, proxy]
       labels:
         - traefik.enable=true
         - traefik.docker.network=proxy
         - traefik.http.routers.<name>-web.rule=Host(`<name>.localhost`)
         - traefik.http.routers.<name>-web.entrypoints=web
         - traefik.http.services.<name>-web.loadbalancer.server.port=<port>
   ```
   Do not publish host ports and do not run another Traefik. Traefik's basic auth covers the page automatically.
   Databases stay on the project's default network only.
5. Verify with the `verify-web` skill, then summarise the changes and leave them uncommitted for the user.
