import type { HandleClientError } from '@sveltejs/kit/hooks'

export const handleError: HandleClientError = ({ error }) => {
  if (error instanceof Error) console.log(error.message)
}
