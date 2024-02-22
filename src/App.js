import React, { useState, useEffect } from 'react';
import InitiativeList from './InitiativeList';
import AddCharacterForm from './AddCharacterForm';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component

function App() {
  const [characters, setCharacters] = useState(() => {
    const savedCharacters = sessionStorage.getItem('characters');
    return savedCharacters ? JSON.parse(savedCharacters) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  const addCharacter = (character) => {
    setCharacters([...characters, { ...character, statuses: [] }]);
  };

  const removeCharacter = (index) => {
    setCharacters(characters.filter((_, i) => i !== index));
  };

  const onUpdateCharacter = (index, updatedCharacter) => {
    const newCharacters = [...characters];
    newCharacters[index] = updatedCharacter;
    setCharacters(newCharacters);
  };

  const handleReset = () => {
    setIsModalOpen(true); // Show confirmation modal
  };

  const resetCharacters = () => {
    setCharacters([]); // Clear character list
    sessionStorage.removeItem('characters'); // Clear sessionStorage
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="App">
      <h1>D&D Combat Tracker</h1>
      <AddCharacterForm onAddCharacter={addCharacter} />
      <button onClick={handleReset}>Reset Characters</button>
      <InitiativeList characters={characters} onUpdateCharacter={onUpdateCharacter} onRemoveCharacter={removeCharacter} />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={resetCharacters}
        message="Are you sure you want to reset the entire list of characters?"
      />
    </div>
  );
}

export default App;
