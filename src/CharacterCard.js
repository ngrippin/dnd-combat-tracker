import React, { useState } from 'react';

function CharacterCard({ character, index, onUpdateCharacter, onRemoveCharacter }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInitiative, setEditedInitiative] = useState(character.initiative);
  const [editedStatus, setEditedStatus] = useState(character.statuses);

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditedInitiative(character.initiative); // Reset the edited initiative on cancel
    };

    const handleSaveEdit = () => {
      const updatedCharacter = { ...character, initiative: editedInitiative, statuses: editedStatus };
      onUpdateCharacter(index, updatedCharacter);
      setIsEditing(false);
    };

  // Toggle status on or off
  const toggleStatus = (status) => {
    const hasStatus = editedStatus.includes(status);
    const updatedStatuses = hasStatus
      ? editedStatus.filter((s) => s !== status)
      : [...editedStatus, status];
    setEditedStatus(updatedStatuses); // Update local state

    // Update character in the main state
    const updatedCharacter = { ...character, statuses: updatedStatuses };
    onUpdateCharacter(index, updatedCharacter);
  };

  return (
    <div style={{ color: character.enemy ? 'red' : 'black' }}> {/* Conditional styling */}
      <h2>{character.name}</h2>
      {isEditing ? (
              <>
                <input
                  type="number"
                  value={editedInitiative}
                  onChange={(e) => setEditedInitiative(Number(e.target.value))}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <p>Initiative: {character.initiative}</p>
                <button onClick={handleEdit}>Edit</button>
              </>
            )}
      <div>Statuses:</div>
      <div>
        {["Helpless", "Advantaged"].map((status) => (
          <button
            key={status}
            onClick={() => toggleStatus(status)}
            style={{
              margin: "5px",
              backgroundColor: editedStatus.includes(status) ? "red" : "grey",
            }}
          >
            {status}
          </button>
        ))}
      </div>
      <button onClick={() => onRemoveCharacter(index)}>Remove Character</button>
    </div>
  );
}

export default CharacterCard;
