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

    // Function to update the initiative and close the editor
    const handleChangeInitiative = (e) => {
      const newInitiative = Number(e.target.value);
      setEditedInitiative(newInitiative); // Update the edited initiative value
      const updatedCharacter = {
        ...character,
        initiative: newInitiative,
      };
      onUpdateCharacter(index, updatedCharacter); // Update the character in the parent component
      setIsEditing(false); // Close the select dropdown by setting isEditing to false
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
                <select
                    value={editedInitiative}
                    onChange={handleChangeInitiative}
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
              </>
            ) : (
              <>
                <p onClick={handleEdit}>Initiative: {character.initiative}</p>
              </>
            )}
    <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>Statuses:</div>
          <div>
            {["Helpless", "Advantaged", "Concentrating"].map((status) => (
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
