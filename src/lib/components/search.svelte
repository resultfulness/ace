<script lang="ts">
    import { page } from "$app/stores";
    import Icon from "./icon.svelte";

    let value: string = "";

    if ($page.url.searchParams.get("query")) {
        value = $page.url.searchParams.get("query")!;
    }
</script>

<form method="get" action="/search">
    <label>
        <span>
            <Icon icon_name="search" size="1.5em" />
        </span>
        <input
            bind:value
            placeholder="look for a movie or series..."
            name="query"
        />
        <button>search</button>
        <button class="mobile">
            <Icon icon_name="search" size="1.5em" />
        </button>
    </label>
</form>

<style>
    label {
        display: grid;
        grid-template-columns: auto 1fr auto;
        box-shadow: inset 0 0 0 2px var(--neutral);
        border-radius: 100vw;
        width: 100%;
        background-color: var(--bg);
        cursor: text;
    }

    span {
        display: grid;
        place-items: center;
        padding-inline: 1em 0.5em;
        color: #919196;
    }

    input {
        border: 0;
        border-top: 2px solid var(--neutral);
        border-bottom: 2px solid var(--neutral);
        background-color: inherit;
    }
    input:focus {
        outline: 0;
    }

    label:focus-within {
        background-color: var(--neutral);
        outline: 2px solid var(--primary);
        outline-offset: 6px;
    }

    button:hover {
        filter: brightness(1.4) saturate(0.6);
    }

    button {
        border-radius: 100vw;
        padding: .75em 1.5em;
        cursor: pointer;
        transition: transform ease 200ms;
        text-decoration: none;
        display: grid;
        place-items: center;
        color: hsl(260, 43%, 99%);
        background-color: var(--primary);
        border: 2px solid var(--primary);
    }
    button.mobile {
        padding: .75em;
        border-radius: 50%;
    }

    button:focus {
        outline: 2px solid var(--primary);
        outline-offset: 6px;
    }

    button.mobile {
        display: none;
    }

    @media screen and (max-width: 1050px) {
        label {
            grid-template-columns: auto 1fr 54.8px;
        }
        button {
            display: none;
        }

        button.mobile {
            display: initial;
        }
    }
</style>
