import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2026-05-16',
  useCdn: true,
})

const imageBuilder = createImageUrlBuilder(sanityClient)

export function urlFor(source) {
  return imageBuilder.image(source)
}

export async function sanityFetch(query, params = {}) {
  if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
    return null
  }

  return sanityClient.fetch(query, params)
}

