# News Dashboard App

A fully functional **React** application that integrates with the **News API** to fetch articles, display them, and visualize data through charts. It includes features like **login**, **payout calculator**, **analytics charts**, **dark mode**, **offline caching**, and more.

## Features

- **User Authentication**
  - Separate Login and Register pages.
  - Store user credentials and session state in `localStorage`.
  
- **News and Blog Integration**
  - Fetch articles using [NewsAPI](https://newsapi.org/).
  - Filter articles by keyword, author, and date range.
  - Display articles in a responsive, card-based UI.

- **Payout Calculator**
  - Admin can set a payout rate per article or blog.
  - Dynamically calculate total payouts based on fetched articles.
  - Store payout settings in `localStorage`.

- **Export Functionality**
  - Export payout reports as **CSV** (using PapaParse).
  - Export payout reports as **PDF** (using jsPDF + jspdf-autotable).
  - Export data directly to **Google Sheets** (using Google Sheets API).

- **Analytics**
  - Pie chart for distribution of article types.
  - Bar chart for top authors by article count.
  - Line chart for articles published over time.
  - Filter charts by custom date range.

- **Dark Mode**
  - Toggle between light and dark themes.
  - Persist theme preference in `localStorage`.

- **Offline Support**
  - Cache articles in `localStorage` for offline viewing.
  - Display an offline banner when the user is offline.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/news-dashboard-app.git
   cd news-dashboard-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your News API key:
   ```
   VITE_NEWS_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

