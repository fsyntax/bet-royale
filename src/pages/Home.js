import { useState, useEffect } from "react";

import Loading from "../components/Loading";
import BettingTable from "../components/BettingTable";

import BetService from "../api/Bet";

const Home = () => {
  const [currentBets, setCurrentBets] = useState([]);
  const [betHistory, setBetHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

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

        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    BetService.getInstance()
      .getBetHistory()
      .then((data) => {
        const betHistoryLogs = [];

        for (const key in data) {
          const betHistoryLog = {
            id: key,
            ...data[key],
          };

          betHistoryLogs.push(betHistoryLog);
        }

        setBetHistory(betHistoryLogs);
      });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container d-flex align-items-center flex-column h-100 w-100 pt-4">
      <h1 className="text-4xl mb-4">RoyBet Centre</h1>
      <div className="mt-10 w-100 d-flex justify-items-center align-items-center">
        <BettingTable data={currentBets} betHistoryData={betHistory} />
      </div>
    </div>
  );
};

export default Home;
