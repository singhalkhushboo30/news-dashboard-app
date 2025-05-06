import axios from "axios";
import React from "react";

const API_KEY = "9448c05b75ed430e95add6bbed8205d7";  // Replace with your key
const BASE_URL = "https://newsapi.org/v2";

export const fetchNews = async () => {
    const cachedArticles = localStorage.getItem("cachedArticles");
    if (cachedArticles) {
        // Return cached articles if available
        console.log("Loading articles from cache...");
        return JSON.parse(cachedArticles);
      }
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: "technology",
        pageSize: 20,
        apiKey: API_KEY,
      },
    });
    localStorage.setItem("cachedArticles", JSON.stringify(response.data.articles));
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch articles. Please try again later.");
  }
};
