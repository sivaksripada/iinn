<script>
	export var procClone = {};
	export let currentphysician;

	import { createClient } from '@supabase/supabase-js';

	procClone = {
		diagnoses: [],
		levels: '{levels}',
		injectate: '{injectate}',
		leftlevels: [],
		rightlevels: [],
		bilateral: [],
		dose: '{dose}',
		volume: '{volume}',
		solution: '{solution}'
	};

	var procObj = {
		diagnoses: [],
		levels: '{levels}',
		injectate: '{injectate}',
		leftlevels: [],
		rightlevels: [],
		bilateral: [],
		dose: '{dose}',
		volume: '{volume}',
		solution: '{solution}'
	};

	const sides = ['left', 'right', 'bilateral'];

	const levels = [
		'C1/C2',
		'C2/C3',
		'C3/C4',
		'C4/C5',
		'C5/C6',
		'C6/C7',
		'C7/T1',
		'T1/T2',
		'T2/T3',
		'T3/T4',
		'T4/T5',
		'T5/T6',
		'T6/T7',
		'T7/T8',
		'T8/T9',
		'T9/T10',
		'T10/T11',
		'T11/T12',
		'T12/L1',
		'L1/L2',
		'L2/L3',
		'L3/L4',
		'L4/L5',
		'L5/S1',
		'S1',
		'S2',
		'S3',
		'S4'
	];

	// const levels = [
	// 	{ text: 'C1/C2', id: 'C1/C2' },
	// 	{ text: 'C2/C3', id: 'C2/C3' },
	// 	{ text: 'C3/C4', id: 'C3/C4' },
	// 	{ text: 'C4/C5', id: 'C4/C5' },
	// 	{ text: 'C6/C7', id: 'C6,C&' },
	// 	{ text: 'C7/T1', id: 'C7/T1' }
	// ];
	const doses = ['20 mg', '40 mg', '80 mg'];
	const injectates = [
		'methylprednisolone 40mg/cc',
		'methylprednisolone 40mg/cc',
		'dexamethasone 10 mg/cc',
		'traumel and zeal'
	];

	const diagnoses = ['lumbar radiculopathy (M54.16)', 'post-lumbar laminectomy syndrome (m96.1)'];
	const volume = '';
	const solutions = ['1% lidocaine', '0.25% bupivicaine', '0.5% bupivicaine'];

	var sripada = `After obtaining informed consent the patient & was brought to the procedure room and place in the prone position. Atime out was completed to identify the correct patient, procedure, and correct side prior to starting the procedure.Next, the lumbar area was surgically prepped and draped in a sterile fashion. The c-arm was then introduced andpositioned in an appropriate cephalad-caudad view. A point just lateral to the tip of the pars was then identified anda skin wheal was raised. Then, using fluoroscopic guidance, a needle was advanced until it was appropriatelypositioned at the <strong><font color='red'>{levels}</strong></font>. There was no blood or CSF aspirated and no paresthesias were noted bythe patient. Next, in the AP view using continuous fluoroscopy, contrast was injected. There was spread of thecontrast into each neuroforamen. There was no intrathecal or intra-vascular spread noted at any time. Followinginjection of the contrast each neuroforamen was injected with <strong><font color='red'>{dose}</strong></font> of <strong><font color='red'>{injectate}</strong></font> in <strong><font color='red'>{volume}</strong></font> of <strong><font color='red'>{solution}</strong></font> equally intolevel. The needles were removed. <strong><font color='red'>{solution}</strong></font> The procedure was completed without complications and wastolerated well. The patient was monitored after the procedure. The patient (or responsible party) was givenpost-procedure and discharge instructions to follow at home. The patient was discharged in stable condition`;
	var template = `The skin was marked slightly to the lateral at the 6 o'clock position of the first level under oblique angulation of the C-arm. The skin was then infiltrated over the planned site of entry with 2 ml of 1% lidocaine via a 25-gauge, 1-1/2 inch needle. A <strong><font color="red">{gauge}</strong></font>, <strong><font color="red">{needle length}</strong></font>  inch spinal needle was inserted lateral to the midline and advanced percutaneously toward the superior aspect of the intervetebral foramen inferior to the 6 o'clock aspect of the pedicle at the <strong><font color="red">{levels}</strong></font> level(s) under fluoroscopic guidance. A lateral fluoroscopic view was obtained to confirm depth. The needle was advanced slightly caudad and anterior so as to enter the foramen just caudal to the pedicle. After negative aspiration, 0.5 mL of Omnipaque-240 contrast was injected and epidural spread was verified with A/P and lateral fluoroscopic views. Following injection of contrast each neuroforamen was injected with <strong><font color="red">{dose volume}</strong></font> of <strong><font color="red">{inject ate}</strong></font> in <strong><font color="red">{solutionvolume}</strong></font> of <strong><font color="red">{solution}</strong></font> slowly with intermittent aspiration.`;
	//console.log('physician', currentphysician.value);

	const handler = {
		// get(target, prop, receiver) {
		// 	console.log('get prop', prop);
		// 	if (prop === 'push') {
		// 		return function (value) {
		// 			target.push(value);
		// 			console.log('pushed ', value);
		// 			listener({ target, value, method: prop });
		// 		};
		// 	}
		// 	// get: (target, key) => {
		// 	// 	if (typeof target[key] === 'object' && target[key] !== null) {
		// 	// 		console.log('get object', target[key]);
		// 	// 		//console.log(procObj);
		//return Reflect.get(target, prop, receiver);
		// 	// 	}

		// 	//	return re;
		//},
		set: (target, prop, value) => {
			// console.log('A change was made!');
			// console.log('achange was made', 'incoming key', prop, ' target ', target, ' value ', value);

			if (prop === 'leftlevels' || prop === 'rightlevels' || prop === 'bilateral') {
				procClone[prop] = value;

				let currentvalue = procClone['levels'];

				var temp = joinlevels(value);

				// console.log('current value', currentvalue);
				var newvalue = switchonlevels(prop, temp);
				// console.log('newvalue', newvalue);
				if (!currentvalue.includes('{levels}')) {
					// console.log('current value does not = {lvels}');
					let workingvalue = currentvalue;
					let changemade = false;
					let splitupcurrent = workingvalue.split(' and ');
					splitupcurrent.forEach(function (eachsplit, index) {
						sides.forEach(function (side, index) {
							// console.log('splitindex', index);
							if (newvalue.includes(side) && eachsplit.includes(side)) {
								workingvalue = workingvalue.replace(eachsplit, newvalue);
								changemade = true;
							}
						});
					});
					// console.log(changemade);
					if (!changemade) {
						workingvalue += ' and ' + newvalue;
					}

					template = template.replace(currentvalue, workingvalue);
					procClone['levels'] = workingvalue;
					procClone['template'] = template;
					//console.log(procClone);
				} else {
					// console.log('current value = {lvels}', newvalue);
					template = template.replace(currentvalue, newvalue);
					procClone['levels'] = newvalue;
					procClone['template'] = template;
					//console.log(procClone);
				}
			} else {
				console.log(value);
				let currentvalue = procClone[prop];
				procClone[prop] = value;
				template = template.replace(currentvalue, value);
				procClone['template'] = template;
				//console.log(procClone);
			}

			//return true;
			return Reflect.set(target, prop, value);
		}
	};

	procObj = new Proxy(procObj, handler);

	function switchonlevels(incomingkey, incominglevels) {
		//	console.log('swith on levels incoming', incominglevels, 'swith on keys', incomingkey);

		if (incomingkey === 'leftlevels') {
			//console.log('left side');
			return 'left ' + incominglevels;
		} else if (incomingkey === 'rightlevels') {
			//console.log('right side');
			return 'right ' + incominglevels;
		} else if (incomingkey === 'bilateral') {
			//console.log('bilateraleft side');
			return 'bilateral ' + incominglevels;
		}
	}

	function clearlevels() {
		procObj.levels = '{levels}';
		// procObj.leftlevels = [];
		// procObj.rightlevels = [];
		// procObj.bilateral = [];
	}

	function joinlevels(incominglevels) {
		//console.log('length of levels', incominglevels.length, 'incoming value ', incominglevels);
		if (incominglevels.length > 1) {
			const last = incominglevels.pop();
			const result = incominglevels.join(', ') + ' & ' + last;
			return result;
		} else {
			return incominglevels[0];
		}
	}
