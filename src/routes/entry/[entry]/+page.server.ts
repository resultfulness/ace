import { error } from '@sveltejs/kit';
import { sql } from '$lib/server/database';
import type { Entry, Movie, TV } from '$lib/types';
import type { PageServerLoad } from './$types';
import tmdb, { tmdb_err } from '$lib/server/tmdb';

export const load: PageServerLoad = async function({ params }) {
    if (!params.entry)
        error(400, 'must provide entry id');

    const id = params.entry.split('ace')[1];
    const is_id_valid_int = /^\d+$/.test(id);

    if (!params.entry.startsWith('ace') || !is_id_valid_int)
        error(400, 'invalid entry id');

    const res = await sql`SELECT movies.* FROM movies WHERE ace_id = ${id};`;
    if (!res[0])
        error(404, 'entry not found');
    const entry = res[0] as Entry;

    const tmdb_res = await tmdb.find_by_imdb(entry.tconst);
    if (tmdb_res === tmdb_err.API_ERROR)
        error(500, 'connection to the tmdb api encountered an error');
    if (tmdb_res === tmdb_err.NOT_FOUND)
        error(404, 'entry details not found');
    // @ts-ignore
    const details = tmdb_res.media_type === 'movie'
        ? tmdb_res as Movie
        : tmdb_res as TV;

    const genres = await tmdb.expand_genres(
        details.genre_ids,
        details.media_type
    );
    if (genres === tmdb_err.API_ERROR)
        error(500, 'connection to the tmdb api encountered an error');
    details.genres = genres as string[];

    return {
        entry,
        details
    };
}
