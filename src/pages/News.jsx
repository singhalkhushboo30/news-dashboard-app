import { useEffect, useState } from "react";
import { fetchNews } from "../services/api";
import DashboardLayout from "../components/layout/DashboardLayout";
import React from "react";

const News = () => {
  const [originalArticles, setOriginalArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const news = await fetchNews();
        setOriginalArticles(news);
        setArticles(news);
      } catch (err) {
        setError("Failed to fetch articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const handleFilter = () => {
    let filtered = originalArticles;

    if (searchKeyword) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchKeyword.toLowerCase()))
      );
    }

    if (filterAuthor) {
      filtered = filtered.filter((article) =>
        article.author && article.author.toLowerCase().includes(filterAuthor.toLowerCase())
      );
    }

    if (filterDate) {
      filtered = filtered.filter((article) =>
        new Date(article.publishedAt).toLocaleDateString() === filterDate
      );
    }

    if (filterType) {
      filtered = filtered.filter((article) =>
        filterType === "news" ? true : false
      );
      // right now we only fetch news; for real "blogs" you'd modify type
    }

    setArticles(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [searchKeyword, filterAuthor, filterDate, filterType]);

  if (loading) return <div className="text-center mt-10">Loading articles...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error.message}</div>;
  
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">News & Blogs</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search by keyword" 
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="p-2 border rounded"
        />
        <input 
          type="text" 
          placeholder="Filter by author" 
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
          className="p-2 border rounded"
        />
        <input 
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-2 border rounded"
        />
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="news">News</option>
          {/* <option value="blog">Blog</option> Future blogs support */}
        </select>
      </div>

      {/* Articles List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {article.author || "Unknown Author"} | {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{article.description?.slice(0, 100)}...</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No articles found.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default News;
