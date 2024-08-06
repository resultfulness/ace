import { error } from '@sveltejs/kit';
import { sql } from '$lib/server/database';
import type { Entry, Movie, TV, Comment } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
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

    const res2 = await sql`SELECT comments.* FROM comments WHERE movie_id=${id}`
    console.log(res2);
    const comments = Array.from(res2) as Comment[];

    return {
        entry,
        details,
        comments
    };
}

export const actions: Actions = {
    comment: async ({ request, url }) => {
        const d = await request.formData()
        const u = d.get('username');
        const c = d.get('content');

        const id = url.pathname.slice(10);


        if (!u) {
            error(422, 'missing username');
        }
        if (!c) {
            error(422, 'missing content');
        }

        const username = u.toString();
        const content = c.toString();

        if (username.length > 24)
            error(422, 'username too long');
        if (username.length < 3)
            error(422, 'username too short');
        if (content.length > 128)
            error(422, 'content too long');
        if (content.length === 0)
            error(422, 'content too short');

        await sql`
INSERT INTO comments (username, content, movie_id)
VALUES (${username}, ${content}, ${id})
`;
        return 200;
    }
}
