<script lang="ts">
    import Icon from "./icon.svelte";

    export let show: boolean = false;

    let dialog: HTMLDialogElement;

    $: if (dialog && show) dialog.showModal();
</script>

<dialog
    bind:this={dialog}
    on:close={() => show = false}
>
    <div>
        <h2><slot name='header'></slot></h2>
        <button on:click={() => dialog.close()}><Icon icon_name="x" size="20px"/></button>
    </div>
    <hr />
    <p>
        <slot />
    </p>
</dialog>

<style>
    dialog {
        border: 4px solid var(--neutral);
        border-radius: 1rem;
        position: relative;
    }

    ::backdrop {
        background-color: rgba(0 0 0 / 0.7);
    }
    
    button {
        border: 0;
        background: 0;
        padding: 0;
        padding-inline: 1rem;
    }

    button:hover {
        background-color: var(--neutral);
        cursor: pointer;
    }

    div {
        display: grid;
        grid-template-columns: 1fr auto;
        align-content: center;
    }

    h2 {
        margin-block: .25rem;
    }

    p {
        max-width: 80ch;
        text-align: justify;
    }
</style>
