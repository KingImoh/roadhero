<script lang="ts">
  import MapSearch from "../components/MapSearch.svelte";

  let footerHeight = 0;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- <div class="absolute z-2 bottom-0 h-20 w-full mb-70px "> -->
<!-- </div> -->
<MapSearch />
<slot />
