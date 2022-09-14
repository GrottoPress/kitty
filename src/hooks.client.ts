import type { HandleClientError } from '@sveltejs/kit'

export const handleError: HandleClientError = ({ error }) => {
  if (error instanceof Error) console.log(error.message)
}
