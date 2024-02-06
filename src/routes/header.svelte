<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import Search from "$lib/components/search.svelte";
    import Themeswitch from "$lib/components/themeswitch.svelte";
    import { onMount } from "svelte";

    let is_light_theme: boolean;
    onMount(() => {
        is_light_theme =
            document.documentElement.getAttribute("data-theme") === null;
    })

    $: {
        if (browser) {
            if (is_light_theme) {
                document.documentElement.removeAttribute("data-theme");
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
            }
        }
    }
</script>

<header>
    <a href="/" title="Main page" class="logo">
        <h1>ace of spades &spades;</h1>
    </a>
    <div style:visibility={$page.url.pathname === "/" ? "hidden" : "visible"}>
        <Search />
    </div>
    <Themeswitch bind:checked={is_light_theme} />
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
</style>
