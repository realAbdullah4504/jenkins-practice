"use client";

import { Context } from "@/components/Common/DashboardLayout";
import { useContext } from "react";
// import EChartsCommon from "./components/chart";
import EChartsPieChart from "./components/pieChart";

export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const chartOption = {
    xAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E", "A", "B", "C", "D", "E"],
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [
          1250000000, 1250000000, 1250000000, 1250000000, 1250000000, 250000000,
          1250000000, 1250000000, 1250000000, 1250000000,
        ],
        type: "bar",
      },
    ],
  };
  const pieChartOption = {
    title: {
      text: "Referencias de un Sitio Web",
      subtext: "Datos Falsos",
      left: "center",
      show: false,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      right: "right",
      top: "center",
    },
    grid: {
      // Agregar configuración de cuadrícula para ajustar la posición del gráfico
      left: "0%", // Puedes ajustar este valor para controlar la posición del gráfico a la izquierda
      top: "10%",
      bottom: "10%",
    },
    series: [
      {
        name: "Acceso Desde",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Motor de Búsqueda" },
          { value: 735, name: "Directo" },
          { value: 580, name: "Correo Electrónico" },
          { value: 484, name: "Anuncios de Unión" },
          { value: 300, name: "Anuncios de Video" },
        ],
        label: {
          show: false,
        },
      },
    ],
  };

  return (
    <div
      className={`lg:w-[80%]  ${toggleSideBar ? "mx-auto" : "md:mx-32"}  my-12`}
    >
      <section className="  my-8">
        <h1 className="font-bold text-4xl text-Heading">
          Perspectivas de Datos:
          <span className="text-orange font-bold">
            Explora estadísticas y análisis{" "}
          </span>
        </h1>
      </section>
      <div className=" rounded-md  h-[18rem]  flex flex-col gap-5 ">
        <div className="font-bold mx-4">Gráfico de Crecimiento</div>
        {/* <EChartsCommon option={chartOption} /> */}
        <div className="font-bold mx-4">Gráfico de Pastel</div>

        <EChartsPieChart option={pieChartOption} />
      </div>
    </div>
  );
}
