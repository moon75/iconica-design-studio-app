export const productsQuery = `*[_type == "product"] | order(orderRank asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  price,
  featured,
  shortDescription,
  description,
  dimensions,
  material,
  leadTime,
  availability,
  images
}`

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  price,
  featured,
  shortDescription,
  description,
  dimensions,
  material,
  leadTime,
  availability,
  images
}`

export const portfolioProjectsQuery = `*[_type == "portfolioProject"] | order(orderRank asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  location,
  intro,
  body,
  featured,
  gallery
}`

export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  featured
}`

