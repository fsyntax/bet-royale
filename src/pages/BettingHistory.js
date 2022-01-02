import { useState, useEffect } from "react";

import Loading from "../components/Loading";
import BetHistoryTable from "../components/BetHistoryTable";
import { motion } from 'framer-motion';
import BetService from "../api/Bet";

const BettingHistory = () => {
  const [betHistory, setBetHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    BetService.getInstance()
      .getBetHistory()
      .then((data) => {
        const betLogs = [];

        for (const key in data) {
          const betLog = {
            id: key,
            ...data[key],
          };

          betLogs.push(betLog);
        }

        setBetHistory(betLogs);
      });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <motion.div initial={{opacity: 0, filter: "blur(2px)" }} transition={{ease: "easeInOut"}} animate={{opacity: 1, filter:"blur(0)"}} exit={{opacity: 0, filter: "blur(2px)"}}>

    <div className="container d-flex align-items-center flex-column pt-5">
      <h1 className="text-4xl">Betting History</h1>
      <div className="my-10 w-100 d-flex justify-items-end align-items-center">
        <div className="d-flex flex-column">
          <label className="mb-1" htmlFor="betHistorySort">
            Sort By:
          </label>
          <select className="form-select">
            <option value="betsCompleted" defaultValue>
              Bets Completed
            </option>
            <option value="activeBets">Active Bets</option>
          </select>
        </div>
      </div>
      <div className="mt-5 d-flex justify-items-center align-items-center w-100">
        <BetHistoryTable data={betHistory} />
      </div>
    </div>
    </motion.div>
  );
};

export default BettingHistory;
