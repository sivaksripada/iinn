<script>
	export let patientInfo = {};
	// export let patientInfo = {
	// 	firstName: '',
	// 	lastName: '',
	// 	dob: '',
	// 	medrec: '',
	// 	actnum: '',
	// 	date: ''
	// };
</script>

<div class="container mx-auto px-4 flex flex-row justify-center mt-16">
	<div class="w-full max-w-lg">
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-first-name"
				>
					First Name
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					placeholder="Jane"
					bind:value={patientInfo.firstName}
				/>
				<p class="text-red-500 text-xs italic">Please fill out this field.</p>
			</div>
			<div class="w-full md:w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-last-name"
				>
					Last Name
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					type="text"
					placeholder="Doe"
					bind:value={patientInfo.lastName}
				/>
			</div>
		</div>
		<div class="flex flex-wrap -mx-3 mb-2">
			<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-dob"
				>
					DOB
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					type="text"
					bind:value={patientInfo.dob}
				/>
			</div>
			<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-medrec"
				>
					Med Rec #
				</label>
				<div class="relative">
					<input
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						type="text"
						bind:value={patientInfo.medrec}
					/>
				</div>
			</div>
			<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-acctnum"
				>
					Account Number
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					type="text"
					bind:value={patientInfo.acctnum}
				/>
			</div>
		</div>
		<div class="flex flex-col justify-center items-center px-3 mb-6 ">
			<label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-acctnum"
			>
				Date
			</label>
			<input
				class="appearance-none block w-36 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				type="text"
				bind:value={patientInfo.acctnum}
			/>
		</div>
	</div>
</div>
