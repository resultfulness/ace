<script lang="ts">
    import "./button.css";

    export let href: string;
    export let role: "primary" | "secondary" | "tertiary" = "primary";
</script>

<a
    {href}
    class:primary-button={role === "primary"}
    class:secondary-button={role === "secondary"}
    class:tertiary-button={role === "tertiary"}
>
    <slot />
</a>
