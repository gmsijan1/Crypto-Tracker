import { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoWrapper = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    setSymbol(currency === "USD" ? "$" : "₹");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoWrapper;

export const CryptoState = () => useContext(Crypto);
