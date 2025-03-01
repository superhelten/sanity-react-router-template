import groq from 'groq'

import {generatePngFromDocument} from '~/lib/og.server'
import {viewClient} from '~/sanity/client.server'

import type {Route} from './+types/og'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const loader = async ({request}: Route.LoaderArgs) => {
  const {origin, searchParams} = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return new Response('Bad request', {status: 400})
  }

  const doc = await viewClient.fetch(groq`*[_id == $id][0]{ ..., artist-> }`, {
    id,
  })

  // Reject requests for documents that don't exist
  if (!doc) {
    return new Response('Bad request', {status: 400})
  }

  const png = await generatePngFromDocument(doc, origin)

  // Respond with the PNG buffer
  return new Response(png, {
    status: 200,
    headers: {
      // Tell the browser the response is an image
      'Content-Type': 'image/png',
      // Optional caching settings
      'cache-control':
        process.env.NODE_ENV === 'development'
          ? 'no-cache'
          : 'public, immutable, no-transform, max-age=31536000',
    },
  })
}
