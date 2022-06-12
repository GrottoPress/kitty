import { sequence } from '@sveltejs/kit/hooks'
import type { GetSession } from '@sveltejs/kit'
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

export const getSession: GetSession = (event) => {
  return event.locals.session
}
