import React from 'react';
import CharacterCard from './CharacterCard';

function InitiativeList({ characters, onUpdateCharacter, onRemoveCharacter, selectedCharacterIndex, assignRef }) {
  // Sort characters by initiative in descending order before rendering
  const sortedCharacters = [...characters].sort((a, b) => b.initiative - a.initiative);

  return (
    <div>
      {sortedCharacters.map((character, index) => (
      <div ref={(element) => assignRef(element, index)} key={index}> {/* Assigning ref to the wrapper */}
        <CharacterCard
          key={index}
          character={character}
          isSelected={selectedCharacterIndex === index}
          index={characters.indexOf(character)} // Find the original index in the unsorted array
          onUpdateCharacter={onUpdateCharacter}
          onRemoveCharacter={onRemoveCharacter}
        />
        </div>
      ))}
    </div>
  );
}

export default InitiativeList;