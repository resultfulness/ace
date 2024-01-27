<script lang="ts">
    import get_image_full_src from "$lib/image";
    import type { Entry, Movie, TV } from "$lib/types";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { entry, details } = data;

    let _mock_entry: Entry = {
        ace_id: 10283682,
        ace_rating: 3,
        ace_user_rating: null,
        ace_user_rating_count: null,
        ace_none: 49,
        ace_mild: 193,
        ace_mdrt: 407,
        ace_sevr: 233,
        tconst: "tt2861424",
        title: "Rick and Morty",
        rating: 9.1,
        rating_count: 564697,
    };
    let _mock_details: TV | Movie = {
        adult: false,
        backdrop_path: "/rBF8wVQN8hTWHspVZBlI3h7HZJ.jpg",
        id: 60625,
        name: "Rick and Morty",
        original_language: "en",
        original_name: "Rick and Morty",
        overview:
            "Rick is a mentally-unbalanced but scientifically gifted old man who has recently reconnected with his family. He spends most of his time involving his young grandson Morty in dangerous, outlandish adventures throughout space and alternate universes. Compounded with Morty's already unstable family life, these events cause Morty much distress at home and school.",
        poster_path: "/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg",
        media_type: "tv",
        genre_ids: [16, 35, 10765, 10759],
        popularity: 878.185,
        first_air_date: "2013-12-02",
        vote_average: 8.7,
        vote_count: 9092,
        origin_country: ["US"],
        genres: [
            "Action & Adventure",
            "Animation",
            "Comedy",
            "Sci-Fi & Fantasy",
        ],
    };

    let year: string;
    $: if (_mock_details.media_type === "movie") {
        year = _mock_details.release_date.slice(0, 4);
    } else if (_mock_details.media_type === "tv") {
        year = _mock_details.first_air_date.slice(0, 4);
    }
</script>

<svelte:head>
    <title>{_mock_entry.title} ({year}) -- Ace of Spades</title>
</svelte:head>

<h2>{_mock_entry.title}</h2>
<p>
    {year} |
    {#each _mock_details.genres as g, i}
        {g}{i === _mock_details.genres.length - 1 ? "" : " - "}
    {/each}
</p>

<img
    src={get_image_full_src(_mock_details.backdrop_path, "backdrop")}
    alt="entry backdrop"
/>
<img
    src={get_image_full_src(_mock_details.poster_path, "poster")}
    alt="entry poster"
/>

<p>{_mock_details.overview}</p>
<p>
    <span>IMDb</span> rating
    {_mock_entry.rating}/10
    {_mock_entry.rating_count} votes
</p>
<p>
    <span>TMDB</span> rating
    {_mock_details.vote_average}/10
    {_mock_details.vote_count} votes
</p>
