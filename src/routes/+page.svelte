<script>
    import { CARDS } from "$lib/ace_cards";
    import Icon from "$lib/components/icon.svelte";
    import Search from "$lib/components/search.svelte";
</script>

<svelte:head>
    <title>Main page -- Ace of Spades</title>
</svelte:head>

<main>
    <div class="search-container">
        <Search />
    </div>

    <a href="#about">
        <h2>
            what is this site?
            <span><Icon icon_name="chevron-down" size="7rem" /></span>
        </h2>
    </a>

    <h3 id="about">about</h3>
    <p>
        This website was created with the aim of allowing its users to ensure
        the movies and series they want to watch are on an acceptable to each
        user level of explicit content like nudity or sex. We have aggregated
        ratings from various sources and are designing an algorithm for rating
        media on those metrics. Currently, the ratings are available only up
        until the time we collected our initial data, and only for content
        popular enough. In the future, we plan to support a wider amount of
        movies and tv series.
    </p>

    <h3 id="card_meanings">card meanings</h3>
    <p>
        Ace of spades uses cards to rate movies and tv series based on how much
        explicit content they contain. The cards used, from least to most
        explicit are as following:
    </p>
    <ul>
        <li>
            <img src={CARDS.ace} alt="playing card, ace" >
            <p>
                <b>Ace</b> - the entry has pretty much no mention or scenes depicting
                sex/nudity
            </p>
        </li>
        <li>
            <img src={CARDS.king} alt="playing card, king" >
            <p>
                <b>King</b> - the entry has minimal amounts of explicit content
            </p>
        </li>
        <li>
            <img src={CARDS.queen} alt="playing card, queen" >
            <p>
                <b>Queen</b> - some explicit content appears in the entry
            </p>
        </li>
        <li>
            <img src={CARDS.jack} alt="playing card, jack" >
            <p>
                <b>Jack</b> - the entry has several sexual scenes throughout its
                runtime
            </p>
        </li>
        <li>
            <img src={CARDS._10} alt="playing card, 10" >
            <p>
                <b>Ten</b> - severe sexual or nudity containing scenes appear in the
                entry
            </p>
        </li>
        <li>
            <img src={CARDS._9} alt="playing card, 9">
            <p>
                <b>Nine</b> - the entry is largely based around sex or nudity
            </p>
        </li>
    </ul>
</main>

<style>
    main {
        margin-inline: auto;
        width: min(100% - 2rem, 1440px);

        display: grid;
        grid-template-rows: calc(70vh - 8rem) 30vh;
    }

    .search-container {
        display: grid;
        align-items: center;
        font-size: 2rem;
    }


    h2 {
        font-size: 5rem;
    }

    a {
        text-decoration: none;
        color: inherit;
        border-radius: 2rem;
    }

    a:hover > * {
        border-bottom: 1px solid white;
    }

    a:focus {
        outline: 2px solid var(--primary);
        outline-offset: 6px;
    }

    h3 {
        font-size: 4rem;
        position: relative;
        border-bottom: 8px solid var(--neutral);
    }

    p {
        text-align: justify;
        font-size: 1.5rem;
    }

    li {
        display: grid;
        grid-template-columns: 144px 4fr;
        gap: 1rem;
        margin-block: 4rem;
        align-items: center;
    }

    @media screen and (max-width: 1050px) {
        main {
            grid-template-rows: initial;
        }
        ul {
            margin: 0;
            padding: 0;
        }
        li {
            grid-template-columns: 1fr;
            justify-items:center;
        }
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

        h2 {
            font-size: 3rem;
        }
        h2 span {
            display: none;
        }

        h3 {
            font-size: 2rem;
        }

        p {
            font-size: 1rem;
        }
    }

    img {
        max-width: 144px;
        border-radius: 1rem;
    }
</style>
