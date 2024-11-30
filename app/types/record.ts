import { z } from 'zod'

// This is a Zod schema for validation.
// Learn more at https://zod.dev/

// The schema validates data at runtime
// and generates TypeScript types during development,
// providing both the flexibility of writing GROQ queries
// and the type safety of TypeScript,
// without being limited to the structure of your Sanity schema.
export const recordZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  likes: z.number(),
  dislikes: z.number(),
  artist: z.string().nullable(),
  tracks: z
    .array(
      z.object({
        _key: z.string(),
        title: z.string().nullable(),
        duration: z.number().nullable(),
      })
    )
    .nullable(),
  // These fields could be more strongly typed.
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
})

export type RecordDocument = z.infer<typeof recordZ>

export const recordsZ = z.array(recordZ)

export const recordStubZ = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string().nullable(),
  releaseDate: z.string().nullable(),
  slug: z.string().nullable(),
  artist: z.string().nullable(),
  image: z.any().nullable(),
})

export const recordStubsZ = z.array(recordStubZ)

export type RecordStub = z.infer<typeof recordStubZ>
