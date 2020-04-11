<script>
  import { getValues } from "./getValues.js";
  export let values = undefined;
</script>

<form on:update={({ detail }) => (values = detail)} use:getValues={values}>
  <slot />
</form>
