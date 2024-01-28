<script lang="ts">
    import get_image_full_src from "$lib/image";
    import type { Entry, Movie, TV } from "$lib/types";
    import type { PageData } from "./$types";

    import card_9 from "$lib/images/cards/9-of-spades.png";
    import card_10 from "$lib/images/cards/10-of-spades.png";
    import card_jack from "$lib/images/cards/jack-of-spades.png";
    import card_queen from "$lib/images/cards/queen-of-spades.png";
    import card_king from "$lib/images/cards/king-of-spades.png";
    import card_ace from "$lib/images/cards/ace-of-spades.png";
    import card_joker from "$lib/images/cards/joker.png";

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

    function get_card_for_level(level: number | null) {
        switch (level) {
            case 0:
                return card_ace;
            case 1:
                return card_king;
            case 3:
                return card_queen;
            case 4:
                return card_jack;
            case 5:
                return card_10;
            case 6:
                return card_9;
            default:
                return card_joker;
        }
    }

    function get_alt_for_level(level: number | null) {
        switch (level) {
            case 0:
                return "ace of spades";
            case 1:
                return "king of spades";
            case 3:
                return "queen of spades";
            case 4:
                return "jack of spades";
            case 5:
                return "10 of spades";
            case 6:
                return "9 of spades";
            default:
                return "joker";
        }
    }
</script>

<svelte:head>
    <title>{_mock_entry.title} ({year}) -- Ace of Spades</title>
</svelte:head>

<div class="page-container">
    <main>
        <img
            src={get_image_full_src(_mock_details.poster_path, "poster")}
            alt="entry poster"
            class="poster"
        />
        <div class="title-container">
            <div>
                <h2>{_mock_entry.title}</h2>
                <p class="title-subtitle">
                    {year} |
                    {#each _mock_details.genres as g, i}
                        {g}{i === _mock_details.genres.length - 1 ? "" : " - "}
                    {/each}
                </p>
            </div>

            <div class="cards">
                <img
                    src={get_card_for_level(_mock_entry.ace_rating)}
                    alt={"playing card, " +
                        get_alt_for_level(_mock_entry.ace_rating)}
                    class="card"
                />
                <img
                    src={get_card_for_level(_mock_entry.ace_user_rating)}
                    alt={"playing card, " +
                        get_alt_for_level(_mock_entry.ace_user_rating)}
                    class="card"
                />
            </div>
        </div>

        <div class="overview">{_mock_details.overview}</div>

        <div class="ratings">
            <div class="imdb-container">
                <span><span id="imdb-tag">IMDb</span> rating</span>
                <span class="ratings-rating">{_mock_entry.rating}/10</span>
                <span class="ratings-count"
                    >{_mock_entry.rating_count} votes</span
                >
            </div>
            <div class="tmdb-container">
                <span><span id="tmdb-tag">TMDB</span> rating</span>
                <span class="ratings-rating"
                    >{_mock_details.vote_average}/10</span
                >
                <span class="ratings-count"
                    >{_mock_details.vote_count} votes</span
                >
            </div>
        </div>
    </main>
    <img
        src={get_image_full_src(_mock_details.backdrop_path, "backdrop")}
        alt="entry backdrop"
        class="backdrop"
    />
</div>

<style>
    .card {
        background-color: var(--fg);
        border-radius: 2rem;
        padding: 1rem;
    }

    .cards {
        --_card-width: 200px;
        display: grid;
        grid-template-columns: repeat(2, var(--_card-width));
        justify-content: center;
        gap: 4rem;
    }

    .page-container {
        position: relative;
        background-color: var(--bg-drop);
        overflow: hidden;
    }

    main {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 1fr 10.375rem;
        gap: 2rem;
        padding: 4rem 2rem;
        width: min(1440px, 100% - 2rem);
        margin-inline: auto;
    }

    .backdrop {
        top: 0;
        z-index: -1;
        position: absolute;
        filter: grayscale(0.5);
    }

    .poster {
        border-radius: 2rem;
        grid-column: span 3;
    }

    .title-container {
        border-radius: 2rem;
        padding: 2rem;
        background-color: var(--bg);
        display: grid;
        grid-column: span 9;
        align-content: space-between;
    }

    h2 {
        font-size: 4rem;
        font-weight: bold;
        margin: 0;
    }

    .title-subtitle {
        margin: 0;
        color: var(--fg);
    }

    .overview {
        background-color: var(--bg);
        max-width: fit-content;
        margin-inline: auto;
        padding: 2rem;
        border-radius: 2rem;
        grid-column: span 8;
        text-align: justify;
    }

    .ratings {
        display: flex;
        justify-content: center;
        gap: 4rem;
        background-color: var(--bg);
        grid-column: span 4;
        width: 100%;
        margin-inline: auto;
        padding: 2rem;
        border-radius: 2rem;
    }

    .imdb-container,
    .tmdb-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .ratings-rating {
        font-size: 2rem;
    }

    .ratings-count {
        filter: brightness(0.8);
    }

    #imdb-tag {
        background-color: #f5c518;
        color: black;
        padding: 2px 4px;
        border-radius: 4px;
        font-weight: bold;
    }

    #tmdb-tag {
        background-color: #032541;
        color: #01b4e4;
        padding: 2px 4px;
        border-radius: 4px;
        font-weight: bold;
    }
</style>
