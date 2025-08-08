import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { svelteTesting } from '@testing-library/svelte/vite'

export default defineConfig({
  define: {
    __SVELTEKIT_PAYLOAD__: {
      data: {}
    }
  },
  plugins: [sveltekit(), svelteTesting()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/unit/setup.ts'],
  }
})
