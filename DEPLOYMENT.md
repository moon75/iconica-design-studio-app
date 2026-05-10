# Deploying Iconica Design Studio

## Local Development

```bash
npm install
npm run dev
```

Local preview:

```txt
http://127.0.0.1:5173
```

This URL only works on your own computer.

## Production Build

```bash
npm run build
```

Vite will create a `dist` folder. The contents of `dist` are the production website.

## Bluehost Shared Hosting

1. Log in to Bluehost.
2. Open cPanel or File Manager.
3. Open the website root folder, usually `public_html`.
4. Upload the contents inside `dist`, not the `dist` folder itself.
5. Make sure these files are in `public_html`:
   - `index.html`
   - `assets/`
   - `.htaccess`
6. Visit the domain or subdomain.

## Recommended Workflow For Updates

For manual updates:

```bash
npm run build
```

Then upload the new `dist` contents to Bluehost.

For automatic updates, connect GitHub to a deployment pipeline that builds the app and uploads `dist` to Bluehost by FTP/SFTP.

## Content Updates

This is currently a static React site. Text and images are edited in `src/main.jsx`.

For client-editable content later, use one of these:

- WordPress as a CMS on Bluehost
- Sanity or Contentful as a headless CMS
- A JSON/API backend that React reads from

Do not put Instagram or CMS secret tokens directly inside React frontend code.
