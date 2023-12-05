<div class="outer">
  <div><slot /></div>
</div>

<style lang="postcss">
  .outer {
    @apply relative
      h-full
      overflow-hidden;
  }

  .outer > div {
    @apply absolute
      left-0
      top-0
      h-auto;

    animation: scroll-anim var(--duration) linear var(--delay) infinite;
  }

  @keyframes scroll-anim {
    0% {
      @apply translate-y-full;
    }

    100% {
      @apply -translate-y-full;
    }
  }
</style>
