<section>
	<article>
		<h4>Person</h4>

		<div class="columns-2">
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
			prose
			dark:prose-invert
			mx-auto
			max-w-screen-lg
			py-2
			px-6
			text-base
			hyphens-auto
			sm:text-xl
			lg:max-w-5xl
			/**/;
	}

	h4 {
		@apply /**/
			text-3xl
			mt-5
			mb-0
			/**/;
	}

	.columns-2 {
		@apply /**/
			grid
			gap-4
			md:grid-cols-2
			/**/;
	}

	.column:not(:first-child) {
		@apply /**/
			-mt-8
			md:mt-0
			/**/;
	}
</style>
