import type { Action } from '@sveltejs/kit'

export const DELETE: Action = async () => {
  return { status: 200, errors: {} }
}
