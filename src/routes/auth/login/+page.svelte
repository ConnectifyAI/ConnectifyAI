<script lang="ts">
	import { LucideGithub } from 'lucide-svelte'
	import { ScrollText } from 'lucide-svelte'
	import Login from '$lib/assets/new-login.png'
</script>

<div class="flex">
	<div class="w-full flex-col">
		<h1 class=" px-36 py-10 mt-48 text-8xl font-dmMono">
			Welcome to <br />
			<span
				class="font-bold bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
				>ConnectifyAI</span
			>
		</h1>

		<div class="flex justify-center space-x-14">
			<a href="/auth/login/github">
				<button
					class=" bg-blue-500 text-white flex justify-center items-center rounded-xl px-5 py-3 border border-blu"
				>
					<LucideGithub />

					<h1 class="ml-4">Sign in with github</h1>
				</button>
			</a>
			<a href="https://connectify-ai.mintlify.app/">
				<button
					class=" bg-blue-500 text-white flex justify-center items-center rounded-xl px-5 py-3 border border-blu"
				>
					<ScrollText />
					<h1 class="ml-4">About Us</h1>
				</button>
			</a>
		</div>
	</div>

	<img class="app-preview-icon" src={Login} alt="welcome app preview" />
</div>

<style>
	.app-preview-icon {
		width: 55%;
		height: auto;
	}
	@media (max-width: 690px) {
		.app-preview-icon {
			display: none;
		}
	}
</style>
