import { type RequestHandler, json } from '@sveltejs/kit'

export const DELETE: RequestHandler = async () => {
  return json({ success: true })
}
