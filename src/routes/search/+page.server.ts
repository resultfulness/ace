import { sql } from "$lib/server/database";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Entry, Movie, TV } from "$lib/types";
import tmdb, { tmdb_err } from "$lib/server/tmdb";

export const load: PageServerLoad = async function({ url }) {
	const q = url.searchParams.get('query');

	const res = await sql`
SELECT ace_id, title, tconst, ace_rating, ace_user_rating
FROM movies
WHERE title ILIKE '%' || ${q!.replace(' ', '%')} || '%'
LIMIT 10;
	`;
	if (!res[0] || !q)
		error(404, `Query '${q}' returned no results`);
	const entries = res as unknown as {
		ace_id: string;
		title: string;
		tconst: string;
		ace_rating: number;
		ace_user_rating: number;
		poster_path: string;
		overview: string;
	}[];

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
	}

	return { entries, q };
}