import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// import Web3 from "web3";

// import { Web3ReactProvider } from "@web3-react/core";

// function getLibrary(provider) {
//   return new Web3(provider);
// }

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
