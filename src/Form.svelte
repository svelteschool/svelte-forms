<script>
  import { getValues } from "./getValues.js";
</script>

<form on:update use:getValues>
  <slot />
</form>
