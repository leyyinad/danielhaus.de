<div class="outer">
  <div><slot /></div>
</div>

<style lang="postcss">
  .outer {
    @apply relative h-full overflow-hidden;
  }

  .outer > div {
    @apply absolute left-0 top-0 h-auto;

    --duration: 10s;
    --delay: 0s;

    animation: var(--duration) linear var(--delay) infinite scroll-anim;
  }

  @keyframes scroll-anim {
    0% {
      transform: translateY(100%);
    }

    100% {
      transform: translateY(-100%);
    }
  }
</style>
