import type { RequestHandler } from '@sveltejs/kit'

export const DELETE: RequestHandler = async () => {
  return Response.json({ success: true })
}
