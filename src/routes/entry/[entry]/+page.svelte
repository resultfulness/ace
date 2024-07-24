<script lang="ts">
    import { get_alt_for_level, get_card_for_level } from "$lib/ace_cards";
    import { get_entry_year } from "$lib/entry";
    import { get_image_full_src } from "$lib/tmdb_image";
    import type { PageData } from "./$types";
    import tmdb_logo from "$lib/images/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
    import Modal from "$lib/components/modal.svelte";

    export let data: PageData;
    const { entry, details } = data;
    const year = get_entry_year(details);

    let show_description: boolean = false;
</script>

<svelte:head>
    <title>{entry.title} ({year}) -- Ace of Spades</title>
</svelte:head>

<Modal bind:show={show_description}>
    <span slot="header">full description</span>
    {details.overview}
</Modal>
<div class="page-container">
    <main>
        <img
            src={get_image_full_src(details.poster_path, "poster")}
            alt="entry poster"
            class="poster"
        />
        <div class="title-container">
            <div>
                <h2>{entry.title}</h2>
                <p class="title-subtitle">
                    {year} |
                    {#each details.genres as g, i}
                        {g.toLowerCase()}{i === details.genres.length - 1 ? "" : " - "}
                    {/each}
                </p>
            </div>

            <div class="cards">
                <figure>
                    <img
                        src={get_card_for_level(entry.ace_rating)}
                        alt={"playing card, " +
                            get_alt_for_level(entry.ace_rating)}
                        class="card"
                    />
                    <figcaption>our rating</figcaption>
                </figure>
                <figure>
                    <img
                        src={get_card_for_level(entry.ace_user_rating)}
                        alt={"playing card, " +
                            get_alt_for_level(entry.ace_user_rating)}
                        class="card"
                    />
                    <figcaption>user rating</figcaption>
                </figure>
            </div>
        </div>

        <div class="overview">
            <p>{details.overview}</p>
            <button on:click={() => show_description = true}>show full overview</button>
        </div>

        <div class="ratings">
            <a
                class="imdb-container"
                href={`https://www.imdb.com/title/${entry.tconst}`}
                title="View entry at IMDb"
            >
                <span><span id="imdb-tag">IMDb</span> rating</span>
                <span class="ratings-rating">
                    {entry.rating}<span class="out-of-10"></span>
                </span>
                <span class="ratings-count">
                    {entry.rating_count} votes
                </span>
            </a>
            <a
                class="tmdb-container"
                href={`
https://www.themoviedb.org/${details.media_type}/${details.id}
`}
                title="View entry at TMDB"
            >
                <span>
                    <img src={tmdb_logo} alt="logo of The Movie Database" />
                    rating
                </span>
                <span class="ratings-rating">
                    {details.vote_average}<span class="out-of-10"></span>
                </span>
                <span class="ratings-count">
                    {details.vote_count} votes
                </span>
            </a>
        </div>
    </main>
    <img
        src={get_image_full_src(details.backdrop_path, "backdrop")}
        alt="entry backdrop"
        class="backdrop"
    />
</div>

<style>
    .page-container {
        position: relative;
        background-color: var(--bg-drop);
        overflow: hidden;
    }

    main {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: 1fr 11rem;
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
        grid-column: span 4;
    }

    .title-container {
        border-radius: 2rem;
        padding: 2rem;
        background-color: var(--bg);
        display: grid;
        grid-column: span 8;
        align-content: space-between;
    }

    h2 {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 4rem;
        font-weight: bold;
        margin: 0;
    }

    .title-subtitle {
        margin-top: -0.75em;
        color: var(--fg);
        filter: brightness(0.6);
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        padding-top: 1rem;
        padding-inline: 11rem;
        gap: 4rem;
    }
    .card {
        border-radius: 1rem;
        box-shadow: 0 3px 5px 0 rgb(0 0 0 / 0.1);
    }
    figure {
        margin: 0;
    }
    figcaption {
        text-align: center;
        filter: brightness(0.6);
    }

    .overview {
        display: grid;
        justify-items: center;
        background-color: var(--bg);
        width: 100%;
        margin-inline: auto;
        padding: 2rem;
        border-radius: 2rem;
        grid-column: span 8;
        text-align: justify;
    }

    .overview > p {
        margin: 0;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .overview button {
        border: 0;
        border-radius: .25rem;
        cursor: pointer;
        background: var(--primary);
    }
    .overview button:hover {
        filter: brightness(1.2);
    }

    .ratings {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
        gap: 2rem;
        background-color: var(--bg);
        grid-column: span 4;
        width: 100%;
        margin-inline: auto;
        padding: 1rem;
        border-radius: 2rem;
        position: relative;
    }

    .ratings::before {
        content: '';
        width: 4px;
        top: 1rem;
        bottom: 1rem;
        left: calc(50% - 2px);
        transform: translateX(-50%);

        background-color: var(--neutral);
        position: absolute;
    }

    .imdb-container,
    .tmdb-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: inherit;
        padding: 1rem;
        border-radius: 1rem;
    }

    .tmdb-container > span:first-of-type {
        display: grid;
        grid-template-columns: 43px auto;
        gap: .5ch;
        align-items: center;
    }

    .imdb-container:hover,
    .tmdb-container:hover {
        background-color: var(--bg);
        filter: brightness(1.2);
    }

    .imdb-container:focus,
    .tmdb-container:focus {
        outline: 2px solid var(--primary);
        outline-offset: 6px;
    }

    .ratings-rating {
        font-size: 2.5rem;
    }

    .ratings-count {
        filter: brightness(0.6);
    }

    .out-of-10::before {
        content: "/10";
        font-size: 0.5em;
        filter: brightness(0.6);
    }

    #imdb-tag {
        background-color: #f5c518;
        color: black;
        padding: 2px 4px;
        border-radius: 4px;
        font-weight: bold;
    }

    @media screen and (max-width: 1050px) {
        .poster {
            display: none;
        }

        main {
            padding-inline: 0;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(3, 1fr);
        }

        .title-container {
            grid-column: span 1;
        }

        h2 {
            display: initial;
            font-size: 3rem;
        }

        .cards {
            padding: 0;
        }
        .overview {
            grid-column: span 1;
        }

        .overview button {
            height: fit-content;
            margin-top: 2rem;
        }

        .ratings {
            grid-template-columns: 1fr;
            grid-column: span 1;
        }
        .ratings::before {
            display: none;
        }
    }
</style>
