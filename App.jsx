import React, { Component } from "react";
import "./App.css"
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";
import SortBar from "./SortBar";
import Navbar from "./NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bots: [],
      selectedBots: [],
      selectedBotId: null,
      sortBy: null,
      classFilter: "All",
    };
    this.enlistedClasses = [];
  }

  componentDidMount() {
    this.fetchBots();
  }

  fetchBots() {
    fetch("http://localhost:3000/bots")
      .then((response) => response.json())
      .then((data) => this.setState({ bots: data }))
      .catch((error) => console.error("Error fetching bots:", error));
  }

  enlistBot = (bot) => {
    const { bot_class } = bot;

    if (this.enlistedClasses.includes(bot_class)) {
        alert(`You have already enlisted a bot from the ${bot_class} class.`);
        return;
      }
 
    if (!this.enlistedClasses.includes(bot_class)) {
      this.enlistedClasses.push(bot_class);

      const updatedBots = this.state.bots.filter((b) => b.id !== bot.id);

      this.setState((prevState) => ({
        selectedBots: [...prevState.selectedBots, bot],
        bots: updatedBots,
      }));
    }
  };

  releaseBot = (bot) => {
    const { selectedBots } = this.state;
  
    const updatedSelectedBots = selectedBots.filter((selectedBot) => selectedBot.id !== bot.id);
  
    this.setState((prevState) => ({
      selectedBots: updatedSelectedBots,
      bots: [...prevState.bots, bot],
    }));
  };

  dischargeBot = (bot) => {
  
    const Confirmation = window.confirm(`Are you sure you want to discharge ${bot.name}?`);
  
    if (Confirmation) {
      fetch(`http://localhost:3000/bots/${bot.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to discharge bot");
          }
          this.setState((prevState) => ({
            selectedBots: prevState.selectedBots.filter((selectedBot) => selectedBot.id !== bot.id),
            selectedBotId: null,
          }));
          window.location.reload();
        })
        .catch((error) => console.error("Error discharging bot:", error));
    }
  };

  showBotSpecs = (botId) => {
    this.setState({ selectedBotId: botId });
  };

  goBackToList = () => {
    this.setState({ selectedBotId: null });
  };

  handleSortBy = (property) => {
    this.setState({ sortBy: property });
  };

  handleClassFilterChange = (event) => {
    this.setState({ classFilter: event.target.value });
  };

  render() {
    const { bots, selectedBots, selectedBotId, sortBy, classFilter } = this.state;

    const sortedBots = sortBy
      ? [...bots].sort((a, b) => b[sortBy] - a[sortBy])
      : bots;

    if (selectedBotId) {
      const selectedBot = bots.find((bot) => bot.id === selectedBotId);
      return (
        <BotSpecs
          bot={selectedBot}
          enlistBot={this.enlistBot}
          goBackToList={this.goBackToList}
        />
      );
    }
    const filteredBots = classFilter === "All"
        ? sortedBots
        : sortedBots.filter(bot => bot.bot_class === classFilter);

    return (
      <div>
        <h1>Galaxicus Army</h1>
        <Navbar
          selectedBots={selectedBots}
          releaseBot={this.releaseBot}
          dischargeBot={this.dischargeBot}
        />
        <SortBar onSortBy={this.handleSortBy}/>
        <div>
            <label htmlFor="classFilter">Filter by Class:</label>
            <select id="classFilter" value={classFilter} onChange={this.handleClassFilterChange}>
              <option value="All">All</option>
              <option value="Support">Support</option>
              <option value="Medic">Medic</option>
              <option value="Assault">Assault</option>
              <option value="Defender">Defender</option>
              <option value="Captain">Captain</option>
              <option value="Witch">Witch</option>
            </select>
          </div>
        <BotCollection bots={filteredBots} showBotSpecs={this.showBotSpecs} enlistBot={this.enlistBot} />
      </div>
    );
  }
}

export default App;
