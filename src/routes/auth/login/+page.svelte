<script lang="ts">
	import { LucideGithub } from 'lucide-svelte';
	import { ScrollText } from 'lucide-svelte';
	import Login from "$lib/assets/Login.png"
	
</script>

<style>

.gradient-heading {
	@apply bg-clip-text text-transparent box-decoration-clone;
	/* Direction */
	@apply bg-gradient-to-br;
	/* Color Stops */
	@apply from-primary-500 via-tertiary-500 to-secondary-500;
}

</style>
<!-- <div>
	<button class="w-full">
		<a href="/auth/login/github">
			<LucideGithub />
			Sign in with github
		</a>
	</button>
</div> -->

<div class="flex">
	<div class="w-full flex-col">
		<h1 class=" px-36 py-10 mt-48 text-8xl font-dmMono ">Welcome to <br> <span class="font-bold bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone">ConnectifyAI</span></h1>


		<div class="flex justify-center space-x-14">
			<button class=" bg-blue-500 text-white  flex justify-center items-center rounded-xl px-5 py-3 border border-blu"  href="/auth/login/github">
					<LucideGithub />
					<h1 class="ml-4">Sign in with github</h1>
			</button>
			<button class=" bg-blue-500 text-white  flex justify-center items-center rounded-xl px-5 py-3 border border-blu"  href="/auth/login/github">
				<ScrollText />
				<h1 class="ml-4">About Us</h1>
			</button>
		</div>
	</div>
	<img src={Login} alt='plz work' class="border-white">
</div>

