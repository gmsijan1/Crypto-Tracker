import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";

export default function Banner() {
  const [coins, setCoins] = useState([]);
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    async function fetchCoins() {
      const { data } = await axios.get(TrendingCoins(currency));
      setCoins(data);
    }
    fetchCoins();
  }, [currency]);

  return (
    <div className="banner-container">
      <h3> Trending Coins</h3>
      <div className="banner-coins">
        {coins.map((coin) => {
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
        })}
      </div>
    </div>
  );
}
