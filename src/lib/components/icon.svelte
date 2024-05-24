<script lang="ts">
    import icons, { type IconName } from "@primer/octicons";

    export let icon_name: IconName;
    export let size: string = "16px";

    let icon = icons[icon_name];
</script>

{#if icon.heights["16"]}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        class="octicon"
        width={size}
    >
        {@html icon.heights["16"].path}
    </svg>
{:else}
    <p>{icon_name}</p>
{/if}

<style>
    .octicon {
        display: inline-block;
        vertical-align: text-top;
        fill: currentColor;
        overflow: visible;
    }
</style>
