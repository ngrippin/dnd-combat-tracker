import React from 'react';
import CharacterCard from './CharacterCard';

function InitiativeList({ characters, onUpdateCharacter, onRemoveCharacter }) {
  // Sort characters by initiative in descending order before rendering
  const sortedCharacters = [...characters].sort((a, b) => b.initiative - a.initiative);

  return (
    <div>
      {sortedCharacters.map((character, index) => (
        <CharacterCard
          key={index}
          character={character}
          index={characters.indexOf(character)} // Find the original index in the unsorted array
          onUpdateCharacter={onUpdateCharacter}
          onRemoveCharacter={onRemoveCharacter}
        />
      ))}
    </div>
  );
}

export default InitiativeList;