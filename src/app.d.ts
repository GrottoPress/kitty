/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {
    session: Session
  }

  interface Error {
    message: string
  }

  interface Session {
    csrfHeaderKey?: string
    csrfParamKey?: string
    csrfToken?: string
  }
}
