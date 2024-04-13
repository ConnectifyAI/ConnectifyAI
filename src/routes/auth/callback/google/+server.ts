import { github } from "$lib/server/auth";
import type { RequestEvent } from "./$types";


export async function GET(event: RequestEvent): Promise<Response> {
    const code = event.url.searchParams.get('code');
    const state = event.url.searchParams.get('state');

    const storedState = event.cookies.get('github_oauth_state') ?? null;

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        })
    }

    try{
        const tokens = await github.validateAuthorizationCode(code)
    }

}
