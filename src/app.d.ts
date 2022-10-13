/* eslint-disable */
/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {
    session: Session
  }

  interface PageData {
    csrfHeaderKey: string
    csrfParamKey: string
    csrfToken: string
    fetch: typeof fetch
  }

  interface Error {
    message: string
  }

  interface Platform {}

  interface Session {
    csrfHeaderKey: string
    csrfParamKey: string
    csrfToken: string
  }
}
