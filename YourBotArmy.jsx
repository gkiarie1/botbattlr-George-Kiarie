import React from "react";
import BotItem from "./BotItem";

const YourBotArmy = ({ selectedBots, releaseBot, dischargeBot }) => {
  return (
    <div>
      <h2>Your Bot Army</h2>
      {selectedBots.map((bot) => (
        <BotItem
          key={bot.id}
          bot={bot}
          releaseBot={releaseBot}
          dischargeBot={dischargeBot} 
        />
      ))}
    </div>
  );
};

export default YourBotArmy;
