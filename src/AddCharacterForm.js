import React, { useState } from 'react';

function AddCharacterForm({ onAddCharacter }) {
  const [name, setName] = useState('');
  const [initiative, setInitiative] = useState('');
  const [isEnemy, setIsEnemy] = useState(false); // Enemy checkbox state

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCharacter({ name, initiative: Number(initiative), enemy: isEnemy });
    setName('');
    setInitiative('');
    setIsEnemy(false); // Reset checkbox
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Character Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Initiative"
        value={initiative}
        onChange={(e) => setInitiative(e.target.value)}
      />
      <label>
        Enemy?
        <input
          type="checkbox"
          checked={isEnemy}
          onChange={(e) => setIsEnemy(e.target.checked)}
        />
      </label>
      <button type="submit">Add Character</button>
    </form>
  );
}

export default AddCharacterForm;
