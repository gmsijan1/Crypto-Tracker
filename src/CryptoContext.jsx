import { createContext, useContext, useState } from "react";

const Crypto = createContext();

const currencySymbols = {
  usd: "$",
  eur: "€",
  gbp: "£",
  inr: "₹",
  jpy: "¥",
  aud: "A$",
};

const CryptoWrapper = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const symbol = currencySymbols[currency.toLowerCase()] || "$";

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoWrapper;

export const CryptoState = () => useContext(Crypto);
