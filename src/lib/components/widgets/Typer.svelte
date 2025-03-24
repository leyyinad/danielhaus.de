<script lang="ts">
  import { onDestroy, onMount, type Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    delay?: number;
    pauseDelay?: number;
    showCursor?: boolean;
  }

  let { children, delay = 100, pauseDelay = 1200, showCursor = true }: Props = $props();

  let showContainer = $state(true);
  let container: HTMLSpanElement | undefined = $state(undefined);
  let text = '';
  let count = 0;
  let currentText = $state('');
  let timer: number | undefined = undefined;

  const init = () => {
    text = container?.innerText ?? '';
    showContainer = false;

    timer = window.setTimeout(loop, 100);
  };

  const loop = () => {
    const char = text[count];

    switch (char) {
      case '\n':
        currentText += '<br/>';
        break;

      case ',':
      case '.':
        currentText += `<span class="opacity-25">${char}</span>`;
        break;

      default:
        currentText += char;
    }

    count++;

    if (count < text.length) {
      let d = delay;

      if (text[count] === ',') {
        d += pauseDelay;
      }

      timer = window.setTimeout(loop, d);
    } else {
      setTimeout(() => {
        showCursor = false;
      }, delay * 24);
      cleanup();
    }
  };

  const cleanup = () => {
    if (timer) {
      window.clearTimeout(timer);
      timer = undefined;
    }
  };

  onMount(init);
  onDestroy(cleanup);
</script>

<!-- eslint-disable svelte/no-at-html-tags -->

{#if showContainer}
  <span bind:this={container}>{@render children?.()}</span>
{/if}

<span class="typer"
  >{@html currentText}{#if showCursor}<i></i>{/if}</span
>

<style>
  .typer {
    animation: 2s typing;
  }

  i {
    display: inline;
    animation: 1s step-start 0s infinite blink;
    margin-left: 0.1em;
    border-left: 3px solid white;
    height: 1em;
    line-height: 1;
  }

  @keyframes typing {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink {
    0% {
      opacity: 0.5;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 0;
    }
  }
</style>
