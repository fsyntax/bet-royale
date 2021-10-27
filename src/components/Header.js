import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex justify-between items-center w-full p-5">
      <div>
        <h1 className="text-xl">Some Logo</h1>
      </div>
      <div className="flex">
        <Link
          className={
            location.pathname === "/"
              ? "text-xl pr-3 text-green-400"
              : "text-xl pr-3"
          }
          to="/"
        >
          Home
        </Link>
        <Link
          className={
            location.pathname === "/createBet"
              ? "text-xl pr-3 text-green-400"
              : "text-xl pr-3"
          }
          to="/createBet"
        >
          Create Bet
        </Link>
        <Link
          className={
            location.pathname === "/bettingHistory"
              ? "text-xl pr-3 text-green-400"
              : "text-xl pr-3"
          }
          to="/bettingHistory"
        >
          Betting History
        </Link>
        <button className="text-xl">Link Your Discord!</button>
      </div>
    </header>
  );
};

export default Header;
