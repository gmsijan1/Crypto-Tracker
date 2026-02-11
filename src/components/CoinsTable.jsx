import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const DEBOUNCE_MS = 300;

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("rank"); // ✅ added

  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedSearch(search), DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy]); // ✅ reset page on sort

  const fetchCoins = async () => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      );
      if (!data || data.length === 0) {
        setError(true);
      }
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  // ✅ search + sort (no mutation)
  const filteredAndSortedCoins = () => {
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "rank") {
        return a.market_cap_rank - b.market_cap_rank;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "price") {
        return b.current_price - a.current_price;
      }
      return 0;
    });
  };

  const displayedCoins = filteredAndSortedCoins().slice(
    (page - 1) * 10,
    page * 10,
  );

  if (loading) return <div>Loading coins...</div>;

  return (
    <div className="coins-table-container">
      <h2>Cryptocurrency Prices by Market Cap</h2>

      <input
        className="search-input"
        type="text"
        placeholder=" Search coins..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ sort control */}
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="rank">Sort by Rank</option>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan="4" style={{ color: "red", textAlign: "center" }}>
                Failed to load coins from API
              </td>
            </tr>
          ) : displayedCoins.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ color: "orange", textAlign: "center" }}>
                No coins match your search
              </td>
            </tr>
          ) : (
            displayedCoins.map((coin) => (
              <tr key={coin.id} onClick={() => navigate(`/coins/${coin.id}`)}>
                <td>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    height="40"
                    className="coin-image"
                  />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </td>

                <td>
                  {symbol}
                  {coin.current_price?.toFixed(2) ?? "0.00"}
                </td>

                <td
                  className={
                    coin.price_change_percentage_24h >= 0 ? "profit" : "loss"
                  }
                >
                  {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                  {coin.price_change_percentage_24h?.toFixed(2) ?? "0.00"}%
                </td>

                <td>
                  {symbol}
                  {Math.round(coin.market_cap / 1_000_000).toLocaleString()}M
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {!error && displayedCoins.length > 0 && (
        <div className="pagination-container">
          {Array.from(
            {
              length: Math.ceil(filteredAndSortedCoins().length / 10),
            },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo(0, 0);
                }}
                className={`pagination-btn ${i + 1 === page ? "active" : ""}`}
              >
                {i + 1}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default CoinsTable;
