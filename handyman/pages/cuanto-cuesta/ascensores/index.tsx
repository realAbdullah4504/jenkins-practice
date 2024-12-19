import Head from "next/head";

const ElevatorInstallation = () => {
	return (
		<div className="container mx-auto p-4">
			<Head>
				<title>
					¿Cuánto cuesta la instalación de un ascensor? -
					NombreDeTuSitio
				</title>
				<meta
					name="description"
					content="Descubre los costos asociados con la instalación de ascensores y cómo planificar esta obra en tu edificio."
				/>
				<link
					rel="canonical"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/ascensores`}
				/>
			</Head>

			<h1 className="text-3xl font-bold text-center mb-8">
				¿Cuánto cuesta la instalación de un ascensor?
			</h1>

			<section className="mb-8">
				<div className="flex flex-wrap justify-center">
					<div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Instalación Básica: €20,000 - €40,000
						</p>
						<p>
							Ascensores estándar para edificios de tamaño
							mediano.
						</p>
					</div>
					<div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Instalación de Alta Gama: €40,000 - €100,000+
						</p>
						<p>
							Ascensores personalizados con acabados premium y
							tecnología avanzada.
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
						Tamaño y Capacidad del Ascensor: Número de paradas y
						capacidad de carga.
					</li>
					<li>
						Características Específicas: Acabados de lujo,
						tecnología de control, accesibilidad.
					</li>
					<li>
						Estructura del Edificio: Requiere modificaciones
						estructurales, espacio disponible.
					</li>
					<li>
						Normativas Locales: Cumplimiento de normativas de
						seguridad y accesibilidad.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Precios Promedio para Instalación de Ascensores
				</h2>
				<ul className="list-disc list-inside">
					<li>
						<strong>Instalación Básica</strong>: €20,000 - €40,000,
						ascensores estándar para edificios medianos.
					</li>
					<li>
						<strong>Instalación de Alta Gama</strong>: €40,000 -
						€100,000+, ascensores personalizados con acabados
						premium y tecnología avanzada.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Planificación de la Instalación del Ascensor
				</h2>
				<p>
					1. <strong>Evaluación del Edificio</strong>: Determina la
					viabilidad y necesidades específicas de instalación.
				</p>
				<p>
					2. <strong>Presupuesto y Financiamiento</strong>: Calcula
					los costos totales y busca opciones de financiamiento si es
					necesario.
				</p>
				<p>
					3. <strong>Selección del Proveedor</strong>: Investiga y
					compara varios proveedores de ascensores basándote en
					calidad y precio.
				</p>
				<p>
					4. <strong>Programación de la Instalación</strong>: Coordina
					la instalación con un cronograma que minimice las molestias
					para los residentes.
				</p>
			</section>

			<section>
				<p className="text-lg">
					Al planificar la instalación de un ascensor, considera todos
					los factores involucrados para garantizar la seguridad y
					satisfacción a largo plazo.
				</p>
			</section>
		</div>
	);
};

export default ElevatorInstallation;
