<script>
  import Form from "../Form.svelte";
  export let html = "";
  export let input = {};
  export let actions = undefined;

  let values;

  function handleClick() {
    values = { ...input };
  }
</script>

<Form bind:values {actions}>
  {@html html}
</Form>

<pre data-testid="values">{JSON.stringify(values)}</pre>

<button on:click={handleClick} data-testid="b1">Click Me</button>
