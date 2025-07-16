import React from 'react';
import  Table from './components/Table';
import Navbar from "./components/Navbar";

function App() {
  return (
   <>
   <div className="main">
   <Navbar/>
    <div className="hero sm:mx-20 mx-4 text-center">
      <h1 className="text-4xl my-2">Cryptocurrency Prices Today By Market Cap</h1>
      <p>The global cryptocurrency market cap today is $3.74 Trillion, a -7.01% change in the last 24 hours.</p>
    <Table/>
    </div>
   </div>
   </>
  );
}

export default App;
