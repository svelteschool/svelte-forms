<script>
  import Form from "./Form.svelte";

  export let html;
  let values;
</script>

<Form bind:values>
  {@html html}
</Form>

<pre data-testid="values">{JSON.stringify(values)}</pre>
