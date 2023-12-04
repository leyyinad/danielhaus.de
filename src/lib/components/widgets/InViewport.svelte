<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  let isInViewport: boolean;

  let observer: IntersectionObserver | undefined;
  let target: HTMLElement;

  const dispatch = createEventDispatcher();

  const init = () => {
    if (target.firstElementChild != null) {
      observer = new IntersectionObserver(updateIsInViewport);
      observer.observe(target.firstElementChild);
    }
  };

  const cleanup = () => {
    observer?.disconnect();
  };

  const updateIsInViewport = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((currentEntry) => {
      const inViewport = currentEntry.intersectionRatio > 0;
      if (isInViewport !== inViewport) {
        isInViewport = inViewport;
        dispatch('viewport', { isInViewport });
      }
      return inViewport;
    });
  };

  onMount(init);
  onDestroy(cleanup);
</script>

<span bind:this={target}><slot {isInViewport} /></span>
