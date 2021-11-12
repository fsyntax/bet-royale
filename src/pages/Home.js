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
        const currentBetLogs = [];

        for (const key in data) {
          const currentBetLog = {
            id: key,
            ...data[key],
          };

          currentBetLogs.push(currentBetLog);
        }

        setCurrentBets(currentBetLogs);
      });
  }, []);

  return (
    <div className="container d-flex align-items-center flex-column h-full w-full">
      <Header />
      <h1 className="text-4xl mb-5">RoyBet Centre</h1>
      <div className="mt-10 mw-100 d-flex justify-items-center align-items-center">
        <BettingTable data={currentBets} />
      </div>
    </div>
  );
};

export default Home;
