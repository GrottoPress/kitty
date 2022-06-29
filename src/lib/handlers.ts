import cookie from 'cookie'
import type { Handle } from '@sveltejs/kit'
import { dev } from '$app/env'
import Crypto from '$lib/crypto'
import {
  Token as CsrfToken,
  Header as CsrfHeader,
  Param as CsrfParam
} from '$lib/csrf'
import { allowedRequestMethods, sessionKey } from '$lib/envs/client'
import { secretKey } from '$lib/envs/server'
import * as Route from '$lib/route'

export const decryptSession: Handle = async ({ event, resolve }) => {
  const cookies = event.request.headers.get('Cookie')
  const session = cookie.parse(cookies || '')[sessionKey]

  let plaintext
  if (session && secretKey) {
    plaintext = new Crypto(secretKey).verifyAndDecrypt(session)
  }

  event.locals.session = plaintext ? JSON.parse(plaintext) : {}
  return await resolve(event)
}

export const encryptSession: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  if (!secretKey) return response

  response.headers.set('Set-Cookie', cookie.serialize(
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

  const { locals, request } = event
  const safeMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE']

  if (safeMethods.includes(request.method)) return await resolve(event)

  let requestToken = request.headers.get(CsrfHeader.key())
  const sessionToken = locals.session.csrfToken

  if (!requestToken) {
    if (Route.isJson(request)) {
      const body = await request.clone().json()
      requestToken = body[CsrfParam.key()]
    } else {
      const body = await request.clone().formData()
      requestToken = body.get(CsrfParam.key())?.toString() || ''
    }
  }

  const isValid = requestToken &&
    sessionToken &&
    new CsrfToken(requestToken).verify(sessionToken)

  if (isValid) return await resolve(event)

  return new Response(
    'Forged request detected',
    { status: 403, statusText: 'Forbidden' }
  )
}

export const disableCache: Handle = async ({ event, resolve }) => {
  const response = await resolve(event)

  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('Expires', 'Sun, 16 Aug 1987 07:00:00 GMT')

  return response
}

export const filterRequestMethods: Handle = async ({ event, resolve }) => {
  if (allowedRequestMethods.includes(event.request.method)) {
    return await resolve(event)
  }

  return new Response(
    `${event.request.method} request method not allowed`,
    { status: 400, statusText: 'Bad Request' }
  )
}
