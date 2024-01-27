<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/stores";
    import Icon from "$lib/components/icon.svelte";
    import Linkbutton from "$lib/components/linkbutton.svelte";
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
    <a href="/" title="Home" class="logo">
        <h1>Ace of spades</h1>
    </a>
    <div style:visibility={$page.url.pathname === "/" ? "hidden" : "visible"}>
        <Search />
    </div>
    <!-- <Linkbutton href="/auth/login">Login</Linkbutton> -->
    <!-- <button class="theme-switch" on:click={toggleTheme}> -->
    <!--     <Icon icon="light_mode" /> -->
    <!-- </button> -->
    <Themeswitch bind:checked={is_light_theme} />
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
