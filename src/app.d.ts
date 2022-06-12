/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface Locals {
    session: Session
  }

  interface Platform {}

  interface Session {
    csrfHeaderKey?: string
    csrfParamKey?: string
    csrfToken?: string
  }
}

interface ImportMetaEnv {
  VITE_ALLOWED_REQUEST_METHODS: string
  VITE_SESSION_KEY: string
}

type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>

type Params = Record<string, any>
