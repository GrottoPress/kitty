import {
  PUBLIC_ALLOWED_REQUEST_METHODS,
  PUBLIC_CSRF_IGNORE_PATHS,
  PUBLIC_SESSION_KEY
} from '$env/static/public'

export const allowedRequestMethods = PUBLIC_ALLOWED_REQUEST_METHODS.split(',')
  .map(method => method.trim())
  .filter(method => method)

export const csrfIgnorePaths = PUBLIC_CSRF_IGNORE_PATHS.split(',')
  .map(path => path.trim())
  .filter(path => path)

export const sessionKey = PUBLIC_SESSION_KEY
