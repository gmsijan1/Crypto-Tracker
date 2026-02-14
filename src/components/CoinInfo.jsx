import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
);

export default function CoinInfo({ coinId }) {
  const [prices, setPrices] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { currency } = CryptoState();

  useEffect(() => {
    let isMounted = true;

    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(false);

        const { data } = await axios.get(
          HistoricalChart(coinId, days, currency),
        );
        if (isMounted) {
          setPrices(data.prices);
        }
      } catch (err) {
        console.error("Error fetching chart data:", err.message);
        if (isMounted) {
          setError(true);
          setPrices([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchChartData();

    return () => {
      isMounted = false;
    };
  }, [coinId, currency, days]);

  const chartData = {
    labels: prices.map((p) => new Date(p[0]).toLocaleDateString()),
    datasets: [
      {
        label: `${coinId} price`,
        data: prices.map((p) => p[1]),
        borderColor: "gold",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="coin-info-container">
      {loading ? (
        <div className="chart-loading">
          <p className="loading-spinner">⏳</p>
          <p>Fetching chart data...</p>
        </div>
      ) : error ? (
        <div className="chart-error">
          <p className="error-icon">⚠️</p>
          <p className="error-title">Unable to Load Chart</p>
          <p className="error-message">
            The CoinGecko API is temporarily unavailable or rate-limited. Please
            try again in a few moments.
          </p>
        </div>
      ) : prices.length === 0 ? (
        <div className="chart-empty">
          <p className="empty-icon">📊</p>
          <p>No chart data available for this coin.</p>
        </div>
      ) : (
        <Line data={chartData} />
      )}

      <div className="chart-buttons">
        {[1, 30, 90, 365].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`chart-btn ${days === d ? "active" : ""}`}
            disabled={loading || error}
          >
            {d === 1 ? "24H" : d === 30 ? "30D" : d === 90 ? "3M" : "1Y"}
          </button>
        ))}
      </div>
    </div>
  );
}
