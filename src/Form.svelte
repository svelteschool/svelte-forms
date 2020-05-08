<script>
  import { getValues } from "./actions/form/getValues.js";
  import { useActions } from "./actions/actions.js";
  export let values = undefined;

  export let actions = [];
</script>

<form
  on:update={({ detail }) => (values = detail)}
  use:getValues={values}
  use:useActions={actions}
  on:submit>
  <slot />
</form>
