import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ data }) => {
  const { csrfHeaderKey, csrfParamKey, csrfToken } = data

  return { csrfHeaderKey, csrfParamKey, csrfToken }
}
