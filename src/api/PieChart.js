import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ cases, deaths, recovered }) => {
  const data = {
    labels: [`Cases - ${cases}`, `Deaths - ${deaths}`, `Recovered - ${recovered}`],
    datasets: [
      {
        label: "COVID Data",
        data: [cases, deaths, recovered],
        backgroundColor: ["#fcde5c", "#ff4d57", "#47d928"],
        borderColor: ["#fcde5c", "#ff4d57", "#47d928"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Pie Chart</h3>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
