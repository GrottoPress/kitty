import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
  ALLOWED_REQUEST_METHODS: {},
  CSRF_SKIP_ROUTES: {},
  SECRET_KEY: {},
  SESSION_KEY: {},
})
