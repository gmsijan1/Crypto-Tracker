import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import Header from "../components/Header";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const { symbol } = CryptoState();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(SingleCoin(id));
        console.log("Fetched coin data:", data);

        setCoin(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  // Explicit render states
  if (loading) return <div>Loading coin...</div>;
  if (error) {
    const isCORS =
      error.message.includes("CORS") || error.code === "ERR_NETWORK";
    const isRateLimit = error.response?.status === 429;

    let message =
      "Failed to load coin data. This is likely an API limitation, not a bug in the app.";
    if (isCORS)
      message +=
        " The request was blocked by CORS policy. Consider using a backend proxy.";
    if (isRateLimit)
      message +=
        " Too many requests were made to the API. Please wait and try again later.";

    return <div className="error-container">{message}</div>;
  }
  if (!coin) return <div>No coin data available</div>;

  const currentPrice = Number(
    coin.market_data?.current_price?.usd ?? 0,
  ).toFixed(2);
  const marketCap = Number(
    coin.market_data?.market_cap?.usd ?? 0,
  ).toLocaleString();

  return (
    <>
      <Header />
      <div className="coin-page-container">
        <h1>{coin.name}</h1>
        <img src={coin.image?.large} alt={coin.name} height="100" />
        <h3>Rank: {coin.market_cap_rank ?? "N/A"}</h3>
        <h3>
          Current Price: {symbol}
          {currentPrice}
        </h3>
        <h3>
          Market Cap: {symbol}
          {marketCap}
        </h3>
        <CoinInfo coinId={id} />
      </div>
    </>
  );
};

export default CoinPage;
