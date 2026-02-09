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
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(false);

        const { data } = await axios.get(
          HistoricalChart(coinId, days, currency),
        );
        setPrices(data.prices);
      } catch (err) {
        setError(true);
        setPrices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
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
        <p>Loading chart...</p>
      ) : error ? (
        <p className="error-text">
          Failed to load chart data. Data is fetched from a public API.
        </p>
      ) : prices.length === 0 ? (
        <p>No chart data available.</p>
      ) : (
        <Line data={chartData} />
      )}

      <div className="chart-buttons">
        {[1, 30, 90, 365].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`chart-btn ${days === d ? "active" : ""}`}
          >
            {d === 1 ? "24H" : d === 30 ? "30D" : d === 90 ? "3M" : "1Y"}
          </button>
        ))}
      </div>
    </div>
  );
}
