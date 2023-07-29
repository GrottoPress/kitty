import type { Handle } from '@sveltejs/kit'
import { dev } from '$app/environment'
import Crypto from '$lib/server/crypto'
import {
  Token as CsrfToken,
  Header as CsrfHeader,
  Param as CsrfParam
} from '$lib/server/csrf'
import { allowedRequestMethods, csrfSkipRoutes, sessionKey } from '$lib/env'
import { secretKey } from '$lib/server/env'
import * as Route from '$lib/route'

export const decryptSession: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get(sessionKey)
  let plaintext

  if (session) plaintext = new Crypto(secretKey).verifyAndDecrypt(session)
  event.locals.session = plaintext ? JSON.parse(plaintext) : {}

  return await resolve(event)
}

export const encryptSession: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  response.headers.set('Set-Cookie', event.cookies.serialize(
    sessionKey,
    new Crypto(secretKey).encryptAndSign(JSON.stringify(event.locals.session)),
    {path: '/', httpOnly: true, sameSite: 'lax', secure: !dev}
  ))

  return response
}

export const verifyCsrfToken: Handle = async ({ event, resolve }) => {
  if (!event.locals.session.csrfToken) {
    event.locals.session.csrfToken = `${CsrfToken.generate()}`
    event.locals.session.csrfParamKey = CsrfParam.key()
    event.locals.session.csrfHeaderKey = CsrfHeader.key()
  }

  const { locals, request, route } = event
  const safeMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE']
  const isIgnored = csrfSkipRoutes.some(_route => route.id?.startsWith(_route))
  const isSafe = safeMethods.indexOf(request.method) >= 0

  if (isSafe || isIgnored) return await resolve(event)

  const { csrfHeaderKey, csrfParamKey, csrfToken } = locals.session
  let requestToken = request.headers.get(csrfHeaderKey)

  if (!requestToken) {
    if (Route.isJson(request)) {
      const body = await request.clone().json()
      requestToken = body[csrfParamKey]
    } else {
      const body = await request.clone().formData()
      requestToken = body.get(csrfParamKey)?.toString() || ''
    }
  }

  const isValid = requestToken &&
    csrfToken &&
    new CsrfToken(requestToken).verify(csrfToken)

  if (isValid) return await resolve(event)

  return new Response(
    'Forged request detected',
    { status: 403, statusText: 'Forbidden' }
  )
}

export const disableCache: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', 'Sun, 16 Aug 1987 07:00:00 GMT')

  return response
}

export const filterRequestMethods: Handle = async ({ event, resolve }) => {
  if (allowedRequestMethods.indexOf(event.request.method) >= 0) {
    return await resolve(event)
  }

  return new Response(
    `${event.request.method} request method not allowed`,
    { status: 400, statusText: 'Bad Request' }
  )
}
