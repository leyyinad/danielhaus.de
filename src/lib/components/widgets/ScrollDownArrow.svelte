<script lang="ts">
  let y: number;
</script>

{#if y < 20}
  <div class="arrs">
    <div class="arr"></div>
    <div class="arr"></div>
    <div class="arr"></div>
  </div>
{/if}

<svelte:window bind:scrollY={y} />

<style>
  .arrs {
    position: absolute;
    top: 82%;
    left: 50%;
    transform: scale(0.75);

    @media (min-width: 768px) {
      top: 90%;
      transform: scale(1);
    }
  }

  .arr {
    position: absolute;
    transform: scale(50%);
    opacity: 0;
    animation: 7s linear 1.6s infinite down-anim;
  }

  .arr:nth-child(2) {
    animation-delay: 1.9s;
  }

  .arr:nth-child(3) {
    animation-delay: 2.2s;
  }

  .arr::before,
  .arr::after {
    display: block;
    transform: translateX(-1.75rem) rotate(45deg);
    border-radius: 0.25rem;
    background-color: white;
    width: 2.25rem;
    height: 0.5rem;
    content: '';
  }

  .arr::after {
    transform: translate(-0.5rem, -0.5rem) rotate(-45deg);
  }

  @keyframes down-anim {
    0% {
      transform: translateY(-2.5rem);
      opacity: 0;
    }

    5% {
      opacity: 0.5;
    }

    10% {
      opacity: 0.5;
    }

    15% {
      transform: translateY(2.5rem);
      opacity: 0;
    }
  }
</style>
