import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex justify-between items-center w-full p-5">
      <div>
        <h1 className="text-2xl">Some Logo</h1>
      </div>
      <div className="flex">
        <Link
          className={
            location.pathname === "/"
              ? "text-2xl pr-3 text-green-400"
              : "text-2xl pr-3"
          }
          to="/"
        >
          Home
        </Link>
        <button className="text-2xl">Link Your Discord!</button>
      </div>
    </header>
  );
};

export default Header;
