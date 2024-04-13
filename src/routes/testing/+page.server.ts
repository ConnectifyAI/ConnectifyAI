import { testModels } from '$lib/server/hf/';

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {

	const runTheThing = await testModels();


	return runTheThing

};
