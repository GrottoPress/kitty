import {
  PUBLIC_ALLOWED_REQUEST_METHODS,
  PUBLIC_CSRF_SKIP_ROUTES,
  PUBLIC_SESSION_KEY
} from '$env/static/public'

export const allowedRequestMethods = PUBLIC_ALLOWED_REQUEST_METHODS.split(',')
  .map(method => method.trim())
  .filter(method => method)

export const csrfSkipRoutes = PUBLIC_CSRF_SKIP_ROUTES.split(',')
  .map(route => route.trim())
  .filter(route => route)

export const sessionKey = PUBLIC_SESSION_KEY
