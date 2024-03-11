import React from "react";

const BotItem = ({ bot, showBotSpecs, enlistBot, releaseBot, dischargeBot }) => {
  return (
    <div className="bot-item">
      <h3>{bot.name}</h3>
      <img src={bot.avatar_url} alt={bot.name} />
      {showBotSpecs && <button onClick={() => showBotSpecs(bot.id)} ClassName="bots">View Bot</button>}
      {enlistBot && <button onClick={() => enlistBot(bot)} ClassName="bots">Enlist</button>}
      {releaseBot && <button onClick={() => releaseBot(bot)} ClassName="bots">Release Bot</button>}
      {dischargeBot && <button onClick={() => dischargeBot(bot)} ClassName="bots">Discharge Bot</button>}
    </div>
  );
};

export default BotItem;
