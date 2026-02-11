import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchCoins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
        );
        if (!data || data.length === 0) setError(true);
        setCoins(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return { coins, loading, error };
}
