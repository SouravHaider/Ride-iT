# Deploying Ride It to GitHub Pages

Your live demo URL will be: **https://souravhaider.github.io/Ride-iT/**

All config is already done (`.gitignore`, `experiments.baseUrl` in `app.json`, and
`build:web` / `deploy` scripts in `package.json`). Just run the steps below on your Mac.

## One-time setup

```bash
cd "path/to/ride-it"

# point the remote at the renamed repo (Ride-iT, case-sensitive)
git remote set-url origin https://github.com/SouravHaider/Ride-iT.git

# install the deploy helper (already listed in package.json)
npm install

# push your source code to GitHub
git add .
git commit -m "Configure web build + GitHub Pages deploy"
git push -u origin main
```

If git asks for a password, paste a **Personal Access Token**
(GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic),
scope: `repo`), not your account password.

## Deploy the live demo

```bash
npm run deploy
```

This builds the web version into `dist/`, adds a `.nojekyll` file (required so GitHub
doesn't hide the `_expo` folder), and pushes `dist/` to the `gh-pages` branch.

## Turn on GitHub Pages (one time)

1. Go to your repo on github.com → **Settings** → **Pages**
2. Under "Build and deployment" → Source: **Deploy from a branch**
3. Branch: **gh-pages**, folder: **/ (root)** → Save

Wait 1–2 minutes, then open **https://souravhaider.github.io/Ride-iT/**

## Updating later

Every time you change the app:

```bash
git add . && git commit -m "your message" && git push
npm run deploy
```

## Notes

- The base path is `/Ride-iT` and must match the repo name **exactly** (case-sensitive).
  If you ever rename the repo again, update
  `experiments.baseUrl` in `app.json` to match the new repo name.
- Expo web renders your React Native app in the browser. Native-only features
  (camera, GPS, push) may not work on the web demo — test the live link before sharing.
