import type { RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async () => {
  return Response.json({ success: true })
}
