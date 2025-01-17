<script lang="ts">
  let { children } = $props();
</script>

<div>
  <pre>{@render children?.()}</pre>
</div>

<style>
  div,
  pre {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  div {
    overflow: hidden;
  }

  pre {
    transform: translateX(100%);
    animation: var(--duration) linear var(--delay) infinite scroll-anim;
    white-space: nowrap;
  }

  @keyframes scroll-anim {
    0% {
      transform: translate(0);
    }

    100% {
      transform: translate(-800%);
    }
  }
</style>
