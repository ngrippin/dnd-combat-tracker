import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import PersonOffIcon from '@mui/icons-material/PersonOff';
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

    // Function to determine button color based on status
    const getStatusButtonColor = (status) => {
      switch (status) {
        case 'Advantaged':
          return 'green';
        case 'Concentrating':
          return 'blue';
        case 'Helpless':
          return 'red';
        default:
          return 'grey'; // Default color for other statuses
      }
    };

  return (
    <div className={cardClasses} style={{ display: 'flex'}}> {/* Conditional styling */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h2 style={{ margin: '10px 10px' }}>{character.name}</h2>
          {isEditing ? (
                  <>
                    <Select
                        style={{ margin: '10px 10px', height: 40 }}
                        value={editedInitiative}
                        onChange={handleChangeInitiative}
                      >
                        {Array.from({ length: 31 }, (_, i) => (
                          <MenuItem key={i} value={i}>{i}</MenuItem>
                        ))}
                      </Select>
                  </>
                ) : (
                  <>
                    <p onClick={handleEdit} style={{ margin: '10px 10px' }}>Initiative: {character.initiative}</p>
                  </>
                )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ margin: '0px 10px' }}>Statuses:</div>
              <ButtonGroup variant="contained">
                {["Helpless", "Advantaged", "Concentrating"].map((status) => (
                  <Button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    style={{
                      backgroundColor: editedStatus.includes(status) ? getStatusButtonColor(status) : "grey",
                    }}
                  >
                    {status}
                  </Button>
                ))}
              </ButtonGroup>
              </div>
              </div>
       <div style={{ flex: 0, alignItems: 'right',}}>
          <Fab size="medium" color="primary" aria-label="delete" onClick={() => onRemoveCharacter(index)}>
            <PersonOffIcon />
          </Fab>
      </div>
    </div>
  );
}

export default CharacterCard;
