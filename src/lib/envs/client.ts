import {
  PUBLIC_ALLOWED_REQUEST_METHODS,
  PUBLIC_SESSION_KEY
} from '$env/static/public'

export const allowedRequestMethods = PUBLIC_ALLOWED_REQUEST_METHODS
  .split(',')
  .map(method => method.trim())

export const sessionKey = PUBLIC_SESSION_KEY
