import React, { useState, useEffect } from 'react';
import InitiativeList from './InitiativeList';
import AddCharacterForm from './AddCharacterForm';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component

function App() {
  const [characters, setCharacters] = useState(() => {
    const savedCharacters = localStorage.getItem('characters');
    return savedCharacters ? JSON.parse(savedCharacters) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
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
    localStorage.removeItem('characters'); // Clear localStorage
    setIsModalOpen(false); // Close modal
  };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type.substr(0, 5) === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImageSrc(null);
      }
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
        <div style={{ margin: '20px 0' }}>
              <input type="file" onChange={handleImageUpload} accept="image/*" />
        </div>
        {imageSrc && (
          <div>
            <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </div>
        )}
    </div>
  );
}

export default App;
