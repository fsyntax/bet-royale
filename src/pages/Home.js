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
    <div className="container-fluid px-0 mx-0 d-flex align-items-center flex-column pt-4">
      <h1 className="text-4xl mb-4">RoyBet Centre</h1>
      <BettingTable data={currentBets} betHistoryData={betHistory} />
    </div>
  );
};

export default Home;
