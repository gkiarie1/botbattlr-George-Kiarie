import React from "react";
import BotItem from "./BotItem";

const BotCollection = ({ bots, showBotSpecs, enlistBot }) => {
  return (
    <div className="botcollection">
      <h2>Bot Collection</h2>
      {bots.map((bot) => (
        <BotItem key={bot.id} bot={bot} showBotSpecs={showBotSpecs} enlistBot={enlistBot} />
      ))}
    </div>
  );
};

export default BotCollection;
