<script>
	import Hero from '$lib/Hero.svelte';
</script>

<Hero />

<div class="bg-white dark:bg-black">
	<article>
		<p>
			Ich bin <strong>IT-Berater</strong> und <strong>Softwareentwickler</strong>
			(Full-Stack, Cloud, Web, Mobile, nativ). Als breitgefächerter Spezialist mit Fokus auf
			<strong>benutzerfreundlicher</strong> und <strong>zuverlässiger</strong>, durchdachter
			Software habe ich seit den späten 90er Jahren eine Vielzahl überdurchschnittlich erfolgreicher
			Anwendungen realisiert.
		</p>

		<p>
			Meine Kunden umfassen bekannte Namen und Marken aus den Bereichen IT, Medien und TV, Werbung,
			Banken und Finanzen, Versicherung, Pharma und Medizin, Unternehmensberatung, High-End Audio,
			Automotive, Gesundheit, Bildung sowie aus dem öffentlichen Sektor.
		</p>
	</article>
</div>

<style lang="postcss">
	article {
		@apply /**/
			container
		 	mx-auto
			px-4
			py-2
			prose
			dark:prose-invert
		  md:py-12
			/**/;
	}
</style>
