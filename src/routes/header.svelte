<script>
    import { page } from "$app/stores";
    import Linkbutton from "$lib/components/linkbutton.svelte";
    import Search from "$lib/components/search.svelte";
</script>

<header>
    <a href="/" title="Home" class="logo">
        <h1>Ace of spades</h1>
    </a>
    <div style:visibility={$page.url.pathname === "/" ? "hidden" : "visible"}>
        <Search />
    </div>
    <Linkbutton href="/auth/login">Login</Linkbutton>
</header>

<style>
    header {
        display: grid;
        grid-template-columns: auto 1fr 8rem;
        align-items: center;
        gap: 4rem;
        padding: .25rem 4rem;
        border-bottom: 2px solid var(--neutral);
    }

    a.logo {
        color: inherit;
        text-decoration: inherit;
    }
</style>
