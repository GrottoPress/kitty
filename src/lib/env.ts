import { env } from '$env/dynamic/public'

export const allowedRequestMethods =
  env.PUBLIC_ALLOWED_REQUEST_METHODS.split(',')
    .map(method => method.trim())
    .filter(method => method)

export const csrfSkipRoutes =
  env.PUBLIC_CSRF_SKIP_ROUTES.split(',')
    .map(route => route.trim())
    .filter(route => route)

export const sessionKey = env.PUBLIC_SESSION_KEY
