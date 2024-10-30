/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {
    session: Session
  }

  interface PageData {
    csrfHeaderKey?: string
    csrfParamKey?: string
    csrfToken?: string
    fetch: typeof fetch
  }

  interface Error {
    message: string
  }

  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface Platform {}

  interface Session {
    csrfHeaderKey?: string
    csrfParamKey?: string
    csrfToken?: string
  }
}
