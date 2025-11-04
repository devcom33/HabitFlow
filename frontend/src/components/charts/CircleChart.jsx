import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  elements,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getCategoryStats } from "../../services/dashboardService";

const CircleChart = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [error, setError] = useState(null);
  ChartJS.register(ArcElement);
  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const result = await getCategoryStats();
        setCategoryStats(result);
      } catch (e) {
        setError(e);
      }
    };
    fetchCategoryStats();
  }, []);
  //console.log(categoryStats);
  const labels_ = categoryStats.map((element) => element[1]);
  const data_ = categoryStats.map((element) => element[0]);
  const colors = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 159, 64)",
    "rgb(201, 203, 207)",
    "rgb(100, 181, 246)",
    "rgb(129, 199, 132)",
    "rgb(244, 143, 177)",
  ];

  const pickColors = colors.slice(0, data_.length);

  const data = {
    labels: labels_,
    datasets: [
      {
        label: "My First Dataset",
        data: data_,
        backgroundColor: pickColors,
        hoverOffset: data_.length,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default CircleChart;
