import { useState, useEffect } from "react";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/header";
import { Routes, Route } from "react-router";
import NotFoundPage from "./pages/notFound";
import CoinDetails from "./pages/coinDetails";
const API_URL = import.meta.env.VITE_API_URL;


const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {

    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if (!res.ok) throw new Error('failed to fetch data');
        const data = await res.json();
        console.log(data);
        setCoins(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, [limit]);


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage
          coins={coins}
          filter={filter}
          setFilter={setFilter}
          limit={limit}
          setLimit={setLimit}
          sortBy={sortBy}
          setSortBy={setSortBy}
          loading={loading}
          error={error} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );


};

export default App;
