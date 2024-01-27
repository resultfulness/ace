<script lang="ts">
  export let icon: string;
  export let size: string = "24px";
  export let color: string = "inherit";
</script>

<span
  class="material-symbols-outlined"
  style:font-size={size}
  style:color
>
  {icon}
</span>

<style>
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -moz-font-feature-settings: 'liga';
  -moz-osx-font-smoothing: grayscale;
}
</style>
