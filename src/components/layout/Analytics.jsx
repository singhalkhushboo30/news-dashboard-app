import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Analytics = ({ articles = [] }) => {
  // Guard against undefined articles
  const safeArticles = Array.isArray(articles) ? articles : [];

  // Pie Chart Data (Article Types)
  const articleTypes = safeArticles.reduce((acc, article) => {
    const type = article.source?.name || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(articleTypes),
    datasets: [
      {
        data: Object.values(articleTypes),
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFBD33"],
        hoverOffset: 4,
      },
    ],
  };

  // Bar Chart Data (Top Authors by Article Count)
  const authors = safeArticles.reduce((acc, article) => {
    const author = article.author || "Unknown";
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(authors),
    datasets: [
      {
        label: "Articles by Author",
        data: Object.values(authors),
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data (Articles Over Time)
  const articlesOverTime = safeArticles.reduce((acc, article) => {
    const date = new Date(article.publishedAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const lineData = {
    labels: Object.keys(articlesOverTime),
    datasets: [
      {
        label: "Articles Over Time",
        data: Object.values(articlesOverTime),
        fill: false,
        borderColor: "#2196F3",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Article Analytics</h2>

      {/* Pie Chart: Article Types */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Article Type Distribution</h3>
        {safeArticles.length > 0 ? <Pie data={pieData} /> : <p className="text-gray-500 text-center">No data available</p>}
      </div>

      {/* Bar Chart: Articles by Author */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Top Authors by Article Count</h3>
        {safeArticles.length > 0 ? <Bar data={barData} /> : <p className="text-gray-500 text-center">No data available</p>}
      </div>

      {/* Line Chart: Articles Over Time */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Articles Over Time</h3>
        {safeArticles.length > 0 ? <Line data={lineData} /> : <p className="text-gray-500 text-center">No data available</p>}
      </div>
    </div>
  );
};

export default Analytics;
