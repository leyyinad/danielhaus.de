<script>
	import Engine from '$lib/engine/Engine.svelte';
</script>

<div class="ecity h-screen w-screen absolute top-0 left-0 z-0">
	<Engine />
</div>

<div class="container min-h-screen relative z-10">
	<div class="grid grid-cols-2 gap-8 px-12 mx-auto">
		<div class="pt-6">
			<h1 class="h1 font-thin text-daniel-250">
				<span class="">Daniel</span>
				<span class=" tracking-tighter">Haus</span>
			</h1>
			<h2 class="h2 font-semibold text-xl mt-3 text-daniel-50">
				IT-Berater<br />Softwareentwickler
			</h2>
		</div>

		<figure class="-order-1">
			<img
				class="object-contain max-w-sm pr-12 hidden"
				src="daniel-profile.png"
				alt="Stilisiertes Selbstportrait von Daniel Haus"
			/>
		</figure>
	</div>
</div>

<div class="bg-white dark:bg-daniel-950">
	<div class="container mx-auto px-12 py-12">
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
