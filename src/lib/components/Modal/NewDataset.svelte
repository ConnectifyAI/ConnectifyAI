<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton'
	import StepOne from './SubCompments/StepOne.svelte'
	import StepTwo from './SubCompments/StepTwo.svelte'
	import StepThree from './SubCompments/StepThree.svelte'
</script>

<div class="flex h-52 w-[100] z-50">
<Stepper active="bg-blu" border="border-t border-black" badge="bg-gris">
	<StepOne />
    <StepTwo />
	<StepThree />
</Stepper>
</div>	