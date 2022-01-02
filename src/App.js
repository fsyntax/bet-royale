import { Route, Switch, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import CreateBet from "./pages/CreateBet";
import BettingHistory from "./pages/BettingHistory";
import Guide from "./pages/Guide";
import Footer from "./components/Footer";
import { AnimatePresence } from 'framer-motion';
import "./styles/header.scss";
import "./index.scss";
import "./styles/main.scss";
import "./styles/bettingtable.scss";
import "./styles/modal.scss";
import "./styles/footer.scss";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const location = useLocation();
  return (
    <div
      id="main-container"
      className="min-vh-100 px-4 font-poppins text-white"
    >
      <Header />
      <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/createBet" exact>
          <CreateBet />
        </Route>
        <Route path="/bettingHistory" exact>
          <BettingHistory />
        </Route>
        <Route path="/guide" exact>
          <Guide />
        </Route>
      </Switch>
      <Footer />
      </AnimatePresence>
    </div>
  );
};

export default App;
