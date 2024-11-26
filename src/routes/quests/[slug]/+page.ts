import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        params,
    };

    // how to route to '+error.svelte'
    // error(404, 'Not found');
}