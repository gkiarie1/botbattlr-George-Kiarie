import React from "react";

const SortBar = ({ onSortBy }) => {
  return (
    <div>
      <label>Sort by:</label>
      <button onClick={() => onSortBy("health")}>Health</button>
      <button onClick={() => onSortBy("damage")}>Damage</button>
      <button onClick={() => onSortBy("armor")}>Armor</button>
    </div>
  );
};

export default SortBar;
