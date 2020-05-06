<script>
  import Form from "../src/Form.svelte";
  export let html;
  export let input = {};

  let values;

  function handleClick() {
    values = { ...input };
  }
</script>

<Form bind:values>
  {@html html}
</Form>

<pre data-testid="values">{JSON.stringify(values)}</pre>

<button on:click={handleClick} data-testid="b1">Click Me</button>
