# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased] - 

### Changed
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
