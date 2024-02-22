import React from 'react';

function CharacterCard({ character, index, onUpdateCharacter, onRemoveCharacter }) {
  // Toggle status on or off
  const toggleStatus = (status) => {
    const hasStatus = character.statuses.includes(status);
    const updatedStatuses = hasStatus
      ? character.statuses.filter((s) => s !== status) // Remove status
      : [...character.statuses, status]; // Add status
    onUpdateCharacter({ ...character, statuses: updatedStatuses });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h2>{character.name}</h2>
      <p>Initiative: {character.initiative}</p>
      <div>Statuses:</div>
      <button onClick={() => onRemoveCharacter(index)}>Remove Character</button>
      <div>
        {["Helpless", "Advantaged"].map((status) => (
          <button
            key={status}
            onClick={() => toggleStatus(status)}
            style={{
              margin: "5px",
              backgroundColor: character.statuses.includes(status) ? "red" : "grey",
            }}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CharacterCard;
