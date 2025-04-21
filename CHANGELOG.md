# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.14.1] - 2025-04-21

### Fixed
- Change separator between ciphertext and signature to `.`

## [0.14.0] - 2025-04-17

### Changed
- Change encryption output encoding to `base64url`

## [0.13.0] - 2025-02-24

### Changed
- Repurpose `ToggleButton.clickOutside` prop to accept the target element

### Removed
- Remove `ToggleButton.target` prop

## [0.12.1] - 2024-10-30

### Fixed
- Make `slowAfterMs` prop optional in `Connection` component

## [0.12.0] - 2024-10-30

### Changed
- Upgrade to Svelte v5
- Change default exports to named exports
- Bump minimum supported JS version to es2020

## [0.11.0] - 2024-10-22

### Added
- Add `Connection` component

## [0.10.1] - 2024-05-08

### Fixed
- Fix dependency resolution error in SvelteKit 2.0
- Fix `svelte-check` errors

## [0.10.0] - 2024-05-07

### Changed
- Catch session verification error in `decryptSession` handler
- Unset session if verification fails in `decryptSession` handler

## [0.9.0] - 2024-01-03

### Added
- Add support for SvelteKit 2.0

## [0.8.0] - 2024-01-03

### Changed
- Make all environment variables server-side only
- Rename `PUBLIC_ALLOWED_REQUEST_METHODS` env var to `ALLOWED_REQUEST_METHODS`
- Rename `PUBLIC_CSRF_SKIP_ROUTES` env var to `CSRF_SKIP_ROUTES`
- Rename `PUBLIC_SESSION_KEY` env var to `SESSION_KEY`

## [0.7.3] - 2023-08-17

### Fixed
- Fix build error when not using `.env` at build time

## [0.7.2] - 2023-07-29

### Fixed
- Fix wrong conditional exports order in `package.json`

## [0.7.1] - 2023-07-29

### Changed
- Move more server-only modules to `src/lib/server/`
- Separate server-side `exports` from client-side ones
- Rename `$lib/route` module to `$lib/helpers`

### Fixed
- Fix error: "Cannot import $env/dynamic/private into client-side code"

## [0.7.0] - 2023-07-29

### Changed
- Upgrade to Svelte v4. *Svelte v3 is still supported*
- Move [server-only modules](https://kit.svelte.dev/docs/server-only-modules) to `src/lib/server/`
- Load client-side envs dynamically
- Migrate to `@sveltejs/package` v2

## [0.6.1] - 2023-03-20

### Fixed
- Fix es2015 compatibility issues

## [0.6.0] - 2022-12-19

### Changed
- Upgrade SvelteKit to v1.0

## [0.5.0] - 2022-11-07

### Changed
- Upgrade SvelteKit to v1.0.0-next.535

## [0.4.1] - 2022-10-28

### Fixed
- Do not close `ToggleButton` if `target`'s child is clicked during click outside event

### Changed
- Always close a toggle button's target after navigation

## [0.4.0] - 2022-10-13

### Changed
- Match paths by route ID instead of URL when ignoring paths in CSRF
- Rename `PUBLIC_CSRF_IGNORE_PATHS` env var to `PUBLIC_CSRF_SKIP_ROUTES`

## [0.3.0] - 2022-10-13

### Added
- Add env var to skip CSRF protection for specific paths

### Fixed
- Fix `allowedRequestMethods` returning array with single empty string when env var not set

## [0.2.3] - 2022-09-17

### Fixed
- Fix sessions set in endpoints not set in response headers

## [0.2.2] - 2022-09-15

### Removed
- Remove `cookie` package in favour `event.cookies`

## [0.2.1] - 2022-09-14

### Changed
- Upgrade SvelteKit to v1.0.0-next.481
- Rename `VITE_ALLOWED_REQUEST_METHODS` env var to `PUBLIC_ALLOWED_REQUEST_METHODS`
- Rename `VITE_SESSION_KEY` env var to `PUBLIC_SESSION_KEY`
- Change CSRF `Header.set(App.Session)` to `Header.set(Token | string)`
- Change CSRF `Param.set(App.Session)` to `Param.set(Token | string)`

## [0.2.0] - 2022-09-08

### Changed
- Upgrade [SvelteKit](https://svelte.dev/blog/whats-new-in-svelte-august-2022)
- Set `Pragma: no-cache` header in `.disableCache()` handler

### Removed
- Remove `.redirect()` helper

## [0.1.1] - 2022-16-14

### Fixed
- Add missing setup steps to docs
- Fix `VITE_ALLOWED_REQUEST_METHODS` env undefined in production builds

## [0.1.0] - 2022-06-13

### Added
- Initial public release
