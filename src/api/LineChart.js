
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// Function to generate the date range
const generateDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  let end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(currentDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
  }

  return dates;
};

const LineChart = ({ cases, deaths, recovered, startdate, endate }) => {
  // Generate the date range between startdate and endate
  const labels = generateDateRange(startdate, endate);

  // Ensure cases, deaths, and recovered are arrays corresponding to the dates
  const data = {
    labels: labels, // Dates array as X-axis labels
    datasets: [
      {
        label: "Cases",
        data: cases, // Array of cases data for each date
        borderColor: "#9ca8ff",
        fill: false,
      },
      {
        label: "Deaths",
        data: deaths, // Array of deaths data for each date
        borderColor: "#ff4d57",
        fill: false,
      },
      {
        label: "Recovered",
        data: recovered, // Array of recovered data for each date
        borderColor: "#47d928",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h3>Line Chart</h3>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
