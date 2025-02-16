import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import $ from 'jquery';

Chart.register(...registerables);

const Population = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    $.ajax({
      url: `http://127.0.0.1:5000/api/populations`,
      method: "GET",
      dataType: "json",
      success: (response) => {
        setChartData({
          labels: response.map(d => d.province),
          datasets: [{
            label: "Indonesian Population",
            data: response.map(d => d.population),
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            fill: true,
          }]
        });
      }
    })
  }, [])

  return (
    <div style={{ width: "60%", margin: "auto", textAlign: "center" }}>
      <h2>Indonesian Population Per Province</h2>
      {chartData.labels ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
}

export default Population;