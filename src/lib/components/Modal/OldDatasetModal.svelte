<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton'
	import StepOne from './SubCompments/StepOne.svelte'
	import StepTwo from './SubCompments/StepTwo.svelte'
	import StepThree from './SubCompments/StepThree.svelte'

	export let parent: any
	console.log('parent', parent)
</script>

<div
	class="flex min-w-[50rem] min-h-[30rem] bg-slate-100 p-16 rounded-md border-slate-700 border-4"
>
	<!--  -->

	<!-- <Stepper active="bg-blue-300" border="border-t border-black" badge="bg-gris" class="h-96">
		<StepOne />
		<StepTwo />
		<StepThree />
	</Stepper> -->
</div>
