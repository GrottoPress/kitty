import { type RequestHandler, json } from '@sveltejs/kit'

export const POST: RequestHandler = async () => {
  return json({ success: true })
}
