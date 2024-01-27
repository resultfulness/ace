<script lang="ts">
    import "@fontsource/outfit";
    import "@fontsource/material-symbols-outlined";
    import "../app.css";
    import Header from "./header.svelte";
    import Footer from "./footer.svelte";
</script>

<div id="app">
    <Header></Header>
    <slot />
    <Footer></Footer>
</div>
