import type { HandleServerError } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import {
  decryptSession,
  disableCache,
  encryptSession,
  filterRequestMethods,
  verifyCsrfToken
} from '$lib/handlers'

export const handle = sequence(
  filterRequestMethods,
  decryptSession,
  verifyCsrfToken,
  disableCache,
  encryptSession
)

export const handleError: HandleServerError = ({ error }) => {
  if (error instanceof Error) console.log(error.message)
}
