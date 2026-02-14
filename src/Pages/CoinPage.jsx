import { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api";
import Header from "../components/Header";
import { CryptoState } from "../CryptoContext";

const CoinInfo = lazy(() => import("../components/CoinInfo"));

const CoinPage = () => {
  const { id } = useParams();
  const { currency, symbol } = CryptoState();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  const getPrice = () => {
    const priceKey = currency.toLowerCase();
    const priceMap = coin?.market_data?.current_price || {};
    return Number(priceMap[priceKey] || 0).toFixed(2);
  };

  const getMarketCap = () => {
    const capKey = currency.toLowerCase();
    const capMap = coin?.market_data?.market_cap || {};
    return Number(capMap[capKey] || 0).toLocaleString();
  };

  if (loading)
    return (
      <>
        <Header />
        <div className="coin-page-container page-bg">
          <div className="coin-loading">
            <p className="loading-spinner">⏳</p>
            <p>Loading coin data...</p>
          </div>
        </div>
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <div className="coin-page-container page-bg">
          <div className="coin-error">
            <p className="error-icon">⚠️</p>
            <p className="error-title">Unable to Load Coin</p>
            <p className="error-message">
              The CoinGecko API is temporarily unavailable or rate-limited.
              Please try again in a few moments.
            </p>
          </div>
        </div>
      </>
    );

  if (!coin)
    return (
      <>
        <Header />
        <div className="coin-page-container page-bg">
          <div className="coin-empty">
            <p className="empty-icon">🪙</p>
            <p>No coin data available.</p>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="coin-page-container">
        <h1>{coin.name}</h1>
        <img src={coin.image?.large} alt={coin.name} height="100" />
        <h3>Rank: {coin.market_cap_rank ?? "N/A"}</h3>
        <h3>
          Current Price: {symbol}
          {getPrice()}
        </h3>
        <h3>
          Market Cap: {symbol}
          {getMarketCap()}
        </h3>
        <Suspense fallback={<div>Loading charts...</div>}>
          <CoinInfo coinId={id} />
        </Suspense>
      </div>
    </>
  );
};

export default CoinPage;
