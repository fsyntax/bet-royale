import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import CreateBet from "./pages/CreateBet";
import BettingHistory from "./pages/BettingHistory";

const App = () => {
  return (
    <div className="bg-backgroundColor h-screen w-screen flex flex-col items-center font-poppins text-white">
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
