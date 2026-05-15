# Sanity Setup For Launch

For launch today, keep the current static React content live. Connect Sanity when the Sanity project is ready so products, portfolio projects, blogs, press, and team members can be edited without touching code.

## 1. Create Sanity Studio

Run this from the project parent folder:

```bash
npm create sanity@latest -- --dataset production --template clean --typescript --output-path studio
cd studio
npm run dev
```

Open the Studio URL Sanity prints, usually:

```txt
http://localhost:3333
```

## 2. Add Frontend Packages

In the React site folder:

```bash
npm install @sanity/client @sanity/image-url
```

The frontend scaffold is already in:

```txt
src/lib/sanity.js
src/lib/sanityQueries.js
```

## 3. Add Environment Variables

Copy `.env.example` to `.env`:

```bash
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-05-16
```

On Netlify, add the same values in Site settings > Environment variables.

## 4. Add CORS Origins

In Sanity Manage, add CORS origins for:

```txt
http://localhost:5173
https://your-live-domain.com
```

Do not allow credentials for public read-only frontend content.

CLI alternative from inside the Sanity Studio folder:

```bash
npx sanity cors add http://localhost:5173
npx sanity cors add https://your-live-domain.com
```

## 5. Recommended Schemas

Start with these document types:

- `product`
- `productCategory`
- `portfolioProject`
- `blogPost`
- `pressFeature`
- `teamMember`
- `siteSettings`

## 6. Launch-Today Recommendation

Do not block launch on Sanity unless the content team must edit today. Deploy the static site now, then connect Sanity as phase two.

The current React data can stay as fallback while Sanity content is being entered.

