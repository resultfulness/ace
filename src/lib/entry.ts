import type { Movie, TV } from "./types";

export function get_entry_year(entry_details: Movie | TV): string {
	if (entry_details.media_type === "movie") {
		return entry_details.release_date.slice(0, 4);
	} else if (entry_details.media_type === "tv") {
		return entry_details.first_air_date.slice(0, 4);
	} else {
		return "";
	}
}
