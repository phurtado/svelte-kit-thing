<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// https://megzari.com/blog/about_this_site

	export const load: Load = async ({ page, fetch }) => {
		const slug = page.params['slug'];
		const res = await fetch(`/posts/${slug}.json`);

		if (res.ok) {
			const loadedStuff: LoadedStuff = await res.json();

			return {
				props: { loadedStuff }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	}
</script>

<script lang="ts">
	export let loadedStuff: LoadedStuff;
</script>

<h1>{loadedStuff.content}</h1>