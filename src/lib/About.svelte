<section>
	<article>
		<div class="column">
			<p>
				Ich bin <strong>IT-Berater</strong> und <strong>Softwareentwickler</strong> (Full-Stack,
				Cloud, Web, Mobile, nativ) aus dem Rhein-Main-Gebiet. Als breitgefächerter Spezialist mit
				Fokus auf <strong>benutzerfreundlicher</strong> und <strong>zuverlässiger</strong>,
				durchdachter Software habe ich seit den späten 90er Jahren eine Vielzahl
				überdurchschnittlich erfolgreicher Anwendungen realisiert.
			</p>
		</div>

		<div class="column">
			<p>
				Meine Kunden umfassen bekannte Namen und Marken aus den Bereichen IT, Medien und TV,
				Werbung, Banken und Finanzen, Versicherung, Pharma und Medizin, Unternehmensberatung,
				High-End Audio, Automotive, Gesundheit, Bildung sowie aus dem öffentlichen Sektor.
			</p>
		</div>
	</article>
</section>

<style lang="postcss">
	section {
		@apply /**/
			bg-white
 			dark:bg-black
			/**/;
	}

	article {
		@apply /**/
			container
			mx-auto
			max-w-screen-lg
			py-2
			text-base
			hyphens-auto
			grid
			gap-4
			sm:text-xl
			md:grid-cols-2
			lg:max-w-5xl
			/**/;
	}

	.column {
		@apply /**/
			prose
			dark:prose-invert
			px-6
			/**/;
	}

	.column:not(:first-child) {
		@apply /**/
			-mt-8
			md:mt-0
			/**/;
	}
</style>
