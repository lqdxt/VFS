# Localhost VFS

A virtual file system in your browser: add files and folders, edit them, run `index.html` in the Preview tab, and import or export ZIP, TAR, TAR.GZ and JSON backups. Everything is static, so it works on GitHub Pages as is.

## Deploy to GitHub Pages

1. Create an empty repo on GitHub (for example `localhost-vfs`).
2. In this folder, run:

```bash
git init && git add . && git commit -m "Localhost VFS"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/localhost-vfs.git
git push -u origin main
```

3. On GitHub open **Settings → Pages**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. Your app will be live at `https://YOUR-USERNAME.github.io/localhost-vfs/`.

## Run locally

```bash
npx serve .
```

## Change the icons

`icons.js` is pre-built and committed, so Pages needs no build step. To add file types, edit the `map` in `build-icons.mjs`, then:

```bash
npm install && npm run build:icons
```

Projects are saved in the browser's local storage, so use Export to keep a copy.
