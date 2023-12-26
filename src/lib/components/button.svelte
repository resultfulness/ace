<script lang="ts">
    import "./button.css";

    export let onclick: () => void;
    export let role: "primary" | "secondary" | "tertiary" = "primary";
    export let _class: string = "";
</script>

<button
    on:click={onclick}
    class:primary-button={role === "primary"}
    class:secondary-button={role === "secondary"}
    class:tertiary-button={role === "tertiary"}
    class={_class}
>
    <slot />
</button>
