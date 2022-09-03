import { browser } from '$app/environment'
import { goto } from '$app/navigation'

export const redirect = async (location: string, reload = false) => {
  if (browser) reload ? window.location.href = location : await goto(location)

  return { status: 302, headers: { location }, redirect: location }
}

export const isJson = (context: Request | Response) => {
  return !!context.headers.get('Content-Type')?.toLowerCase().includes('/json')
}
