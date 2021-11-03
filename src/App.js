import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import CreateBet from "./pages/CreateBet";
import BettingHistory from "./pages/BettingHistory";

import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="bg-dark min-vh-100 min-vw-100 d-flex flex-column align-items-center font-poppins text-white">
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
    </div>
  );
};

export default App;
