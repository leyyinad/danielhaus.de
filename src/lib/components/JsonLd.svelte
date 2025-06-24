<script lang="ts">
  const { linkedData } = $props();

  const serializeSchema = (schema: object) =>
    `<script type="application/ld+json">${JSON.stringify(schema, undefined, 2)}</` + `script>`;
</script>

<!--  eslint-disable-next-line svelte/no-at-html-tags -->
{@html serializeSchema(linkedData)}
