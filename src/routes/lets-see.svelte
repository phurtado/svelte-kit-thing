<script lang="ts">
    let thing = {
        prop: 1
    }
</script>

<svelte:head>
    <title>Let's see</title>
</svelte:head>

<div class="content">
    <h1>Test! {thing.prop}</h1>
</div>

<style>
    .content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}

    h1 {
        width: 100%;
    }
</style>