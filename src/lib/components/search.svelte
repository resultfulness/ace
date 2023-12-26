<script lang="ts">
    let value: string = "";
</script>

<form method="GET" action="javascript:void(0);">
    <label>
        <input bind:value placeholder="Look for a movie or series..." />
        <button class="primary-button" type="submit">Search</button>
    </label>
</form>

<style>
    label {
        display: grid;
        grid-template-columns: 1fr auto;
        padding-left: 1.5em;
        box-shadow: inset 0 0 0 2px var(--neutral);
        border-radius: 100vw;
        width: 100%;
        background-color: var(--bg);
        cursor: text;
    }

    input {
        border: 0;
        border-top: 2px solid var(--neutral);
        border-bottom: 2px solid var(--neutral);
        background-color: inherit;
    }
    input:focus { outline: 0; }

    label:focus-within {
        background-color: var(--neutral);
        outline: 2px solid var(--primary);
        outline-offset: 6px;
    }

    button:hover {
        transform: translate(0, 0);
        filter: brightness(1.4) saturate(.6);
    }
</style>
