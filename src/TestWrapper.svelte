<script>
  import Form from "./Form.svelte";

  export let html;
  let formValues = {};
</script>

<Form on:update={({ detail }) => (formValues = detail)}>
  {@html html}
</Form>

<pre data-testid="values">{JSON.stringify(formValues)}</pre>
