import node from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: node(),
    methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},
    trailingSlash: 'never',
	},
  preprocess: [
    preprocess(),
  ]
}

export default config
