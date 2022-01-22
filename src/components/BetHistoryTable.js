import moment from "moment";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import '../styles/bet-history-table.scss';
import Masonry from "react-masonry-css";

const BetHistoryTable = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const variants = {
    loaded: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "backIn",
      },
    },
    notLoaded: { opacity: 0 },
  };

  const breakpointColumnsObj = {
    default: 3,
    992: 2,
    576: 1,
  };

  return (
    <Masonry
    breakpointCols={breakpointColumnsObj}
    id="betting-table"
    className="betting-table"
  >
      {props.data.map((currentBet, index) => (
        <motion.div
          className="betting-table__bet"
          key={currentBet.id}
          index={index}
          animate={isLoaded ? "loaded" : "notLoaded"}
          variants={variants}
        >
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
                  {currentBet.size} ROY
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </Masonry>
  );
};

export default BetHistoryTable;
