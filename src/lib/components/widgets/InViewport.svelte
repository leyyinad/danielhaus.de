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
    }
  };

  const cleanup = () => {
    observer?.disconnect();
  };

  const updateIsInViewport = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((currentEntry) => {
      if (currentEntry.isIntersecting !== isInViewport) {
        isInViewport = currentEntry.isIntersecting;
        dispatch('viewport', { isInViewport });

        if (isInViewport) {
          dispatch('enter');
        } else {
          dispatch('leave');
        }
      }
    });
  };

  onMount(init);
  onDestroy(cleanup);
</script>

<span bind:this={target}><slot name="inViewport" {isInViewport} /></span>
