import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import BetService from "../api/Bet";
import '../styles/bet-details.scss';
import ReactHtmlParser from "react-html-parser";
import moment from "moment";



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
        <div className="mt-5 bet-details">
          <div className="bet-details__heading">
            <h1 className='text-cente bet-details__heading__name'>{currentBet.name}</h1>
            {/* <hr className="bet-details__heading__divider"/> */}
            <div className="bet-details__sub">

            <div className="bet-details__sub__avatar"></div>
            <p className="bet-details__sub__text bet-details__bg">{currentBet.shortDescription}</p>
          </div>
            </div>
          <div className="bet-details__main ">
            <h3>Bet Details</h3>
            <div class="bet-details__main__data bet-details__bg">
              <ul>
                <li>Deadline: 
                  <span>
                    {moment
                      .utc(currentBet.deadline)
                      .local()
                      .format("YYYY/MM/DD h:mm A")
                      }
                  </span>
                </li>
                <li>Results: 
                  <span>
                    {moment
                      .utc(currentBet.results)
                      .local()
                      .format("YYYY/MM/DD h:mm A")
                      }
                  </span>
                </li>
                <li>Bet Size: <span>{currentBet.size}</span></li>
                <li>Players / Pot: <span>{currentBet.currentBets} Bets / {currentBet.currentBets * currentBet.size} ROY</span></li>
                <li>Maximum Betters: <span>{currentBet.maxBetters}</span></li>
              </ul>
            </div>
            <h3>Full Bet description</h3>
            <div className="bet-details__main__description bet-details__bg">
              {ReactHtmlParser(currentBet.description)}
            </div>
          </div>
        </div>
    )
}
export default Bet; 