import { useEffect, useState } from "react";
import axios from "axios";
import  Table from './components/Table'
import Navbar from "./components/Navbar";

function App() {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/crypto")
      .then((res) => setCrypto(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
   <>
   <Navbar/>
     {/* <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">🪙 Crypto Prices (Live)</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-right">24h Change</th>
              <th className="py-3 px-4 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {crypto.map((coin) => (
              <tr key={coin.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">${coin.current_price.toLocaleString()}</td>
                <td
                  className={`py-3 px-4 text-right font-medium ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="py-3 px-4 text-right">${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> */}
    <div className="hero mx-20 text-center">
      <h1 className="text-4xl my-2">Cryptocurrency Prices Today By Market Cap</h1>
      <p>The global cryptocurrency market cap today is $3.74 Trillion, a -7.01% change in the last 24 hours.</p>
    <Table/>
    </div>
   </>
  );
}

export default App;
