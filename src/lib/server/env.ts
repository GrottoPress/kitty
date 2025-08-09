import { env } from '$env/dynamic/private'

export const allowedRequestMethods =
  env.ALLOWED_REQUEST_METHODS.split(',')
    .map(method => method.trim())
    .filter(method => method)

export const csrfSkipRoutes =
  env.CSRF_SKIP_ROUTES.split(',')
    .map(route => route.trim())
    .filter(route => route)

export const secretKey = env.SECRET_KEY
export const sessionKey = env.SESSION_KEY
