# Kitty

**Kitty** is a collection of utilities for *SvelteKit*. It includes libraries and handlers for developing secure frontend apps.

*Kitty* features encrypted server-side sessions, and provides mitigations against CSRF attacks for forms submitted to the server.

## Installing

1. Install via PNPM:

   ```bash
   pnpm install -D @grottopress/kitty
   ```

1. Set `compilerOptions.moduleResolution` to `bundler`, `node16`, or `nodenext` in `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "moduleResolution": "bundler",
     }
   }
   ```

   This prevents the following error:

   ```
   Cannot find module '@grottopress/kitty' or its corresponding type declarations
   ```

   See <https://kit.svelte.dev/docs/packaging#typescript>.

## Using

### Handlers

*Kitty* provides the following handlers:

- `decryptSession`: Decrypts session retrieved from the `Cookie` request header
- `disableCache`: Sets `Cache-Control` and `Expires` headers to disable caching app-wide
- `encryptSession`: Encrypts session and sends it via the `Set-Cookie` response header
- `filterRequestMethods`: Forbids requests methods not listed in the `ALLOWED_REQUEST_METHODS` env var
- `verifyCsrfToken`: Generates and verifies CSRF tokens for requests that require them

The `src/hooks.server.ts` file should look similar to this:

```typescript
// ->> src/hooks.server.ts

// ...

import { sequence } from '@sveltejs/kit/hooks'
import {
  decryptSession,
  disableCache,
  encryptSession,
  filterRequestMethods,
  verifyCsrfToken
} from '@grottopress/kitty/server'

export const handle = sequence(
  decryptSession,
  filterRequestMethods,
  verifyCsrfToken,
  disableCache,
  encryptSession
)

// ...
```

Add the following to the `.env` file:

```bash
# ->> .env

# ...

# Client
#

# Server
#
ALLOWED_REQUEST_METHODS=DELETE,GET,HEAD,PATCH,POST
SECRET_KEY=J9oyuTDuGSQhwE3lOutjUgXe4yfpWQtI # 32 bytes/chars
SESSION_KEY=_my-app-session

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

  interface PageData {
    csrfHeaderKey?: string
    csrfParamKey?: string
    csrfToken?: string
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

// ...
```

Disable SvelteKit's built-in CSRF protection in `svelte.config.js`:

```javascript
// ...

const config = {
  kit: {
    csrf: { checkOrigin: false }
    // ...
  },
  // ...
}

// ...
```

#### Session

*Kitty* features encrypted server-side sessions. Any value stored in the `event.locals.session` object is encrypted and persisted as cookies on the client via the `Set-Cookie` response header.

Sessions can be made available client-side via the session store by defining `.load()` in `src/routes/+layout.server.ts` as follows:

```typescript
// ->> src/routes/+layout.server.ts

// ...

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  const { csrfHeaderKey, csrfParamKey, csrfToken } = locals.session

  return { csrfHeaderKey, csrfParamKey, csrfToken }
}

// ...
```

```typescript
// ->> src/routes/+layout.ts

// ...

import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ data }) => {
  const { csrfHeaderKey, csrfParamKey, csrfToken } = data

  return { csrfHeaderKey, csrfParamKey, csrfToken }
}

// ...
```

This can then be accessed in routes (eg: `data.csrfToken`), or via the `page` store in components (eg: `$page.data.csrfToken`).

#### CSRF

*Kitty* provides support for generating and verifying CSRF tokens for forms submitted to the server, either via JSON or as form data.

CSRF mitigations are enforced for all requests *except* those with the `GET`, `HEAD`, `OPTIONS`, and `TRACE` methods.

**Examples**:

```bash
# ->> .env

# ...

# Skip CSRF protection for these routes (comma-separated `event.route.id`s).
# Adding a route will include all its children.
CSRF_SKIP_ROUTES=/about/team,/blog/[slug]

# ...
```

