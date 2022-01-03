import { withRouter, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import BetService from "../api/Bet";

function Bet(props) {
    const [currentBets, setCurrentBets] = useState([]);
    const [currentBet, setCurrentBet] = useState([]);
    const [betHistory, setBetHistory] = useState([]);

    const {id} = useParams();

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
        const betIndex = currentBetLogs.findIndex(bet => bet.id === id);
        // const currentBetArr = currentBet.map(id => id.id)
        console.log(currentBetLogs[betIndex]);
    });
}, []);




useEffect(() => {

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

  }, []);

    return (
        <div className="mt-5 bet-details">
            {}
            <h1 className='text-center'>test</h1>
        </div>
    )
}
export default withRouter(Bet);