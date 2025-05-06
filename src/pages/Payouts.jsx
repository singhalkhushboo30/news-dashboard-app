import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { unparse } from "papaparse";
import { gapi } from "gapi-script";
import React from "react";



const Payouts = () => {
  const [payoutRate, setPayoutRate] = useState(localStorage.getItem("payoutRate") || 1); // Default rate is 1
  const [articles, setArticles] = useState([]);
  const [totalPayout, setTotalPayout] = useState(0);

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
    setArticles(storedArticles);
  }, []);

  useEffect(() => {
    const calculateTotalPayout = () => {
      const total = articles.length * payoutRate;
      setTotalPayout(total);
    };

    calculateTotalPayout();
  }, [articles, payoutRate]);

  const handlePayoutRateChange = (e) => {
    const rate = e.target.value;
    setPayoutRate(rate);
    localStorage.setItem("payoutRate", rate);
  };

  // --- inside Payouts component ---

// 1) Export as CSV
const handleExportCSV = () => {
    const rows = articles.map(a => ({
      Title: a.title,
      Author: a.author || "Unknown",
      Date: new Date(a.publishedAt).toLocaleDateString(),
      Payout: payoutRate
    }));
    const csv = unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "payout_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // 2) Export as PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Title", "Author", "Date", "Payout"];
    const tableRows = articles.map(a => [
      a.title,
      a.author || "Unknown",
      new Date(a.publishedAt).toLocaleDateString(),
      payoutRate
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.text("Payout Report", 14, 15);
    doc.save("payout_report.pdf");
  };
  
  // 3) Export to Google Sheets
  const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";       // ← Replace
  const API_KEY   = "YOUR_GOOGLE_API_KEY";         // ← Replace
  const SCOPES    = "https://www.googleapis.com/auth/spreadsheets";
  
  const handleExportGoogleSheet = () => {
    function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
          const ssConfig = { properties: { title: "Payout Report" } };
          gapi.client.sheets.spreadsheets.create({}, ssConfig)
            .then(res => {
              const spreadsheetId = res.result.spreadsheetId;
              const values = [
                ["Title", "Author", "Date", "Payout"],
                ...articles.map(a => [
                  a.title,
                  a.author || "Unknown",
                  new Date(a.publishedAt).toLocaleDateString(),
                  payoutRate
                ])
              ];
              return gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId,
                range: "Sheet1!A1:D" + (articles.length + 1),
                valueInputOption: "RAW",
                resource: { values }
              });
            })
            .then(() => {
              window.open(
                `https://docs.google.com/spreadsheets/d/${gapi.client.sheets.spreadsheets.create.result.spreadsheetId}`, 
                "_blank"
              );
            })
            .catch(err => console.error("Sheets API error", err));
        });
      });
    }
    gapi.load("client:auth2", initClient);
  };
  

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Payout Calculator</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <label className="text-lg font-semibold">Payout Rate per Article/Blog:</label>
          <input
            type="number"
            min="1"
            value={payoutRate}
            onChange={handlePayoutRateChange}
            className="p-2 border rounded"
          />
        </div>

        <div className="text-lg font-semibold mb-4">
          Total Articles: {articles.length}
        </div>

        <div className="text-xl font-bold text-green-600 mb-6">
          Total Payout: ${totalPayout}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Articles List</h2>

        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Payout</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{article.title}</td>
                <td className="py-2 px-4 border-b">{article.author || "Unknown"}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">${payoutRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex space-x-4 mb-6">
  <button 
    onClick={handleExportCSV}
    className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
  >
    Export CSV
  </button>

  <button 
    onClick={handleExportPDF}
    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
  >
    Export PDF
  </button>

  <button 
    onClick={handleExportGoogleSheet}
    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
  >
    Export to Google Sheets
  </button>
</div>

      </div>
    </DashboardLayout>
  );
};

export default Payouts;
