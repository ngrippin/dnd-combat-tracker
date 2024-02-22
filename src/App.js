import React, { useState, useEffect, useRef } from 'react';
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
  const [selectedIndex, setSelectedIndex] = useState(null);
  const characterRefs = useRef([]); // Refs for each character card

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); // Prevent the default arrow key scroll behavior
        let newIndex;
        if (e.key === 'ArrowDown') {
          newIndex = selectedIndex === characters.length - 1 ? 0 : (selectedIndex + 1) || 0;
        } else {
          newIndex = selectedIndex <= 0 || selectedIndex === null ? characters.length - 1 : selectedIndex - 1;
        }
        setSelectedIndex(newIndex);

        // Scroll to the new selected character card
        characterRefs.current[newIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, characters.length]);

  // Function to assign ref to each character card
  const assignRef = (element, index) => {
    characterRefs.current[index] = element;
  };

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
      <div>Use up and down arrow keys to highlight the active character</div>
      <button onClick={handleReset}>Reset Characters</button>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ flex: 1, marginRight: '20px' }}> {/* InitiativeList Container */}
        <AddCharacterForm onAddCharacter={addCharacter} />
        <InitiativeList characters={characters}
        onUpdateCharacter={onUpdateCharacter}
        onRemoveCharacter={removeCharacter}
        selectedCharacterIndex={selectedIndex}
        assignRef={assignRef}/>
    </div>
    <div style={{ flex: 1 }}> {/* Image Upload and Display Container */}
        {/* Image upload input and display logic here */}
        <div style={{ margin: '20px 0' }}>
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </div>
        {imageSrc && (
          <div>
            <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </div>
        )}
      </div>
    </div>
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
