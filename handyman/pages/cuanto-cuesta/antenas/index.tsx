import Head from "next/head";

const AntenasPage = () => {
	return (
		<div className="container mx-auto p-4">
			<Head>
				<title>¿Cuánto cuesta instalar antenas? - Handyman</title>
				<meta
					name="description"
					content="Descubre los costos asociados con la instalación de antenas y cómo planificar este servicio para tu hogar o negocio."
				/>
				<link
					rel="canonical"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/antenas`}
				/>
			</Head>

			<h1 className="text-3xl font-bold text-center mb-8">
				¿Cuánto cuesta instalar antenas?
			</h1>

			<section className="mb-8">
				<div className="flex flex-wrap justify-center">
					<div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Instalación básica: €100 - €300
						</p>
						<p>Incluye antena estándar y mano de obra básica.</p>
					</div>
					<div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Instalación avanzada: €300 - €600
						</p>
						<p>
							Incluye antena premium y configuración más compleja.
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
						Tipo de antena: Estándar vs. premium con diferentes
						capacidades de recepción.
					</li>
					<li>
						Ubicación y acceso: Dificultad para acceder al techo o
						ubicación de instalación.
					</li>
					<li>
						Necesidades específicas: Instalaciones personalizadas
						como antenas parabólicas o repetidores.
					</li>
					<li>
						Normativas locales: Cumplimiento de regulaciones y
						permisos necesarios para la instalación.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Precios Promedio para Instalar Antenas
				</h2>
				<ul className="list-disc list-inside">
					<li>
						<strong>Instalación básica</strong>: €100 - €300,
						incluyendo antena estándar y mano de obra básica.
					</li>
					<li>
						<strong>Instalación avanzada</strong>: €300 - €600,
						incluyendo antena premium y configuración más compleja.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Planificación para la Instalación de Antenas
				</h2>
				<p>
					1. <strong>Evaluación de Necesidades</strong>: Determinar el
					tipo de antena adecuado según las necesidades de recepción.
				</p>
				<p>
					2. <strong>Obtención de Presupuestos</strong>: Solicitar
					cotizaciones detalladas a varios instaladores de antenas.
				</p>
				<p>
					3. <strong>Consideración de Normativas</strong>: Asegurarse
					de cumplir con las regulaciones locales y obtener los
					permisos necesarios.
				</p>
				<p>
					4. <strong>Selección de Instalador</strong>: Elegir un
					profesional con experiencia en la instalación de antenas
					para garantizar un servicio de calidad.
				</p>
			</section>

			<section>
				<p className="text-lg">
					Con una adecuada planificación y selección de servicios,
					puedes mejorar la calidad de recepción de señales en tu
					hogar o negocio.
				</p>
			</section>
		</div>
	);
};

export default AntenasPage;
