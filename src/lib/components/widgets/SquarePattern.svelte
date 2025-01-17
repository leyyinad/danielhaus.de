<script lang="ts">
  import { onMount } from 'svelte';

  function generateSvg(): string {
    const s = 16,
      sx = 1;
    let objs = '';

    for (let i = -1; i < 8; i++) {
      let y0 = s * (1.5 * i - 1);
      let i0 = s * 0.25 * i;

      objs += diamond(s, -s, y0, i0, sx);
      objs += diamond(s, s, y0, i0, sx);

      objs += diamond(s, 0, y0 - s * 0.75 + 0.25 * i0, 1.5 * (s + i - 4), sx);
    }

    return `<svg viewBox="0 0 ${sx * s * 2} ${s * 8}" xmlns="http://www.w3.org/2000/svg">
      ${objs}</svg>`;
  }

  function diamond(s: number, x: number, y: number, inset: number, sx: number): string {
    const r = inset / 2;

    const cs = [
      [sx * (x + s), y + r],
      [sx * (x + 2 * s - r), y + s],
      [sx * (x + s), y + 2 * s - r],
      [sx * (x + r), y + s]
    ];

    return `<path fill="#000" d="
      M${cs[0].join(' ')}
      L${cs[1].join(' ')}
      L${cs[2].join(' ')}
      L${cs[3].join(' ')}
      Z
    " />`;
  }

  let pattern: string | undefined;

  onMount(() => {
    setTimeout(() => (pattern = btoa(generateSvg())), 10);
  });
</script>

<div
  style={pattern ? `background-image: url('data:image/svg+xml;base64,${pattern}')` : undefined}
></div>

<style>
  div {
    background-repeat: repeat-x;
    background-color: var(--bluebirth-950);
    height: 24rem;
  }
</style>
