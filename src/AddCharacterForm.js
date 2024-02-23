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
        style={{ margin: '0px 10px' }}
        placeholder="Character Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      Initiative:
      <select
          value={initiative}
          style={{ margin: '0px 10px' }}
          onChange={(e) => setInitiative(e.target.value)}
        >
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      <label style={{ margin: '0px 10px' }}>
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
