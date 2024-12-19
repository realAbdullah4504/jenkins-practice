"use client";

import PropTypes from "prop-types";
// import ReactECharts from "echarts-for-react";

const EChartsPieChart = ({ option }: any) => {
  const chartContainerStyle = {
    width: "100%",
    height: "400px",
    border: "1px solid #fff",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "start", // Agregar espacio entre el gráfico y la leyenda
  };

  return (
    <div style={chartContainerStyle}>
      {/* <ReactECharts option={option} style={{ flex: 1 }} /> */}
    </div>
  );
};

EChartsPieChart.propTypes = {
  option: PropTypes.shape({
    legendData: PropTypes.arrayOf(PropTypes.string), // Ejemplo de especificar legendData como un arreglo de cadenas
    series: PropTypes.arrayOf(PropTypes.object), // Ejemplo de especificar series como un arreglo de objetos
  }).isRequired,
};

export default EChartsPieChart;
