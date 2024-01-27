export interface Entry {
	ace_id: number;
	ace_rating: number;
	ace_user_rating: number;
	ace_user_rating_count: number;
	ace_none: number;
	ace_mild: number;
	ace_mdrt: number;
	ace_sevr: number;
	tconst: string;
	title: string;
	rating: number;
	rating_count: number;
}

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: 'movie' | 'tv';
	genre_ids: number[];
	genres: string[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface Genre {
	id: number;
	name: string;
}
