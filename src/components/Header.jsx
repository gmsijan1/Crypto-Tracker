import { CryptoState } from "../CryptoContext.jsx";
import { useState } from "react";
import { useAuth } from "../AuthContext.jsx";

export default function Header() {
  const { currency, setCurrency } = CryptoState();
  const { user, login, signup, googleLogin, logout } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) throw new Error("Email and password required");
      if (password.length < 6)
        throw new Error("Password must be at least 6 characters");

      await login(email.trim(), password);

      // Clear state after successful login
      setShowModal(false);
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      const message =
        err.message === "Email and password required" ||
        err.message === "Password must be at least 6 characters"
          ? err.message
          : err.code === "auth/invalid-email"
            ? "Enter a valid email"
            : err.code === "auth/wrong-password"
              ? "Wrong password"
              : "Login failed";

      setError(message);
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleSignup = async () => {
    try {
      if (!email || !password) throw new Error("Email and password required");
      if (password.length < 6)
        throw new Error("Password must be at least 6 characters");

      await signup(email.trim(), password);

      // Clear state after successful signup
      setShowModal(false);
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      const message =
        err.message === "Email and password required" ||
        err.message === "Password must be at least 6 characters"
          ? err.message
          : err.code === "auth/invalid-email"
            ? "Enter a valid email"
            : err.code === "auth/email-already-in-use"
              ? "Email already registered"
              : "Signup failed";

      setError(message);
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      setShowModal(false);
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <header className="page-bg">
      {/* Top row */}
      <div className="header-top">
        <h1
          className="header-title"
          onClick={() => (window.location.href = "/")}
        >
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

        <div className="header-login-wrapper">
          {!user ? (
            <button onClick={() => setShowModal(true)} className="login-btn">
              Login
            </button>
          ) : (
            <div className="user-icon-wrapper">
              <button
                className="user-icon-btn"
                onClick={() => setShowUserPopup((prev) => !prev)}
              >
                👤
              </button>

              {showUserPopup && (
                <div className="user-popup">
                  {user.email}

                  <button
                    className="logout-btn"
                    onClick={() => {
                      logout();
                      setShowUserPopup(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Login modal */}
      {showModal && !user && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-cross"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="modal-buttons">
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleSignup}>Sign Up</button>
              <button onClick={handleGoogleLogin}>Login with Google</button>
            </div>

            {error && <p className="error-msg">{error}</p>}
          </div>
        </div>
      )}
    </header>
  );
}
