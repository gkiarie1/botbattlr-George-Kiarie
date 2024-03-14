import React, { useState, useEffect } from "react";

const AddBotForm = ({ onAddBot, onCloseForm }) => {
  const [name, setName] = useState("");
  const [health, setHealth] = useState("");
  const [damage, setDamage] = useState("");
  const [armor, setArmor] = useState("");
  const [botClass, setBotClass] = useState("");
  const [catchphrase, setCatchphrase] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]);

  useEffect(() => {
    // Fetch classes from the API
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://botbattlr-george-kiarie.onrender.com/bots");
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const botsData = await response.json();

        // Extract unique classes from botsData
        const uniqueClasses = [...new Set(botsData.map((bot) => bot.bot_class))];

        setAvailableClasses(uniqueClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []); // Pass an empty dependency array to ensure the effect runs only once

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBot = {
      name: name || "New Bot",
      health: health || "",
      damage: damage || 20,
      armor: armor || 63,
      bot_class: botClass || "Support",
      catchphrase: catchphrase || "1010010101001101100011000111101",
      avatar_url: avatar_url || "https://robohash.org/nostrumrepellendustenetur.png?size=300x300&set=set1",
    };

    try {
      const response = await fetch("https://botbattlr-george-kiarie.onrender.com/bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBot),
      });

      if (!response.ok) {
        throw new Error("Failed to add bot");
      }

      const addedBot = await response.json();
      if (addedBot.id) {
        
        onAddBot(addedBot);
        onCloseForm();
        window.location.reload();
      } else {
        console.error("Error: Backend did not return a valid bot with an 'id' property");
      }
    } catch (error) {
      console.error("Error adding bot:", error);
    }

    setName("");
    setHealth("");
    setDamage("");
    setArmor("");
    setBotClass("");
    setCatchphrase("");
    setAvatar_url("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Health:
          <input type="number" value={health} max="100" min="0" onChange={(e) => setHealth(e.target.value)} />
        </label>
        <br />
        <label>
          Damage:
          <input type="number" value={damage} max="100" min="0" onChange={(e) => setDamage(e.target.value)} />
        </label>
        <br />
        <label>
          Armor:
          <input type="number" value={armor} max="100" min="0" onChange={(e) => setArmor(e.target.value)} />
        </label>
        <br />
        <label>
          Class:
          <select value={botClass} onChange={(e) => setBotClass(e.target.value)}>
            <option value="">Select a class</option>
            {availableClasses.map((classOption) => (
              <option key={classOption} value={classOption}>
                {classOption}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Catchphrase:
          <input type="number" placeholder="1000101001" value={catchphrase} onChange={(e) => setCatchphrase(e.target.value)} />
        </label>
        <br />
        <label>
          Avatar_url:
          <input type="link" value={avatar_url} onChange={(e) => setAvatar_url(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Bot</button>
      </form>
    </div>
  );
};

export default AddBotForm;
