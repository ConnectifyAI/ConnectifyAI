import { fetchAllGraphs, fetchGraphByUserId } from "$lib/server/api/fetch";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {

    if (!locals.user) {
        throw new Error("no user on load xd")
    }

    let userGraphs = await fetchGraphByUserId(locals.user.id)
    let allGraphs = await fetchAllGraphs()


    return {
        userGraphs,
        allGraphs,
        user: locals.user
    };
};
