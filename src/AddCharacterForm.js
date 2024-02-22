import React, { useState } from 'react';

function AddCharacterForm({ onAddCharacter }) {
  const [name, setName] = useState('');
  const [initiative, setInitiative] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCharacter({ name, initiative: Number(initiative) });
    setName('');
    setInitiative('');
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
      <button type="submit">Add Character</button>
    </form>
  );
}

export default AddCharacterForm;