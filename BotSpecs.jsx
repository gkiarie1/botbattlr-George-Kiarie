import React from "react";

function BotSpecs({ bot, enlistBot, goBackToList }) {
  const handleEnlistClick = () => {
    enlistBot(bot); 
    goBackToList(); 
  };

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
    </div>
  );
}

export default BotSpecs;
