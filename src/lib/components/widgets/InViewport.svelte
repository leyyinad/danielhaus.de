<script lang="ts">
  import { onDestroy, onMount, type Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    threshold?: number;
    viewport?: ({ isInViewport }: { isInViewport: boolean }) => void | undefined;
    enter?: () => void | undefined;
    leave?: () => void | undefined;
  }

  let { children, threshold = 0.1, viewport, enter, leave }: Props = $props();

  let isInViewport: boolean = $state(false);

  let observer: IntersectionObserver | undefined;
  let target: HTMLElement;

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
        viewport?.({ isInViewport });

        if (isInViewport) {
          enter?.();
        } else {
          leave?.();
        }
      }
    });
  };

  onMount(init);
  onDestroy(cleanup);
</script>

<span bind:this={target}>{@render children?.()}</span>
