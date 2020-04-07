<script>
  import { enhanceInputs } from "./enhanceInputs.js";
</script>

<form use:enhanceInputs on:update>
  <slot />
</form>
