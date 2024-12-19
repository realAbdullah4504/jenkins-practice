import Head from "next/head";

const AlquilerAndamiosPage = () => {
	return (
		<div className="container mx-auto p-4">
			<Head>
				<title>¿Cuánto cuesta alquilar andamios? - Handyman</title>
				<meta
					name="description"
					content="Descubre los costos asociados con el alquiler de andamios y cómo planificar tu presupuesto para proyectos de construcción o renovación."
				/>
				<link
					rel="canonical"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/cuanto-cuesta/alquiler-andamios`}

				/>
			</Head>

			<h1 className="text-3xl font-bold text-center mb-8">
				¿Cuánto cuesta alquilar andamios?
			</h1>

			<section className="mb-8">
				<div className="flex flex-wrap justify-center">
					<div className="bg-green-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Andamio Estándar: €50 - €100 por semana
						</p>
						<p>
							Incluye andamios básicos para proyectos de tamaño
							medio.
						</p>
					</div>
					<div className="bg-blue-500 text-white p-4 rounded-md shadow-md mx-4 mb-4 md:w-1/3 text-center">
						<p className="text-xl font-bold mb-2">
							Andamio Avanzado: €100 - €200 por semana
						</p>
						<p>
							Andamios con características adicionales como mayor
							altura o capacidad de carga.
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
						Tamaño y tipo de andamio: Básico vs. avanzado con
						características especiales.
					</li>
					<li>
						Duración del alquiler: Costos por día, semana o mes.
					</li>
					<li>
						Accesorios y extras: Costos adicionales por plataformas
						adicionales o protecciones.
					</li>
					<li>
						Ubicación: Precios pueden variar según la ubicación
						geográfica y acceso al sitio.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Precios Promedio para Alquiler de Andamios
				</h2>
				<ul className="list-disc list-inside">
					<li>
						<strong>Andamio Estándar</strong>: €50 - €100 por
						semana, incluye andamios básicos para proyectos de
						tamaño medio.
					</li>
					<li>
						<strong>Andamio Avanzado</strong>: €100 - €200 por
						semana, incluye andamios con características especiales
						como mayor altura o capacidad de carga.
					</li>
				</ul>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">
					Planificación del Presupuesto
				</h2>
				<p>
					1. <strong>Evaluación de Necesidades</strong>: Determina el
					tipo y tamaño de andamio necesario para tu proyecto.
				</p>
				<p>
					2. <strong>Duración del Alquiler</strong>: Calcula los
					costos basados en la duración estimada del proyecto.
				</p>
				<p>
					3. <strong>Comparación de Proveedores</strong>: Obtén
					cotizaciones de múltiples proveedores para obtener la mejor
					oferta.
				</p>
				<p>
					4. <strong>Consideración de Seguridad</strong>: Asegúrate de
					cumplir con las normativas de seguridad al usar andamios.
				</p>
			</section>

			<section>
				<p className="text-lg">
					Con una adecuada planificación y entendimiento de los
					costos, puedes alquilar andamios para tu proyecto de
					construcción o renovación dentro de tu presupuesto
					establecido.
				</p>
			</section>
		</div>
	);
};

export default AlquilerAndamiosPage;
