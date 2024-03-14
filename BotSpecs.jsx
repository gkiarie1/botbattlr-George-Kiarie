import React from "react";

function BotSpecs({ bot, enlistBot, goBackToList, dischargeBot}) {
  const handleEnlistClick = () => {
    enlistBot(bot); 
    goBackToList(); 
  }
  const handleDischargeClick = () => {
    dischargeBot(bot); 
  }

  return (
    <div>
      <h2>{bot.name} Specs</h2>
      <img src={bot.avatar_url} alt={bot.name} />
      <p>Class: {bot.bot_class}</p>
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      <p>Catchphrase: {bot.catchphrase}</p>
      <button onClick={handleEnlistClick}>Enlist</button>
      <button onClick={goBackToList}>Back to List</button>
      <button onClick={handleDischargeClick}>Discharge Bot</button>
    </div>
  );
}

export default BotSpecs;
