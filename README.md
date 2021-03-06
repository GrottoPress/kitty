# Kitty

**Kitty** is a collection of utilities for *SvelteKit*. It includes libraries and handlers for developing secure frontend apps.

*Kitty* features encrypted server-side sessions, and provides mitigations against CSRF attacks for forms submitted to the server.

## Installing

Install via NPM:

```bash
npm install cookie dotenv @grottopress/kitty
```

## Using

### Handlers

*Kitty* provides the following handlers:

- `decryptSession`: Decrypts session retrieved from the `Cookie` request header
- `disableCache`: Sets `Cache-Control` and `Expires` headers to disable caching app-wide
- `encryptSession`: Encrypts session and sends it via the `Set-Cookie` response header
- `filterRequestMethods`: Forbids requests methods not listed in the `VITE_ALLOWED_REQUEST_METHODS` env var
- `verifyCsrfToken`: Generates and verifies CSRF tokens for requests that require them

The `src/hooks.ts` file should look similar to this:

```typescript
// ->> src/hooks.ts

// ...

import { sequence } from '@sveltejs/kit/hooks'
import type { GetSession } from '@sveltejs/kit'
import {
  decryptSession,
  disableCache,
  encryptSession,
  filterRequestMethods,
  verifyCsrfToken
} from '@grottopress/kitty/handlers'

export const handle = sequence(
  filterRequestMethods,
  decryptSession,
  verifyCsrfToken,
  disableCache,
  encryptSession
)

export const getSession: GetSession = (event) => {
  return event.locals.session
}

// ...
```

Add the following to the `.env` file:

```bash
# ->> .env

# ...

# Client
#
VITE_ALLOWED_REQUEST_METHODS=DELETE,GET,HEAD,PATCH,POST
VITE_SESSION_KEY=_my-app-session

# Sever
#
SECRET_KEY=J9oyuTDuGSQhwE3lOutjUgXe4yfpWQtI # 32 bytes/chars

# ...
```

Update the file with your own details. Use a **cryptographically-secure** value for the secret key. You may run `tr -cd '[:alnum:]' < /dev/random | fold -w32 | head -n1` to generate a key.

Remember to set secure permissions for this file: `chmod 0600 .env`.

Add types to `src/app.d.ts`:

```typescript

declare namespace App {
  // ...

  interface Locals {
    session: Session
    // ...
  }

  interface Session {
    csrfHeaderKey?: string
    csrfParamKey?: string
    csrfToken?: string
    // ...
  }

  // ...
}

interface ImportMetaEnv {
  VITE_ALLOWED_REQUEST_METHODS: string
  VITE_SESSION_KEY: string
}

type Fetch = (info: RequestInfo, init?: RequestInit) => Promise<Response>

// ...
```

Set up `svelte.config.js` as follows:

```javascript
// ->> svelte.config.js

// ...

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // ...
  kit: {
    // ...
    vite: {
      // ...
      optimizeDeps: {
        exclude: ['@grottopress/kitty'],
      },
      ssr: {
        noExternal: ['@grottopress/kitty'],
      }
    }
  },
  // ...
}

export default config
```

#### Session

*Kitty* features encrypted server-side sessions. Any value stored in the `event.locals.session` object is encrypted and persisted as cookies on the client via the `Set-Cookie` response header.

Sessions can be made available client-side via the session store by defining `.getSession()` in `src/hooks.ts` as shown above.

#### CSRF

*Kitty* provides support for generating and verifying CSRF tokens for forms submitted to the server, either via JSON or as form data.

CSRF mitigations are enforced for all requests *except* those with the `GET`, `HEAD`, `OPTIONS`, and `TRACE` methods.

**Examples**:

- JSON:

  ```html
  <script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
      return { props: { fetch } }
    }
  </script>

  <script lang="ts">
    import { session } from '$app/stores'

    export let fetch: Fetch

    const { csrfHeaderKey, csrfToken } = $session

    let city = ''
    let response: Response | undefined

    const onSubmit = async () => {
      const headers = new Headers
      headers.set('Content-Type', 'application/json')
      headers.set(csrfHeaderKey!, csrfToken!)

      response = await fetch('/some-endpoint', {
        method: 'POST',
        headers,
        body: JSON.stringify({ city })
      })
    }
  </script>

  <h1>City</h1>

  <!-- ... -->

  <form on:submit|preventDefault={onSubmit}>
    <input type="text" name="city" bind:value={city} />
    <button type="submit">Submit</button>
  </form>

  <!-- ... -->
  ```

- Form data:

  ```html
  <script lang="ts">
    import { session } from '$app/stores'

    const { csrfParamKey, csrfToken } = $session
    let city = ''

    // ...
  </script>

  <h1>City</h1>

  <!-- ... -->

  <form method="POST" action="/some-endpoint">
    <input type="hidden" name={csrfParamKey} value={csrfToken} />
    <input type="text" name="city" bind:value={city} />
    <button type="submit">Submit</button>
  </form>

  <!-- ... -->
  ```


### Components

The following components are available:

- `ToggleButton`

  ```html
  <script lang="ts">
    import Button from '@grottopress/kitty/components/ToggleButton.svelte'

    let menu: HTMLElement | undefined
    let showMenu = false
  </script>

  <div>
    <Button bind:open={showMenu} target={menu} clickOutside>
      &equiv; Menu
    </Button>

    {#if showMenu}
      <nav bind:this={menu}>
        <a sveltekit:prefetch href="/link/a">Link A</a>
        <a sveltekit:prefetch href="/link/b">Link B</a>
        <a sveltekit:prefetch href="/link/c">Link C</a>
      </nav>
    {/if}
  </div>
  ```

  The `clickOutside` prop, if `true`, enables closing a menu by clicking anywhere outside the button and its target.

### Actions

*Kitty* comes with the following actions for `use` in components:

- `clickOutside`

  ```html
  <script lang="ts">
    import clickOutside from '@grottopress/kitty/actions/click-outside'

    export let open: boolean

    const toggle = () => {
      open = !open
    }

    const close = () => {
      open = false
    }
  </script>

  <button type="button" use:clickOutside={close} on:click={toggle}>
    <slot />
  </button>
  ```


### Helpers

The following helpers are available:

- `Route.redirect(location: string, reload = false)`

  ```typescript
  import * as Route from '@grottopress/kitty/route'

  Route.redirect('/some/url')
  ```

  `Route.redirect` provides a single API for redirecting on both client-side and server-side. Setting `reload` to `true` forces a full-page reload, bypassing the client-side router.

- `Route.isJson(context: Request | Response): boolean`

  ```typescript
  import * as Route from '@grottopress/kitty/route'

  Route.isJson(requestOrResponseObject)
  ```

  `Route.isJson` checks if the given request or response is JSON, based on its `Content-Type` header.

## Developing

After cloning this repository, copy `sample.env` to `.env`, and run `npm install`. You may start the development server with `npm run dev`, or run tests with `npm run test`.

## Contributing

1. [Fork it](https://github.com/GrottoPress/kitty/fork)
1. Switch to the `master` branch: `git checkout master`
1. Create your feature branch: `git checkout -b my-new-feature`
1. Make your changes, updating changelog and documentation as appropriate.
1. Commit your changes: `git commit`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a new *Pull Request* against the `GrottoPress:master` branch.
