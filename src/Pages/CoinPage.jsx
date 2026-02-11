import { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../config/api";
import Header from "../components/Header";
import { CryptoState } from "../CryptoContext";

const CoinInfo = lazy(() => import("../components/CoinInfo"));

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
        setCoin(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  if (loading) return <div>Loading coin...</div>;
  if (error) return <div>Error loading coin</div>;
  if (!coin) return <div>No coin data available</div>;

  return (
    <>
      <Header />
      <div className="coin-page-container">
        <h1>{coin.name}</h1>
        <img src={coin.image?.large} alt={coin.name} height="100" />
        <h3>Rank: {coin.market_cap_rank ?? "N/A"}</h3>
        <h3>
          Current Price: {symbol}
          {Number(coin.market_data?.current_price?.usd ?? 0).toFixed(2)}
        </h3>
        <h3>
          Market Cap: {symbol}
          {Number(coin.market_data?.market_cap?.usd ?? 0).toLocaleString()}
        </h3>
        <Suspense fallback={<div>Loading charts...</div>}>
          <CoinInfo coinId={id} />
        </Suspense>
      </div>
    </>
  );
};

export default CoinPage;
