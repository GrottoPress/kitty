import node from '@sveltejs/adapter-node'
import { sveltePreprocess } from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: node(),
  },
  preprocess: [
    sveltePreprocess(),
  ]
}

export default config
