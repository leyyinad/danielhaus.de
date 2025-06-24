<script lang="ts">
  import type { Thing, WithContext } from 'schema-dts';

  type Schema = Thing | WithContext<Thing>;

  const {
    linkedData
  }: {
    linkedData: Schema;
  } = $props();

  const serializeSchema = (schema: Schema) =>
    `<script type="application/ld+json">${JSON.stringify(schema, undefined, 2)}</` + `script>`;
</script>

<!--  eslint-disable-next-line svelte/no-at-html-tags -->
{@html serializeSchema(linkedData)}
