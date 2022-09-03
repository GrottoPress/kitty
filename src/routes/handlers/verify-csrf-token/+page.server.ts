import type { Action } from '@sveltejs/kit'

export const POST: Action = async () => {
  return { status: 200, errors: {} }
}
