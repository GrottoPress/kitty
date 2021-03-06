import { randomBytes } from  'crypto'
import { Verifier } from '$lib/crypto'

export class Header {
  constructor(private _headers = new Headers) { }

  set(session: App.Session) {
    const headers = new Headers(this._headers)
    headers.set(Header.key(), session.csrfToken || '')

    return headers
  }

  static key() {
    return 'X-CSRF-Token'
  }
}

export class Param {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  constructor(private _params: Record<string, any> = {}) { }

  set(session: App.Session) {
    const params = { ...this._params }
    params[Param.key()] = session.csrfToken

    return params
  }

  static key() {
    return '_csrf'
  }
}

export class Token {
  constructor(private _token: string) {}

  verify(sessionToken: string) {
    const requestTokenBuffer = Buffer.from(this._token)
    const sessionTokenBuffer = Buffer.from(sessionToken)

    return Verifier.isEqual(requestTokenBuffer, sessionTokenBuffer)
  }

  toString() {
    return this._token
  }

  static generate(size = 32) {
    const token = randomBytes(size).toString('base64url')

    return new Token(token)
  }
}
