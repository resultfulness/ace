import { TMDB_ACCESS_TOKEN } from "$env/static/private";
import type { Genre, Movie } from "$lib/types";

export const tmdb_err = Object.freeze({
	API_ERROR: Symbol('API_ERROR'),
	NOT_FOUND: Symbol('NOT_FOUND')
});

export default class tmdb {
	private static db_url = 'https://api.themoviedb.org/3';
	private static fetch_opts: RequestInit = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer ' + TMDB_ACCESS_TOKEN
		}
	};

	public static async find_by_imdb(imdb_id: string): Promise<Movie | Symbol> {
		try {
			const res = await fetch(
				`${this.db_url}/find/${imdb_id}?external_source=imdb_id`,
				this.fetch_opts
			);
			const data = await res.json();
			console.log(data);
			if (!data.movie_results)
				return tmdb_err.API_ERROR;
			if (data.movie_results.length === 0)
				return tmdb_err.NOT_FOUND;
			return data.movie_results[0];
		} catch {
			return tmdb_err.API_ERROR;
		}
	}

	public static async expand_genres(gids: number[], type: 'movie' | 'tv'): Promise<string[] | Symbol> {
		const res = await fetch(
			`${this.db_url}/genre/${type}/list`,
			this.fetch_opts
		);
		const list = await res.json();
		if (!list.genres)
			return tmdb_err.API_ERROR;

		const genres = list.genres as Genre[];
		return genres.filter(g => gids.includes(g.id)).map(g => g.name);
	}

	public static get_image_full_src(
		src: string,
		type: 'poster' | 'backdrop' | undefined
	) {
		let size: string;
		if (type === 'poster') {
			size = 'w500';
		} else if (type === 'backdrop') {
			size = 'w1280';
		} else {
			size = 'original';
		}

		return `https://image.tmdb.org/t/p/${size}${src}`
	}
}
