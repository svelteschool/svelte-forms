<script>
  import { getValues } from "./getValues.js";
</script>

<form use:getValues on:update>
  <slot />
</form>
