<script lang="ts">
    import { get_alt_for_level, get_card_for_level } from "$lib/ace_cards";
    import get_image_full_src from "$lib/image";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: console.log(data.entries);
</script>

<svelte:head>
    <title>Search results for '{data.q}' -- Ace of Spades</title>
</svelte:head>

<main>
    <h2>Query results for '{data.q}'</h2>
    {#if data.entries.length === 0}
        No results returned.
    {:else}
        <ul>
            {#each data.entries as entry}
                <li>
                    <a href={`/entry/ace${entry.ace_id}`}>
                        <img
                            src={get_image_full_src(
                                entry.poster_path,
                                "poster",
                            )}
                            alt={`entry poster for ${entry.title}`}
                            class="poster"
                        />
                        <div>
                            <h3>{entry.title}</h3>
                        </div>
                        <div class="cards">
                            <img
                                src={get_card_for_level(entry.ace_rating)}
                                alt={"playing card, " +
                                    get_alt_for_level(entry.ace_rating)}
                                class="card"
                            />
                            <img
                                src={get_card_for_level(entry.ace_user_rating)}
                                alt={"playing card, " +
                                    get_alt_for_level(entry.ace_user_rating)}
                                class="card"
                            />
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</main>

<style>
    main {
        width: min(1440px, 100% - 2rem);
        margin-inline: auto;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }


    li {
        position: relative;
        padding: 1rem;
        background-color: var(--neutral);
        border-radius: 1rem;
        transition: transform ease 200ms;
    }

    li:hover {
        transform: translateX(12px);
        box-shadow: -12px 0 var(--primary);
    }

    li:focus-within {
        outline: 2px solid var(--primary);
        outline-offset: 6px;
    }

    a:focus {
        outline: 0;
    }

    a {
        display: grid;
        grid-template-columns: 1fr 9fr 2fr;
        justify-items: space-between;
        align-items: center;
        gap: 2rem;
        text-decoration: none;
        color: inherit;
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        padding-right: 1rem;
    }

    .cards > .card, .poster {
        border-radius: 1rem;
    }


    h3 {
        font-size: 3rem;
    }

    li + li {
        margin-top: 1rem;
    }
</style>
