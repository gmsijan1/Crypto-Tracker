import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { currency, setCurrency } = CryptoState();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <header>
      <div className="header-top">
        <h1 className="header-title" onClick={() => navigate("/")}>
          Crypto Tracker
        </h1>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="currency-select"
        >
          <option value="USD">USD</option>
          <option value="NPR">NPR</option>
        </select>

        <button onClick={() => setShowModal(true)} className="login-btn">
          Login
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Authentication Not Available Yet</h3>
            <button
              onClick={() => setShowModal(false)}
              className="modal-close-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