- JSON:

  ```typescript
  // src/routes/some-path/+page.ts

  // ...

  import type { PageLoad } from './$types'

  export const load: PageLoad = async ({ fetch }) => {
    return { fetch }
  }

  // ...
  ```

  ```html
  <!-- src/routes/some-path/+page.svelte -->

  <script lang="ts">
    import type { PageData } from './$types'

    interface Props {
      data: PageData
    }

    let { data }: Props = $props()

    let city = $state('')
    let response: Response | undefined = $state()

    const onSubmit = async (event: Event) => {
      event.preventDefault()

      if (!data.csrfHeaderKey || !data.csrfToken) return

      const headers = new Headers
      headers.set('Content-Type', 'application/json')
      headers.set(data.csrfHeaderKey, data.csrfToken)

      response = await data.fetch('/some-endpoint', {
        method: 'POST',
        headers,
        body: JSON.stringify({ city })
      })
    }
  </script>

  <h1>City</h1>

  <!-- ... -->

  <form onsubmit={onSubmit}>
    <input type="text" name="city" bind:value={city} />
    <button type="submit">Submit</button>
  </form>

  <!-- ... -->
  ```

- Form data:

  ```html
  <script lang="ts">
    import type { PageData } from './$types'

    interface Props {
      data: PageData
    }

    let { data }: Props = $props()

    let city = $state('')

    // ...
  </script>

  <h1>City</h1>

  <!-- ... -->

  <form method="POST" action="/some-endpoint">
    <input type="hidden" name={data.csrfParamKey} value={data.csrfToken} />
    <input type="text" name="city" bind:value={city} />
    <button type="submit">Submit</button>
  </form>

  <!-- ... -->
  ```

### Components

The following components are available:

- `Connection`

  ```html
  <script lang="ts">
    import { Connection } from '@grottopress/kitty'
  </script>

  <Connection slowAfterMs={6000}>
    {#snippet offline()}
      <aside class="connection offline">
        <p>You are offline</p>
      </aside>
    {/snippet}

    {#snippet slow()}
      <aside class="connection slow">
        <p>Check your internet connection</p>
      </aside>
    {/snippet}

    {#snippet online()}
      <aside class="connection online">
        <p>Hurray!!!</p>
      </aside>
    {/snippet}
  </Connection>
  ```

  The `slowAfterMs` prop sets the connection status to `slow` if a page is not loaded after the given period in milliseconds.

- `ToggleButton`

  ```html
  <script lang="ts">
    import { ToggleButton } from '@grottopress/kitty'

    let menu: HTMLElement | undefined = $state()
    let showMenu = $state(false)
  </script>

  <div>
    <ToggleButton bind:open={showMenu} clickOutside={menu}>
      &equiv; Menu
    </ToggleButton>

    {#if showMenu}
      <nav bind:this={menu}>
        <a href="/link/a">Link A</a>
        <a href="/link/b">Link B</a>
        <a href="/link/c">Link C</a>
      </nav>
    {/if}
  </div>
  ```

  The `clickOutside` prop accepts the target HTML element, and enables closing that element by clicking anywhere outside it.

  You may set a `keepOpen` prop that would keep the menu open after navigating to another page, if the menu was already open. By default, the menu is closed upon navigating to another page.

### Actions

*Kitty* comes with the following actions for `use` in components:

- `clickOutside`

  ```html
  <script lang="ts">
    import { clickOutside } from '@grottopress/kitty'

    interface Props {
      open: boolean
    }

    let { open }: Props = $props()

    const toggle = () => {
      open = !open
    }

    const close = () => {
      open = false
    }
  </script>

  <button type="button" use:clickOutside={close} onclick={toggle}>
    <slot />
  </button>
  ```

### Helpers

The following helpers are available:

- `.isJson(context: Request | Response): boolean`

  ```typescript
  import { isJson } from '@grottopress/kitty'

  isJson(requestOrResponseObject)
  ```

  `.isJson()` checks if the given request or response is JSON, based on its `Content-Type` header.

## Developing

After cloning this repository, copy `sample.env` to `.env`, and run `pnpm install`. You may start the development server with `pnpm run dev`, or run tests with `pnpm run test`.

## Contributing

1. [Fork it](https://github.com/GrottoPress/kitty/fork)
1. Switch to the `master` branch: `git checkout master`
1. Create your feature branch: `git checkout -b my-new-feature`
1. Make your changes, updating changelog and documentation as appropriate.
1. Commit your changes: `git commit`
1. Push to the branch: `git push origin my-new-feature`
1. Submit a new *Pull Request* against the `GrottoPress:master` branch.
