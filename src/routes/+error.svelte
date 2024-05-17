<script>
    import { page } from "$app/stores";
    import Icon from "$lib/components/icon.svelte";

    console.log($page);
</script>

<svelte:head>
    <title>
        Error {$page.status} -- Ace of Spades
    </title>
</svelte:head>

<main>
    <Icon icon_name="alert-fill" size="24px"/>
    <h2>
        An error ocurred:
        {#if $page.status == 404}
            {$page.status} error: not found
        {:else}
            {$page.status} error
        {/if}
    </h2>
    <p>
        {$page.error?.message}
    </p>
</main>

<style>
main {
    display: grid;
    padding: 2rem 1rem;
    margin-inline: auto;
    width: min(100% - 2rem, 1440px);
}

h2 {
    font-size: 2rem;
}
</style>
