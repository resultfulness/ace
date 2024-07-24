<script lang="ts">
    import { page } from "$app/stores";
    import Icon from "$lib/components/icon.svelte";
    import Search from "$lib/components/search.svelte";
</script>

<div class="search-container">
    <Search />
</div>
<header>
    <a href="/" title="Main page" class="logo">
        <h1>ace of spades &spades;</h1>
    </a>
    <div style:visibility={$page.url.pathname === "/" ? "hidden" : "visible"}>
        <Search />
    </div>
    <div>
        <!-- <a href="/account" title="account" class="account">account</a> -->
    </div>

</header>

<style>
header {
    display: grid;
    grid-template-columns: auto 1fr 8rem;
    align-items: center;
    gap: 4rem;
    padding: 1rem 4rem;
    border-bottom: 2px solid var(--neutral);
    z-index: 999;
}

.account {
    padding: 1rem;
    margin: 0;
    border: 0;
    border-radius: 100vw;
    cursor: pointer;
    transition: transform ease 200ms;
    text-decoration: none;
    place-items: center;
    color: hsl(260, 43%, 99%);
    background-color: var(--primary);
    border: 2px solid var(--primary);
}


@media screen and (max-width: 1050px) {
    header {
        padding: .25rem;
        padding-right: 1rem;
        grid-template-columns: 1fr auto;
        gap: 1rem;
        font-size: .75rem;
    }
    header div {
        display: none;
    }
}

a.logo {
    color: inherit;
    text-decoration: inherit;
    border-radius: 100vw;
    padding-inline: 2rem;
}

a.logo:focus {
    outline: 2px solid var(--primary);
    outline-offset: 6px;
}
@media screen and (max-width: 1050px) {
.search-container {
    width: 100%;
    z-index: 999;
    font-size: 1rem;
    position: fixed;
    background-color: var(--neutral);
    bottom: 0;
    left: 0;
    padding-block: 1rem;
}
}

.search-container {
    display: none;
}
</style>
