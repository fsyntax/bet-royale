import { withRouter, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import BetService from "../api/Bet";
import '../styles/bet-details.scss';
import ReactHtmlParser from "react-html-parser";


function Bet(props) {
    const [currentBet, setCurrentBet] = useState([]);
    // const [betHistory, setBetHistory] = useState([]);

    
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
        const betIndex = currentBetLogs.findIndex(bet => bet.id === id);
        setCurrentBet(currentBetLogs[betIndex]);
    });
});

// useEffect(() => {

//     BetService.getInstance()
//       .getBetHistory()
//       .then((data) => {
//         const betHistoryLogs = [];

//         for (const key in data) {
//           const betHistoryLog = {
//             id: key,
//             ...data[key],
//           };

//           betHistoryLogs.push(betHistoryLog);
//         }

//         setBetHistory(betHistoryLogs);
//       });

//   }, []);

    return (
        <div classNameName="mt-5 bet-details">
          <div className="bet-details__heading">
            <h1 classNameName='text-cente bet-details__heading__name'>{currentBet.name}</h1>
            <hr className="bet-details__heading__divider"/>
            <p className="bet-details__heading__sub bet-details__bg">{currentBet.shortDescription}</p>
          </div>
          <div className="bet-details__main ">
            <div class="bet-details__main__description bet-details__bg">
              {ReactHtmlParser(currentBet.description)}
            </div>
          </div>
        </div>
    )
}
export default withRouter(Bet); 