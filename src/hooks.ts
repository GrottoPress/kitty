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
