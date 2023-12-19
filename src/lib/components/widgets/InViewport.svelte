<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  export let threshold = 0.25;

  let isInViewport: boolean;

  let observer: IntersectionObserver | undefined;
  let target: HTMLElement;

  const dispatch = createEventDispatcher();

  const init = () => {
    if (target.firstElementChild != null) {
      observer = new IntersectionObserver(updateIsInViewport, { threshold });
      observer.observe(target.firstElementChild);
      observer.thresholds;
    }
  };

  const cleanup = () => {
    observer?.disconnect();
  };

  const updateIsInViewport = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((currentEntry) => {
      const inViewport = currentEntry.intersectionRatio > 0;

      console.log(currentEntry.intersectionRatio);

      if (isInViewport !== inViewport) {
        isInViewport = inViewport;
        dispatch('viewport', { isInViewport });
      }

      if (currentEntry.intersectionRatio >= 0.8) {
        dispatch('viewportFull', { ratio: currentEntry.intersectionRatio });
      }

      return inViewport;
    });
  };

  onMount(init);
  onDestroy(cleanup);
</script>

<span bind:this={target}><slot name="inViewport" {isInViewport} /></span>
