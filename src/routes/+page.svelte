<script>
	//import { template } from '$lib/procedureTemplate';
	export let data;
	import { supabaseClient } from '$lib/db';
	import demographic from '../lib/components/demographic.svelte';
	import GeneralTemplate from '../lib/components/generalTemplate.svelte';
	import treeMenu from '../lib/components/treeMenu.svelte';

	console.log(data);
	import { jsPDF } from 'jspdf';

	const signInWithGoogle = async () => {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google'
		});
		console.log(data);
		console.log(error);
	};

	let procedureoptions = ['Please select a template...', 'generalTemplate', 'kyphoplasty'];
	let physicians = ['Sripada', 'Peskin', 'Solomons'];
	let procedure1 = {};
	let procedure2 = {};
	let patientDemo = {};

	$: {
		console.log(procedure1);
		console.log(procedure2);
		console.log(patientDemo);
	}
	let currentphysician = null;
	let componenetname = null;
	let componenetname2 = null;
	let chosencomponent = null;
	let chosencomponent2 = null;

	function loadProcedureOne() {
		console.log('chosencompenent changed', chosencomponent);
		let temp = '../lib/components/' + chosencomponent + '.svelte';
		import(/* @vite-ignore */ temp).then((res) => (componenetname = res.default));
	}
	function loadProcedureTwo() {
		console.log('chosencompenent changed', chosencomponent2);
		let temp = '../lib/components/' + chosencomponent2 + '.svelte';
		import(/* @vite-ignore */ temp).then((res) => (componenetname2 = res.default));
	}

	function filteredtemplate(htmltemplate) {
		const regExp = /\<.+?\>/g;
		const matches = [...htmltemplate.match(regExp)];
		console.log(matches);
		matches.forEach(function (each) {
			return htmltemplate.replaceAll(each, '');
		});

		console.log(template);
	}

	function makepdf() {}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Inisght Procedure" />
</svelte:head>

<!-- <p on:click={signInWithGoogle}>sign in with google</p> -->

<!-- <button
	on:click={loadcomponent}
	type="button"
	class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
	>Button</button
> -->

<svelte:component this={demographic} bind:patientInfo={patientDemo} />
<div class="px-[10%] ">
	<h3>Please choose physician</h3>
	<select
		class="w-48 form-select appearance-none block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transitio ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
		bind:value={currentphysician}
	>
		{#each physicians as value}<option {value}>{value}</option>{/each}
	</select>

	<svelte:component this={treeMenu} />

	{#if currentphysician}
		<h3>Please choose procedure</h3>

		<select
			class="form-select appearance-none block w-48 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transitio ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
			bind:value={chosencomponent}
			on:change={loadProcedureOne}
		>
			{#each procedureoptions as value}<option {value}>{value}</option>{/each}
		</select>

		<svelte:component this={componenetname} bind:procClone={procedure1} {currentphysician} />

		<br />
		<br />

		<h3>Please choose procedure</h3>
		<select bind:value={chosencomponent2} on:change={loadProcedureTwo}>
			{#each procedureoptions as value}<option {value}>{value}</option>{/each}
		</select>

		<svelte:component this={componenetname2} bind:procObj={procedure2} {currentphysician} />

		<br />
		<br />

		<button
			type="button"
			class="inline-block px-6 py-2.5 mb-1 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
			data-mdb-ripple="true"
			data-mdb-ripple-color="light"
		>
			Print
		</button>
	{/if}
</div>
