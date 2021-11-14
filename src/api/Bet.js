import { Component } from "react";

import { GetHash } from "../utils/Common";

export class BetService extends Component {
  static myInstance = null;

  static getInstance() {
    return new BetService();
  }

  async getCurrentBets() {
    try {
      let response = await fetch(
        "https://bet-royale-testing-default-rtdb.firebaseio.com/currentBets.json"
      );

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async createBet(data) {
    let url =
      "https://bet-royale-testing-default-rtdb.firebaseio.com/currentBets.json";

    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async deleteBet(id) {
    let url = `https://bet-royale-testing-default-rtdb.firebaseio.com/currentBets/${id}.json`;

    return await fetch(url, {
      method: "DELETE",
    });
  }

  async getBetHistory() {
    let address = GetHash(localStorage.getItem("address"));

    try {
      let response = await fetch(
        `https://bet-royale-testing-default-rtdb.firebaseio.com/user/${address}/betHistory.json`
      );  

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async logBet(data) {
    let address = localStorage.getItem("address");

    let url = `https://bet-royale-testing-default-rtdb.firebaseio.com/user/${address}/betHistory.json`;

    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default BetService;
