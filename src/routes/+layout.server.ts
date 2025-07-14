import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const { csrfHeaderKey, csrfParamKey, csrfToken } = locals.session

  return { csrfHeaderKey, csrfParamKey, csrfToken }
}
