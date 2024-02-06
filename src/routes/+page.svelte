<script>
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
            <Icon icon_name="chevron-down" size="7rem" />
        </h2>
    </a>

    <h3 id="about">about</h3>
    <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        distinctio quas optio nemo tempore eum explicabo veritatis omnis velit
        quo odit, eius, eos corporis magni quod repellendus quae reprehenderit
        ab. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias et
        architecto deserunt distinctio repellat suscipit explicabo numquam, quia
        excepturi ut aut cum eos, voluptatem praesentium. Vero doloribus fugit
        voluptate reprehenderit?
    </p>

    <h3 id="card_meanings">card meanings</h3>
    <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas error
        rerum nesciunt laudantium ex voluptatibus voluptate omnis iste!
        Perspiciatis, animi voluptatum? Rem repellat velit minus harum nihil
        enim magnam sed, possimus error maxime quis, quasi quas voluptatem ab
        ratione dicta illum perferendis accusantium saepe. Accusantium excepturi
        harum dolore iure expedita possimus fuga quod, incidunt distinctio
        ratione, libero aperiam velit officia unde quibusdam eaque asperiores
        totam natus vel ullam eligendi adipisci? Soluta, maxime laboriosam
        cupiditate optio accusantium aut error, ducimus illo sequi quia officia
        excepturi nostrum repellat cumque enim deserunt ex eveniet cum. Fugiat
        quas maiores non, consequatur placeat excepturi iste.
    </p>
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
        font-size: 1.5rem;
    }
</style>
