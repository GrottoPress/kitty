import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ data }) => {
  const csrfHeaderKey = data?.csrfHeaderKey
  const csrfParamKey = data?.csrfParamKey
  const csrfToken = data?.csrfToken

  return { csrfHeaderKey, csrfParamKey, csrfToken }
}
