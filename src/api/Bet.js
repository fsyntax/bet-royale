import { Component } from "react";

export class BetService extends Component {
  static myInstance = null;

  static getInstance() {
    return new BetService();
  }

  async getCurrentBets() {
    try {
      let response = await fetch("http://localhost:3000/currentBets");

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  async createBet(data) {
    let url = "http://localhost:3000/currentBets";

    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getBetHistory() {
    try {
      let response = await fetch("http://localhost:3000/betHistory");

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
}

export default BetService;
