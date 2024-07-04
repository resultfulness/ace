import { sql } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Movie, TV } from "$lib/types";
import tmdb, { tmdb_err } from "$lib/server/tmdb";
import { get_entry_year } from "$lib/entry";

const ENTRIES_PER_PAGE: number = 10;

export const load: PageServerLoad = async function({ url }) {
    if (url.searchParams.size === 0)
        error(400, `Missing 'query' parameter`);

    const q = url.searchParams.get('query');

    if (q?.length === 0 || q?.replaceAll(" ", "").length === 0)
        error(400, `'query' parameter empty`);

    const page = url.searchParams.get('page');


    const page_n = !page || Number.isNaN(Number(page)) ? 1 : +page;

    if (page_n <= 0) {
        error(400, `'page' parameter invalid - expected positive integer, got ${page_n}`)
    }

    const res = await sql`
SELECT ace_id, title, tconst, ace_rating, ace_user_rating
FROM movies
WHERE title ILIKE '%' || ${q!.replace(' ', '%')} || '%'
LIMIT ${ENTRIES_PER_PAGE}
OFFSET ${ENTRIES_PER_PAGE * (page_n-1)};
    `;
    if (!res[0] || !q)
        error(404, `Query '${q}' returned no results on page ${page_n}`);
    const entries = res as unknown as {
        ace_id: string;
        title: string;
        tconst: string;
        ace_rating: number;
        ace_user_rating: number;
        poster_path: string;
        overview: string;
        year: string;
    }[];

    console.log(entries[0]);

    for (const entry of entries) {
        const tmdb_res = await tmdb.find_by_imdb(entry.tconst);
        if (tmdb_res === tmdb_err.API_ERROR)
            error(500, 'connection to the tmdb api encountered an error');
        if (tmdb_res === tmdb_err.NOT_FOUND)
            error(404, 'entry details not found');
        // @ts-ignore
        const details = tmdb_res.media_type === 'movie'
            ? tmdb_res as Movie
            : tmdb_res as TV;
        entry.poster_path = details.poster_path;
        entry.overview = details.overview;
        entry.year = get_entry_year(details);
    }

    const res2 = await sql`
SELECT COUNT(ace_id)
FROM movies
WHERE title ILIKE '%' || ${q!.replace(' ', '%')} || '%'
    `;

    const total = res2[0].count;

    const no_more_entries_left = total <= ENTRIES_PER_PAGE * page_n;

    console.log(total, no_more_entries_left);

    return { entries, q, page_n, no_more_entries_left };
}
