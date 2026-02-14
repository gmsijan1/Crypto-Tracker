import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchCoins(currency = "usd") {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCoins = async (retryCount = 0) => {
      const maxRetries = 3;
      const baseDelay = 1000; // 1 second

      try {
        setLoading(true);
        setError(false);
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        );
        if (isMounted) {
          if (!data || data.length === 0) setError(true);
          setCoins(data);
        }
      } catch (err) {
        console.error("Error fetching coins:", err.message);

        // Retry logic with exponential backoff
        if (retryCount < maxRetries && isMounted) {
          const delay = baseDelay * Math.pow(2, retryCount);
          console.log(
            `Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${maxRetries})`,
          );
          setTimeout(() => {
            if (isMounted) {
              fetchCoins(retryCount + 1);
            }
          }, delay);
        } else {
          // All retries exhausted
          if (isMounted) {
            setError(true);
            setLoading(false);
          }
        }
        return;
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    fetchCoins();

    return () => {
      isMounted = false;
    };
  }, [currency]);

  return { coins, loading, error };
}
