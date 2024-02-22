import React, { useState } from 'react';
import './CharacterCard.css';

function CharacterCard({ character, index, onUpdateCharacter, onRemoveCharacter, isSelected }) {
  const cardClasses = `character-card ${character.enemy ? 'enemy' : ''} ${isSelected ? 'selected' : ''}`;
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

      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSaveEdit();
        }
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
    <div className={cardClasses}> {/* Conditional styling */}
      <h2>{character.name}</h2>
      {isEditing ? (
              <>
                <input
                    autoFocus
                  type="number"
                  value={editedInitiative}
                  onKeyDown={handleKeyDown} // Listening for key down events
                  onBlur={handleSaveEdit}
                  onChange={(e) => setEditedInitiative(Number(e.target.value))}
                />
              </>
            ) : (
              <>
                <p onClick={handleEdit}>Initiative: {character.initiative}</p>
              </>
            )}
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
          </div>
      <button onClick={() => onRemoveCharacter(index)}>Remove Character</button>
    </div>
  );
}

export default CharacterCard;
