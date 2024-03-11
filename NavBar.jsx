import React from "react";
import YourBotArmy from "./YourBotArmy";

const Navbar = ({ selectedBots, releaseBot, dischargeBot }) => {
  return (
    <nav className="navbar">
      <YourBotArmy className="yourbotarmy"
        selectedBots={selectedBots}
        releaseBot={releaseBot}
        dischargeBot={dischargeBot}
      />
    </nav>
  );
};

export default Navbar;
