import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import useDebounce from "../hooks/useDebounce";
import useFetchCoins from "../hooks/useFetchCoins";

const CoinsTable = () => {
  const { coins, loading, error } = useFetchCoins();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("rank");

  const debouncedSearch = useDebounce(search, 300);
  const { symbol } = CryptoState();
  const navigate = useNavigate();

  const filteredAndSortedCoins = () => {
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "rank") return a.market_cap_rank - b.market_cap_rank;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return b.current_price - a.current_price;
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

      <div className="table-controls">
        <input
          className="search-input"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="rank">Sort by Rank</option>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

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
          {Array.from({
            length: Math.ceil(filteredAndSortedCoins().length / 10),
          }).map((_, i) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinsTable;
