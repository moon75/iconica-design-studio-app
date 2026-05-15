# Content Backend Recommendation

Use Sanity as the content backend for this site when you want non-developers to add, remove, and edit content without touching React code.

Current state:
- Products, portfolio projects, press items, team members, and images are hardcoded in `src/main.jsx`.
- This is fine for initial build-out, but it is not ideal for ongoing product/blog updates.
- Sanity frontend packages and starter query/client files have been added. See `SANITY_SETUP.md`.

Recommended Sanity content types:
- Product: title, slug, category, price, featured, images, short description, full description, dimensions, material, lead time, availability.
- Product Category: title, slug, display order.
- Blog Post: title, slug, excerpt, cover image, body content, author, published date, featured flag.
- Portfolio Project: title, slug, location, category, intro, gallery images, project text, featured flag.
- Press Feature: publication, title, date, link, image, excerpt.
- Team Member: name, role, image, bio, display order.
- Site Settings: logo, navigation labels, social links, contact email, footer text.

Recommended build path:
1. Keep the current static React data until the design is approved.
2. Add a Sanity Studio project.
3. Move the hardcoded arrays from `src/main.jsx` into Sanity documents.
4. Replace local arrays with Sanity API queries.
5. Add draft/preview later if needed.

For ecommerce checkout, use Shopify or Stripe. For curated inquiry-based furniture, Sanity plus the existing consultation form is enough.
