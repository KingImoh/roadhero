<script lang="ts">
  import "../app.css";
  import "@unocss/reset/tailwind.css"; // https://github.com/unocss/unocss#style-resetting
  import "uno.css"; // https://github.com/unocss/unocss/tree/main/packages/vite#installation

  import Navbar from "./components/Navbar.svelte";
  import Footer from "./components/Footer.svelte";
  let footerHeight = 0;

  import LoginSignUp from "./components/LoginSignUp.svelte";
</script>

<!-- <div
  id="app"
  class="relative h-screen w-full overflow-x-hidden pb-[var(--footerH)] bg-[#F5F5F5]"
  style:--footerH="{footerHeight}px"
> -->
<slot />
<!-- </div> -->

<Footer bind:footerHeight />
<!-- <LoginSignUp /> -->