</script>

<h1 class="font-bold mb-16 mt-12">
	This is the Transforaminal Epidural Steroid Injection component for Dr. {currentphysician}
</h1>

<div class="container mx-auto px-4">
	<p class="font-bold text-xl">Diagnosis</p>
	<div class="flex flex-row rounded-xl p5 border border-black justify-around mb-10">
		<div class="flex flex-col items-center">
			<h4>Diagnosis</h4>
			<select bind:value={procObj.diagnoses} class="" multiple>
				{#each diagnoses as diagnosis}
					<option value={diagnosis}>
						{diagnosis}
					</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="flex flex-row justify-between">
		<p class="font-bold text-xl">Select Levels</p>
		<button
			on:click={clearlevels}
			type="button"
			class="inline-block px-6 py-2.5 mb-1 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
		>
			Clear levels
		</button>
	</div>

	<div class="flex flex-row rounded-xl p-5 border border-black justify-around mb-10">
		<div class="flex flex-col items-center ml-6">
			<h4>Left Levels</h4>
			<select bind:value={procObj.leftlevels} class="" multiple>
				{#each levels as level}
					<option value={level}>
						{level}
					</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col items-center ml-6">
			<h4>Right Levels</h4>
			<select bind:value={procObj.rightlevels} class="" multiple>
				{#each levels as level}
					<option value={level}>
						{level}
					</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col items-center ml-6">
			<h4>Bilateral Levels</h4>
			<select bind:value={procObj.bilateral} class="" multiple>
				{#each levels as level}
					<option value={level}>
						{level}
					</option>
				{/each}
			</select>
		</div>
	</div>

	<p class="font-bold text-xl">Injectate</p>
	<div class=" flex flex-row border border-black rounded-xl p-5 justify-around">
		<div class="flex flex-col items-center ">
			<h4>Dose</h4>
			<select bind:value={procObj.dose} class="">
				{#each doses as dose}
					<option value={dose}>
						{dose}
					</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col items-center ml-6">
			<h4>Injecate</h4>
			<select bind:value={procObj.injectate} class="">
				{#each injectates as injectate}
					<option value={injectate}>
						{injectate}
					</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col items-center ml-6">
			<h4>Solution</h4>
			<select bind:value={procObj.solution} class="">
				{#each solutions as solution}
					<option value={solution}>
						{solution}
					</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col items-center ml-6">
			<h4>Solution Volume</h4>
			<select bind:value={procObj.solution} class="">
				{#each solutions as solution}
					<option value={solution}>
						{solution}
					</option>
				{/each}
			</select>
		</div>
	</div>

	<div>
		{@html template}
	</div>
</div>

<style>
</style>
