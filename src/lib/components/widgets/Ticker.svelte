<div>
  <pre><slot /></pre>
</div>

<style lang="postcss">
  div {
    @apply absolute
      left-0
      top-0
      h-full
      w-full
      overflow-hidden;
  }

  pre {
    @apply absolute
      left-0
      top-0
      h-full
      w-full
      translate-x-full
      whitespace-nowrap;

    --duration: 10s;
    --delay: 4s;

    animation: scroll-anim var(--duration) linear var(--delay) infinite;
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
