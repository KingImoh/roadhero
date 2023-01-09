<script lang="ts">
  import rhlogo from "$lib/assets/img/roadhero_white.png";
  import RoadHeroLogo from "./RoadHeroLogo.svelte";
  import welcome from "$lib/assets/img/welcome-1.png";
</script>

<div class="flex flex-col items-center p-10 space-y-35 h-screen bg-primaryBlue">
  <div class="w-200px mt-20">
    <img src={rhlogo} alt="" />
  </div>

  <div>
    <img src={welcome} alt="" />
  </div>

  <div
    class="bg-secondaryGreen p-4 flex flex-col-items-center justify-center text-white rounded-lg w-90%"
  >
    Get Started
  </div>
</div>
