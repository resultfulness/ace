<script lang="ts">
    import Icon from "./icon.svelte";

    let value: string = "";
</script>

<form method="get" action="/search">
    <label>
        <span>
            <Icon icon="search" size="1.5em" />
        </span>
        <input
            bind:value
            placeholder="Look for a movie or series..."
            name="query"
        />
        <button class="primary-button" type="submit">Search</button>
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
        transform: translate(0, 0);
        filter: brightness(1.4) saturate(0.6);
    }
</style>
