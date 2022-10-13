# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased] - 

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
