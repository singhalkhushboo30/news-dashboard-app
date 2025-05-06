import { useState, useEffect } from "react";
import Analytics from "../components/layout/Analytics";
import { fetchNews } from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import React from "react";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const news = await fetchNews();
        setArticles(news);
      } catch (err) {
        console.error("Error fetching news", err);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const filterArticlesByDate = () => {
    if (!startDate || !endDate) return articles;

    return articles.filter((article) => {
      const articleDate = new Date(article.publishedAt);
      return articleDate >= new Date(startDate) && articleDate <= new Date(endDate);
    });
  };

  const filteredArticles = filterArticlesByDate();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Date Range Picker */}
      <div className="flex space-x-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Analytics Section */}
      <Analytics articles={filteredArticles} />

      {/* Additional content like overview cards, etc. */}
    </DashboardLayout>
  );
};

export default Dashboard;

