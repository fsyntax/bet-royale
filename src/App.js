import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import CreateBet from "./pages/CreateBet";
import BettingHistory from "./pages/BettingHistory";
import Footer from "./components/Footer";

import "./styles/header.scss";
import "./index.scss";
import "./styles/main.scss";
import "./styles/bettingtable.scss";
import "./styles/modal.scss";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div
      id="main-container"
      className="min-vh-100 px-3 font-poppins text-white"
    >
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/createBet" exact>
          <CreateBet />
        </Route>
        <Route path="/bettingHistory" exact>
          <BettingHistory />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
