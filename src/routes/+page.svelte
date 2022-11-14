<script>
	//import { template } from '$lib/procedureTemplate';

	import { supabaseClient } from '$lib/db';

	const signInWithGoogle = async () => {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google'
		});
		console.log(data);
		console.log(error);
	};

	const procedureOptions = [
		{
			ProcedureName: 'Transforaminal Epidural',
			Diagnosis: ['Lumbar radiculopath (M54.16)', 'Lumbar Post Laminectomy Sydnrome'],
			Region: ['lumbar', 'thoracic', 'cervical'],
			Side: ['left', 'right', 'bilateral'],
			Levels: ['L1/2', 'L2/3', 'L3/4', 'L4/5', 'L5/S1']
		},
		{
			ProcedureName: 'Kyphoplasty',
			Diagnosis: ['Vertebral compression fracture', 'Thoracic compression fracture'],
			Region: ['lumbar', 'thoracic', 'cervical'],
			Side: ['left', 'right', 'bilateral'],
			Levels: ['L1/2', 'L2/3', 'L3/4', 'L4/5', 'L5/S1'],
			'Trochar Size': ['16g', '18g'],
			'Balloon Inflation': 'free text',
			'Cement Volume': 'free text'
		}
	];

	let procedureoptions = ['generalTemplate', 'kyphoplasty'];

	let componenetname = null;
	let chosencomponent = '';

	$: {
		console.log('chosencompenent', chosencomponent);
		let temp = '../lib/components/' + chosencomponent + '.svelte';
		import(/* @vite-ignore */ temp).then((res) => (componenetname = res.default));
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Inisght Procedure" />
</svelte:head>

<!-- <p on:click={signInWithGoogle}>sign in with google</p> -->

<header>
	<!-- Navbar -->
	<nav
		class="navbar navbar-expand-md shadow-lg py-2 bg-white flex items-center w-full justify-between fixed top-0 right-0 left-0"
	>
		<div class="px-6">
			<button
				class="navbar-toggler border-0 py-3 px-2 md:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContentL"
				aria-controls="navbarSupportedContentL"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					class="w-5"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
				>
					<path
						fill="currentColor"
						d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
					/>
				</svg>
			</button>
			<div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentL" />
		</div>
	</nav>
	<!-- Navbar -->

	<!-- Jumbotron -->
	<div class="p-12 text-center bg-gray-100 text-gray-700">
		<h2 class="font-semibold text-4xl mb-4">Heading</h2>
		<h4 class="font-semibold text-xl mb-6">Subheading</h4>
		<button
			type="button"
			class="inline-block px-6 py-2.5 mb-1 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
			data-mdb-ripple="true"
			data-mdb-ripple-color="light"
		>
			Call to action
		</button>
	</div>
	<!-- Jumbotron -->
</header>

<!-- <button
	on:click={loadcomponent}
	type="button"
	class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
	>Button</button
> -->

<h3>Please choose procedure</h3>
<select bind:value={chosencomponent}>
	{#each procedureoptions as value}<option {value}>{value}</option>{/each}
</select>

<svelte:component this={componenetname} />
