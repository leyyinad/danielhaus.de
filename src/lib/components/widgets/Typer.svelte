<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  export let delay = 100;
  export let pauseDelay = 1200;
  export let showCursor = true;

  let container: HTMLSpanElement;
  let text = '';
  let count = 0;
  let currentText = '';
  let timer: number | undefined = undefined;

  const init = () => {
    text = container.innerText;
    container.remove();

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

<span bind:this={container}><slot /></span>
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
