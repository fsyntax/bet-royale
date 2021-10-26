import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";

const App = () => {
  return (
    <div className="bg-backgroundColor h-screen w-screen flex flex-col items-center font-poppins text-white">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
