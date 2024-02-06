<script>
    import Icon from "$lib/components/icon.svelte";
</script>

<footer>
    <h2>ace of spades &spades;</h2>
    <nav>
        <a href="/">home</a>
        <a href="#about">about</a>
        <a href="https://github.com/resultfulness/ace">
            <Icon icon_name="mark-github" size="20px"/>
            source
        </a>
        <a href="https://https://www.themoviedb.org">TMDB</a>
    </nav>
    <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
</footer>

<style>
    footer {
        background-color: var(--neutral);
        border-radius: 2rem;
        padding: 2rem;

        margin: 4rem auto;
        width: min(1440px, 100% - 2rem);
    }
    h2, p {
        text-align: center;
        filter: brightness(0.75);
    }
    nav {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4rem;
        padding-inline: 4rem;
    }
    nav > a {
        text-align: center;
        background-color: var(--neutral);
        border-radius: 100vw;
        filter: brightness(0.9);
        text-decoration: none;
        color: inherit;
    }
    nav > a:hover {
        filter: brightness(1.2);
    }
    nav > a:focus {
        outline: 2px solid var(--primary);
        outline-offset: 6px;
    }
</style>
