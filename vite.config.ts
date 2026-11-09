import node from '@sveltejs/adapter-node'
import { sveltekit } from '@sveltejs/kit/vite'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: node(),
      preprocess: [vitePreprocess()],
    }),
    svelteTesting(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/unit/setup.ts'],
  }
})
