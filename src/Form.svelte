<script>
  import { getValues } from "./getValues.js";
  export let values;
</script>

<form on:update={({ detail }) => (values = detail)} use:getValues>
  <slot />
</form>
