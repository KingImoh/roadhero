<script lang="ts">
  import Search from "./components/Searchbar.svelte";
  import { onDestroy, onMount } from "svelte";
  import { isCollide } from "$lib/utils";
  import clsx from "clsx";
  import Post from "./components/Post.svelte";
  let header: Element;
  let headerCollides: boolean;

  // using the "#app" div instead of "body" because overflow is set to hidden on the body
  // therefore the scroll event has no effect on the body, but works on "#app"
  onMount(() => document.querySelector("#app")!.addEventListener("scroll", handleScroll));

  onDestroy(() => document.querySelector("#app")!.removeEventListener("scroll", handleScroll));

  function handleScroll() {
    if (!header) return;
    headerCollides = isCollide(header, document.querySelector("#container")!);
  }
</script>

<div
  bind:this={header}
  class={clsx("top-0 sticky bg-white z-999", headerCollides && "border-b-2 border-secondaryGreen")}
>
  <Search />
</div>

<div class="m-4 px-1" id="container">
  <select
    name="fliter"
    id=""
    class="border border-primaryBlue bg-transparent p-2 mb-4 rounded-lg text-primaryBlue outline-none"
  >
    <option value="new">Newest</option>
    <option value="appreciated">Appreciated</option>
    <option value="resolved">Resolved</option>
  </select>

  {#each [...Array(10)] as times}
    <Post />
  {/each}
</div>
