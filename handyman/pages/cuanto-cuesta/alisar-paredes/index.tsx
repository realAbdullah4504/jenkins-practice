import Head from "next/head";

const AlisarParedesPage = () => {
	return (
		<div className="container mx-auto p-4">
			<Head>
				<title>¿Cuánto cuesta alisar paredes? - Handyman</title>
				<meta
					name="description"
					content="Descubre los costos asociados con alisar paredes y cómo planificar este servicio para renovar tu espacio."
				/>
				<link
					rel="canonical"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/alisar-paredes`}
				/>
			</Head>

			<h1 className="text-3xl font-bold text-center mb-8">
				¿Cuánto cuesta alisar paredes?
			</h1>

			<section className="mb-8">
				<div className="flex flex-wrap justify-center">
					<div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Alisado básico: €10 - €20 por m²
						</p>
						<p>
							Incluye preparación básica de la pared y aplicación
							de capas de alisado.
						</p>
					</div>
					<div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Alisado profesional: €20 - €40 por m²
						</p>
						<p>
							Incluye técnicas avanzadas de alisado y acabados de
							alta calidad.
						</p>
					</div>
				</div>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Factores que Afectan los Costos
				</h2>
				<ul className="list-disc list-inside">
					<li>
						Estado actual de las paredes: Nivel de irregularidades o
						daños a reparar.
					</li>
					<li>
						Tamaño del área a alisar: Área total de las paredes a
						tratar.
					</li>
					<li>
						Calidad del acabado deseado: Desde básico hasta acabados
						de alta gama.
					</li>
					<li>Costos de mano de obra y tarifas locales.</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Precios Promedio para Alisar Paredes
				</h2>
				<ul className="list-disc list-inside">
					<li>
						<strong>Alisado básico</strong>: €10 - €20 por m²,
						incluyendo preparación básica y aplicación de alisado.
					</li>
					<li>
						<strong>Alisado profesional</strong>: €20 - €40 por m²,
						incluyendo técnicas avanzadas y acabados de alta
						calidad.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Planificación para Alisar Paredes
				</h2>
				<p>
					1. <strong>Evaluación de Paredes</strong>: Determinar el
					estado actual y necesidades de reparación.
				</p>
				<p>
					2. <strong>Solicitar Presupuestos</strong>: Obtener varias
					cotizaciones detalladas de profesionales locales.
				</p>
				<p>
					3. <strong>Considerar Opciones</strong>: Comparar técnicas
					de alisado y calidad de materiales.
				</p>
				<p>
					4. <strong>Seleccionar Profesionales</strong>: Elegir
					expertos con experiencia en alisado de paredes y buenas
					referencias.
				</p>
			</section>

			<section>
				<p className="text-lg">
					Con una planificación adecuada, alisar paredes puede
					transformar tus espacios interiores con acabados suaves y
					modernos.
				</p>
			</section>
		</div>
	);
};

export default AlisarParedesPage;
