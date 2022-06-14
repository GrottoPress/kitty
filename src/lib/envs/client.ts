export const allowedRequestMethods =
  import.meta.env.VITE_ALLOWED_REQUEST_METHODS
    .split(',')
    .map(method => method.trim())

export const sessionKey = import.meta.env.VITE_SESSION_KEY
