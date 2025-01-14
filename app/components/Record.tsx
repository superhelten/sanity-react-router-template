import {createDataAttribute} from '@sanity/visual-editing/react-router'

import {LikeDislike} from '~/components/LikeDislike'
import {RecordCover} from '~/components/RecordCover'
import {SanityContent} from '~/components/SanityContent'
import {Title} from '~/components/Title'
import {secondsToMinutes} from '~/lib/secondsToMinutes'
import {STUDIO_BASEPATH} from '~/sanity/constants'
import type {RecordDocument} from '~/types/record'

type RecordProps = {
  data: RecordDocument
}

export function Record({data}: RecordProps) {
  const {_id, title, artist, content, image, tracks, likes, dislikes} = data
  const imageDataAttribute = createDataAttribute({
    id: _id,
    path: ['image'],
    baseUrl: STUDIO_BASEPATH,
    type: 'record',
  }).toString()

  return (
    <article className="flex flex-col items-start gap-4 lg:flex-row lg:gap-12">
      <div className="grid-gap-4 grid max-w-[70vw] grid-cols-1">
        <div className="max-w-sm" data-sanity={imageDataAttribute}>
          <RecordCover image={image} />
        </div>
        <LikeDislike id={_id} likes={likes} dislikes={dislikes} />
      </div>
      <div className="flex flex-shrink-0 flex-col gap-4 lg:gap-6 lg:w-2/3">
        <header>
          {title ? <Title>{title}</Title> : null}
          {artist ? (
            <h2 className="bg-black text-2xl font-bold tracking-tighter text-white">
              {artist}
            </h2>
          ) : null}
        </header>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
        {tracks && tracks?.length > 0 ? (
          <ul className="grid grid-cols-1 divide-y divide-gray-100 dark:divide-gray-900">
            <li className="py-3 text-2xl font-bold tracking-tighter">
              {tracks?.length === 1 ? `1 Track` : `${tracks?.length} Tracks`}
            </li>
            {tracks.map((track) => (
              <li
                key={track._key}
                className="flex items-center justify-between py-3"
              >
                <span className="text-lg">{track.title}</span>
                {track.duration ? (
                  <span className="text-sm font-bold">
                    {secondsToMinutes(track.duration)}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}
