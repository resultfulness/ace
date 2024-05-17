<script lang="ts">
    import "@fontsource/outfit";
    import "@fontsource/outfit/700.css";
    import "../app.css";
    import Header from "./header.svelte";
    import Footer from "./footer.svelte";
    import Loading from "$lib/components/loading.svelte";
    import { navigating } from "$app/stores";
</script>

<div id="app">
    {#if $navigating}
        <Loading />
    {/if}
    <Header></Header>
    <slot />
    <Footer></Footer>
</div>

<style>
    #app {
        position: relative;
    }
</style>
