import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";

export default function Banner() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    let isMounted = true;

    async function fetchCoins() {
      try {
        setLoading(true);
        setError(false);
        const { data } = await axios.get(TrendingCoins(currency));
        if (isMounted) {
          setCoins(data);
        }
      } catch (err) {
        console.error("Error fetching trending coins:", err.message);
        if (isMounted) {
          setError(true);
          setCoins([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCoins();

    return () => {
      isMounted = false;
    };
  }, [currency]);

  return (
    <div className="banner-container">
      <h3>Trending Coins</h3>
      <div className="banner-coins">
        {loading ? (
          <div className="banner-empty">
            <p className="loading-spinner">⏳</p>
            <p>Loading trending coins...</p>
          </div>
        ) : error ? (
          <div className="banner-empty error">
            <p className="error-icon">⚠️</p>
            <p>Unable to load trending coins</p>
          </div>
        ) : coins.length === 0 ? (
          <div className="banner-empty">
            <p>No trending data available</p>
          </div>
        ) : (
          coins.map((coin) => {
            const priceChange = Number(coin.price_change_percentage_24h ?? 0);
            const profit = priceChange >= 0;
            const price = Number(coin.current_price ?? 0);

            return (
              <Link
                key={coin.id}
                to={`/coins/${coin.id}`}
                className="banner-coin-link"
              >
                <img src={coin.image} alt={coin.name} height="90" />
                <span>{coin.symbol}</span>
                <span className={`price-change ${profit ? "profit" : "loss"}`}>
                  {profit && "+"}
                  {priceChange.toFixed(2)}%
                </span>
                <span>
                  {symbol}
                  {price.toFixed(2)}
                </span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
