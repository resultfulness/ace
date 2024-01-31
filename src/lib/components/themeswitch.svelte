<script lang="ts">
  import Icon from "./icon.svelte";

  export let checked: boolean;
</script>

<label class="switch">
  <span class:hide={!checked} class="moon">
    <Icon icon="dark_mode" size="28px" />
  </span>
  <span class:hide={checked} class="sun">
    <Icon icon="light_mode" size="28px" />
  </span>
  <input type="checkbox" bind:checked />
  <span class="slider round" />
</label>

<style>
  label {
    border-radius: 100vw;
  }

  label:focus-within {
    outline: 2px solid var(--primary);
    outline-offset: 6px;
  }

  .switch {
    --_switch-width: 5.5rem;
    --_switch-height: 3rem;

    position: relative;
    display: inline-block;
    width: var(--_switch-width);
    height: var(--_switch-height);
  }

  .moon, .sun {
    --_offset: calc(var(--_switch-height) / 2 - 14px);

    position: absolute;
    z-index: 99999;
    top: var(--_offset);
    cursor: pointer;
  }
  .moon {
    left: var(--_offset);
  }
  .sun {
    right: var(--_offset);
  }

  .hide {
    display: none;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    inset: 0;
    border-radius: 100vw;
    border: 8px solid var(--neutral);
    background-color: var(--neutral);
    cursor: pointer;
  }

  .slider::before {
    content: "";
    position: absolute;
    transition: transform ease 0.2s;
    aspect-ratio: 1;
    height: 100%;
    border-radius: 50%;
    background-color: var(--primary);
  }

  input:checked + .slider::before {
    transform: translateX(calc(var(--_switch-width) - var(--_switch-height)));
  }
</style>
