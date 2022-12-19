import node from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: node(),
  },
  preprocess: [
    preprocess(),
  ]
}

export default config
