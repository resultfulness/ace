<script lang="ts">
    import { get_alt_for_level, get_card_for_level } from "$lib/ace_cards";
    import Icon from "$lib/components/icon.svelte";
    import { get_image_full_src } from "$lib/tmdb_image";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>Search results for '{data.q}' -- Ace of Spades</title>
</svelte:head>

<main>
    <h2 id="query-title">Query results for '{data.q}'</h2>
    {#if data.entries.length === 0}
        No results returned.
    {:else}
        <ul>
            {#each data.entries as entry}
                <li>
                    <a href={`/entry/ace${entry.ace_id}`} class="entry-card">
                        <img
                            src={get_image_full_src(
                                entry.poster_path,
                                "poster",
                            )}
                            alt={`entry poster for ${entry.title}`}
                            class="poster"
                        />
                        <div>
                            <h3>{entry.title} ({entry.year})</h3>
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
        <div class="next-prev-navigation">
            <a
                href={`/search?query=${data.q}&page=${data.page_n - 1}#query-title`}
                class:disabled={data.page_n <= 1}
                class="next-navigation"
            >
                <Icon icon_name="arrow-left" size="32px" />
            </a>
            <a
                href={`/search?query=${data.q}&page=${data.page_n + 1}#query-title`}
                class:disabled={data.no_more_entries_left}
                class="prev-navigation"
            >
                <Icon icon_name="arrow-right" size="32px" />
            </a>
        </div>
    {/if}
</main>

<style>
    .next-prev-navigation {
        margin-top: 2rem;
        gap: 2rem;
        display: flex;
        justify-content: center;
    }

    .next-navigation,
    .prev-navigation {
        padding: 1rem;
        margin: 0;
        border: 0;
        border-radius: 100vw;
        cursor: pointer;
        transition: transform ease 200ms;
        text-decoration: none;
        color: hsl(260, 43%, 99%);
        background-color: var(--primary);
        border: 2px solid var(--primary);
        max-width: fit-content;
    }

    a.disabled {
        pointer-events: none;
        cursor: default;
        background-color: var(--neutral);
        border: 2px solid var(--neutral);
    }

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

    .entry-card:focus {
        outline: 0;
    }

    .entry-card {
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

    .cards > .card,
    .poster {
        border-radius: 1rem;
    }

    h3 {
        font-size: 3rem;
    }

    li + li {
        margin-top: 1rem;
    }

    @media screen and (max-width: 1050px) {
        h3 {
            font-size: 1rem;
            margin: 0;
        }

        li {
            padding: 0;
        }

        .poster,
        .cards > .card {
            border-radius: 0.5rem;
        }

        .entry-card {
            padding: 0.5rem;
            grid-template-columns: 7fr 8fr;
            grid-template-rows: 1fr 1fr;
            gap: 0.5rem;
        }

        .poster {
            grid-row: span 2;
        }
        .cards {
            padding-right: 0;
        }
    }
</style>
