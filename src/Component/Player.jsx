import { useState } from "react";

export default function Player({ name, symbol, isActive, onEditName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  let editedPlayerName = <span className="player-name">{playerName}</span>;

  function editHandler() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onEditName(symbol, playerName);
    }
  }

  function handelChange(event) {
    setPlayerName(event.target.value);
  }

  if (isEditing) {
    editedPlayerName = (
      <input type="text" value={playerName} onChange={handelChange} />
    );
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {editedPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
