<script lang="ts">
	import { LucideGithub } from 'lucide-svelte';

	import Login from "$lib/assets/Login.png"
</script>

<!-- <div>
	<button class="w-full">
		<a href="/auth/login/github">
			<LucideGithub />
			Sign in with github
		</a>
	</button>
</div> -->

<div class="flex space-x-0">
	<div>
		<button class="w-full">
			<a href="/auth/login/github">
				<LucideGithub />
				Sign in with githubalkjfsdkjfl
			</a>
		</button>
	</div>
	<img src={Login} alt='plz work'>
</div>
