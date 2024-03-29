import React, { Component } from "react";
import "./App.css"
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";
import SortBar from "./SortBar";
import Navbar from "./NavBar";
import AddBotForm from "./AddBot";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    bots: [],
    selectedBots: [],
    selectedBotId: null,
    sortBy: null,
    classFilter: "All",
    isAddBotFormVisible: false,
    };
    this.enlistedClasses = [];
  }

  componentDidMount() {
    this.fetchBots();
  }

  fetchBots() {
    fetch("https://botbattlr-george-kiarie.onrender.com/bots")
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
  
    const index = this.enlistedClasses.indexOf(bot.bot_class);
    if (index !== -1) {
      this.enlistedClasses.splice(index, 1);
    }
  
    this.setState((prevState) => ({
      selectedBots: updatedSelectedBots,
      bots: [...prevState.bots, bot],
    }));
  };

  handleAddBot = (newBot) => {
    this.setState((prevState) => ({
      bots: [...prevState.bots, newBot],
    }));
  };

  dischargeBot = (bot) => {
    const Confirmation = window.confirm(`Are you sure you want to discharge ${bot.name}?`);
  
    if (Confirmation) {
      fetch(`https://botbattlr-george-kiarie.onrender.com/bots/${bot.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to discharge bot");
          }
          // Remove the discharged bot from selectedBots
          const updatedSelectedBots = this.state.selectedBots.filter((selectedBot) => selectedBot.id !== bot.id);
  
          this.setState({
            selectedBots: updatedSelectedBots,
            selectedBotId: null,
          });
  
          window.location.reload();
        })
        .catch((error) => console.error("Error discharging bot:", error));
    }
  };
  
  toggleAddBotForm = () => {
    this.setState((prevState) => ({
      isAddBotFormVisible: !prevState.isAddBotFormVisible,
    }));
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
    const { bots, selectedBots, selectedBotId, sortBy, classFilter, isAddBotFormVisible } = this.state;

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
          dischargeBot={this.dischargeBot}
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
        <SortBar onSortBy={this.handleSortBy} />
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
          <h2>Cannot see your bot?</h2>
          <h3>Add yours: </h3>
          <button onClick={this.toggleAddBotForm}>Add Bot</button>
          {isAddBotFormVisible && <AddBotForm onAddBot={this.handleAddBot} onCloseForm={this.toggleAddBotForm} />}
        </div>
        <BotCollection bots={filteredBots} showBotSpecs={this.showBotSpecs} enlistBot={this.enlistBot} />
      </div>
    );
  }
}

export default App;
