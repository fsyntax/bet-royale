import moment from "moment";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const BetHistoryTable = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
      setIsLoaded(true);
  }, []);
  const variants = {
    loaded: {
      opacity: 1, 
      transition: {
        duration: .7,
        ease: "backIn"
      } 
    },
    notLoaded: {opacity: 0}
  }
  return (
    <div className="container betting-table w-100">
      {props.data.map((currentBet, index) => (
          <motion.div 
          className="betting-table__bet" 
          key={currentBet.id} 
          index={index} 
          animate={isLoaded ? "loaded" : "notLoaded"}
          variants={variants} >  
          <div className="betting-table__bet__header">
            <h3 className="betting-table__bet__name">{currentBet.name}</h3>
          </div>
          <div className="betting-table__bet__body mt-3">
            <div className="betting-table__bet__body__data">
              <h4>About the Bet</h4>
              <ul>
                <li>
                  <span>Selected Choice:</span> {currentBet.selectedOption}
                </li>
                <li>
                  <span>Deadline:</span>{" "}
                  {moment
                    .utc(currentBet.deadline)
                    .local()
                    .format("YYYY/MM/DD h:mm A")}
                </li>
                <li>
                  <span>Results: </span>
                  {moment
                    .utc(currentBet.results)
                    .local()
                    .format("YYYY/MM/DD h:mm A")}
                </li>
                <li>
                  <span>Bet Size: </span>
                  {currentBet.size}
                </li>
              </ul>
            </div>
          </div>
          </motion.div>
      ))}
    </div>
  );
};

export default BetHistoryTable;
