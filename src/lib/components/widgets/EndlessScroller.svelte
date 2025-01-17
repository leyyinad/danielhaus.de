<div class="outer">
  <div><slot /></div>
</div>

<style>
  .outer {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .outer > div {
    position: absolute;
    top: 0;
    left: 0;
    animation: var(--duration) linear var(--delay) infinite scroll-anim;
    height: auto;

    --duration: 10s;
    --delay: 0s;
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
