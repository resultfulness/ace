export default function get_image_full_src(
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
