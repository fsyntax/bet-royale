import { useState, useEffect } from "react";

import Header from "../components/Header";
import BettingTable from "../components/BettingTable";

import BetService from "../api/Bet";

const Home = () => {
  const [currentBets, setCurrentBets] = useState([]);

  useEffect(() => {
    BetService.getInstance()
      .getCurrentBets()
      .then((data) => {
        setCurrentBets(data);
      });
  }, []);

  return (
    <div className="container flex items-center flex-col h-full w-full">
      <Header />
      <h1 className="text-4xl">RoyBet Centre</h1>
      <div className="mt-10 w-full flex justify-center items-center">
        <BettingTable data={currentBets} />
      </div>
    </div>
  );
};

export default Home;
