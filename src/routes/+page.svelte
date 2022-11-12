<script>
	import { template } from '$lib/procedureTemplate';

	import { supabaseClient } from '$lib/db';

	const signInWithGoogle = async () => {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google'
		});
		console.log(data);
		console.log(error);
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex flex-row">
	<p class="font-bold">{JSON.stringify(template)}</p>
</div>

<p />

<p on:click={signInWithGoogle}>sign in with google</p>
