import Head from "next/head";

const Builders = () => {
	return (
		<div className="container mx-auto p-4">
			<Head>
				<title>
					¿Cuánto cuesta contratar albañiles? - Handyman
				</title>
				<meta
					name="description"
					content="Descubre los costos asociados con la contratación de albañiles y cómo presupuestar para proyectos de construcción y renovación."
				/>
				<link
					rel="canonical"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/albaniles`}
				/>
			</Head>

			<h1 className="text-3xl font-bold text-center mb-8">
				¿Cuánto cuesta contratar albañiles?
			</h1>

			<section className="mb-8">
				<div className="flex flex-wrap justify-center">
					<div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Básico: €15 - €25 por hora
						</p>
						<p>
							Mano de obra estándar para trabajos generales de
							albañilería.
						</p>
					</div>
					<div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Especializado: €25 - €50 por hora o más
						</p>
						<p>
							Mano de obra para trabajos especializados como
							instalación de azulejos o piedra.
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
						Tipo de Trabajo: General vs. especializado (por ejemplo,
						instalación de azulejos).
					</li>
					<li>
						Experiencia del Albañil: Nivel de habilidad y
						experiencia del profesional.
					</li>
					<li>
						Ubicación: Costos pueden variar según la región y la
						disponibilidad de mano de obra.
					</li>
					<li>
						Complejidad del Proyecto: Trabajos simples vs. proyectos
						complejos.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Precios Promedio para Contratar Albañiles
				</h2>
				<ul className="list-disc list-inside">
					<li>
						<strong>Básico</strong>: €15 - €25 por hora, mano de
						obra estándar para trabajos generales.
					</li>
					<li>
						<strong>Especializado</strong>: €25 - €50 por hora o
						más, mano de obra para trabajos especializados.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Planificación del Presupuesto
				</h2>
				<p>
					1. <strong>Definición del Proyecto</strong>: Detalla los
					trabajos específicos a realizar y el nivel de acabado
					deseado.
				</p>
				<p>
					2. <strong>Solicitud de Presupuestos</strong>: Obtén varios
					presupuestos de albañiles para comparar precios y servicios
					ofrecidos.
				</p>
				<p>
					3. <strong>Consideraciones Adicionales</strong>: Planifica
					para cualquier material y equipo necesario además de la mano
					de obra.
				</p>
				<p>
					4. <strong>Calidad y Garantía</strong>: Verifica la
					experiencia y reputación del albañil para garantizar
					resultados de calidad.
				</p>
			</section>

			<section>
				<p className="text-lg">
					Al planificar cuidadosamente y presupuestar la contratación
					de albañiles, puedes asegurar la calidad y eficiencia en tus
					proyectos de construcción y renovación.
				</p>
			</section>
		</div>
	);
};

export default Builders;
