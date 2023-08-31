<script>
	import Engine from '$lib/engine/Engine.svelte';
</script>

<div class="container mx-auto mt-12 px-12 min-h-screen">
	<Engine />

	<div class="grid grid-cols-2 gap-8 mt-12 py-12 hidden">
		<div class="order-1">
			<h1 class="h1 font-thin tracking-wide uppercase">
				Daniel <span class="font-light tracking-wide">Haus</span>
			</h1>
			<h2 class="h2 font-semibold text-xl">IT-Berater<br />Softwareentwickler</h2>
		</div>

		<figure>
			<!-- <img
				class="object-contain max-w-sm"
				src="daniel-profile.png"
				alt="Stilisiertes Selbstportrait von Daniel Haus"
			/> -->
		</figure>
	</div>
</div>

<div class="bg-white dark:bg-daniel-950">
	<div class="container mx-auto mx-12 px-12 py-12">
		<div class="prose prose-daniel dark:prose-invert">
			<p>
				Daniel Haus ist <strong>IT-Berater</strong> und <strong>Softwareentwickler</strong>
				(Full-Stack, Cloud, Web, Mobile, nativ). Als breitgefächerter Spezialist mit Fokus auf
				<strong>benutzerfreundlicher</strong> und <strong>zuverlässiger</strong>, durchdachter
				Software hat er seit den späten 90er Jahren eine Vielzahl überdurchschnittlich erfolgreicher
				Anwendungen realisiert.
			</p>

			<p>
				Seine Kunden umfassen bekannte Namen und Marken aus den Bereichen IT, Medien und TV,
				Werbung, Banken und Finanzen, Versicherung, Pharma und Medizin, Unternehmensberatung,
				High-End Audio, Automotive, Gesundheit, Bildung sowie aus dem öffentlichen Sektor.
			</p>
		</div>
	</div>
</div>
