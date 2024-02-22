import React, { useState } from 'react';
import InitiativeList from './InitiativeList';
import AddCharacterForm from './AddCharacterForm';

function App() {
  const [characters, setCharacters] = useState([]);

  // When adding a character, include a statuses field.
  const addCharacter = (character) => {
    const newCharacter = { ...character, statuses: [] }; // Initialize with no statuses
    setCharacters([...characters, newCharacter]);
  };

  const updateCharacter = (updatedCharacter) => {
    const updatedCharacters = characters.map((character) =>
      character.name === updatedCharacter.name ? updatedCharacter : character
    );
    setCharacters(updatedCharacters);
  };

    const removeCharacter = (index) => {
      setCharacters(characters.filter((_, i) => i !== index));
    };

  return (
    <div className="App">
      <h1>D&D Combat Tracker</h1>
      <AddCharacterForm onAddCharacter={addCharacter} />
        <InitiativeList characters={characters} onUpdateCharacter={updateCharacter} onRemoveCharacter={removeCharacter} />
    </div>
  );
}

export default App;
