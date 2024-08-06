<script lang="ts">
    import { get_alt_for_level, get_card_for_level } from "$lib/ace_cards";
    import { get_entry_year } from "$lib/entry";
    import { get_image_full_src } from "$lib/tmdb_image";
    import type { PageData } from "./$types";
    import tmdb_logo from "$lib/images/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
    import Modal from "$lib/components/modal.svelte";

    export let data: PageData;
    const { entry, details, comments } = data;
    const year = get_entry_year(details);

    let show_description: boolean = false;
    let show_add_comment: boolean = false;
</script>

<svelte:head>
    <title>{entry.title} ({year}) -- Ace of Spades</title>
</svelte:head>

<Modal bind:show={show_description}>
    <span slot="header">full overview</span>
    {details.overview}
</Modal>

<Modal bind:show={show_add_comment}>
    <span slot="header">add comment</span>
    <form action="?/comment" method="post">
        <label>
            username
            <input required minlength=3 maxlength=24 type="text" name="username"/>
        </label>
        <label>
            content
            <textarea required minlength=1 maxlength=128 rows=6 name="content"/>
        </label>
        <button type="submit">add</button>
    </form>
</Modal>

<main>
    <section class="entry-info">
        <img
            src={get_image_full_src(details.backdrop_path, "backdrop")}
            alt="entry backdrop"
            class="backdrop"
        />
        <img
            src={get_image_full_src(details.poster_path, "poster")}
            alt="entry poster"
            class="poster"
        />

        <h2>{entry.title}</h2>
        <p class="title-subtitle">
            {year} |
            {#each details.genres as g, i}
                {g.toLowerCase()}{i === details.genres.length - 1 ? "" : " - "}
            {/each}
        </p>

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
                <figcaption>user rating <abbr title="not available yet">?</abbr></figcaption>
            </figure>
        </div>
    </section>
<hr />
<section class="overview">
    <p>{details.overview}</p>
    <button on:click={() => show_description = true}>show full overview</button>
</section>
<hr />
<section class="ratings">
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
</section>
<hr />
<section class="comments">
        <div style="display:grid;grid-template-columns: auto auto;">
            <h3>user comments</h3>
            <button class="open-add-comment" on:click={() => show_add_comment=true}>add a comment</button>
        </div>
    {#if comments.length === 0}
            <span style="filter:brightness(0.6);">no comments yet!</span>
    {/if}
    {#each comments as comment}
            <p>
                <strong>{comment.username}</strong>
                <br />
                {comment.content}
            </p>
    {/each}
</section>
</main>

<style>
main {
    position: relative;
    max-width: 1440px;
    margin-inline: auto;
}
.backdrop {
    position: absolute;
    top: 0;
    opacity: .15;
    filter: grayscale(0.5);
    z-index: -1;
}

.entry-info {
    display: grid;
    grid-template-columns: 3fr 7fr;
    position: relative;
    overflow: hidden;
}
.entry-info h2 {
    margin: 0;
    margin-block: auto;
    padding: 1rem 1rem 1rem 0;
}
.poster {
    margin-block: auto;
    padding: 1rem;
    border-radius: 1rem;
}
.title-subtitle {
    color: var(--fg);
    grid-column: span 2;
    text-align: center;
    margin: 0;
    background-color: var(--bg);
}
hr {
    margin-inline: 1rem;
}
.overview {
    padding: 1rem;
    display: grid;
    max-width: 80ch;
    margin-inline: auto;
}
.overview p {
    margin-top: 0;
    --_lines-to-show: 4;
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: var(--_lines-to-show);
    line-clamp: var(--_lines-to-show);
    -webkit-box-orient: vertical;
}
.overview button {
    border: 0;
    background-color: var(--primary);
    padding: 0.5rem;
    border-radius: 100vw;
    cursor: pointer;
}

.ratings {
    padding: 1rem;
    display: grid;
    gap: 1rem;
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

.cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column: span 2;
    align-items: center;
    margin-inline: auto;
    background-color: var(--bg);
    z-index: 2;
}
.card {
    border-radius: 1rem;
}

.cards figure figcaption {
    text-align: center;
}

#imdb-tag {
    background-color: #f5c518;
    color: black;
    padding: 2px 4px;
    border-radius: 4px;
    font-weight: bold;
}

.comments {
    padding: 1rem;
}
.comments h3 {
    margin: 0;
    font-size: 1.5rem;
}
.comments p {
    padding: .5rem;
    margin-block: .5rem;
    border-radius: 1rem;
    border: 1px solid grey;
    text-align: justify;
}

@media screen and (min-width: 1050px) {
    .entry-info {
        grid-template-rows: auto auto 1fr;
        padding: 1rem;
        gap: 1rem;
    }
    .title-subtitle {
        grid-row: 2;
        grid-column: 2;
        background-color: initial;
        text-align: left;
        filter: brightness(0.6);
    }
    .cards {
        grid-row: 3;
        grid-column: 2;
        max-width: 50%;
        background-color: initial;
    }
    .poster {
        grid-row: span 3;
        margin: 0;
        padding: 0;
        border-radius: 1rem;
    }
    .entry-info h2 {
        margin: 0;
        padding: 0;
        font-size: 2.5rem;
    }
    .ratings {
        grid-template-columns: 1fr 1fr;
        margin-inline: auto;
        max-width: fit-content;
        gap: 2rem;
    }
}

form label {
    display: grid;
}
form {
    display: grid;
    gap: 1rem;
}
form button {
    justify-self: right;
    border: 0;
    border-radius: 100vw;
    padding-inline: 1rem;
    cursor: pointer;
    background-color: var(--primary);
}
form button:hover {
    filter: brightness(1.4) saturate(0.6);
}
form textarea {
    resize: none;
}
.open-add-comment {
    border: 0;
    border-radius: 100vw;
    padding-inline: 1rem;
    cursor: pointer;
    background-color: var(--primary);
}
form input,
form textarea {
    background-color: var(--neutral);
    border: 0;
    padding: .25em 1em;
    border-radius: .75rem;
}
form input:focus,
form textarea:focus {
    outline: 1px solid var(--primary);
}
</style>
