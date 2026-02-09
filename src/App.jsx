import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
