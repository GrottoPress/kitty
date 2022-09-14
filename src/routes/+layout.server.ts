import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
  const { csrfHeaderKey, csrfParamKey, csrfToken } = locals.session

  return { csrfHeaderKey, csrfParamKey, csrfToken }
}
