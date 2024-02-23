import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

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
      <TextField
        variant="standard"
        type="text"
        style={{ margin: '10px 10px' }}
        placeholder="Character Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      Initiative:
      <Select
          value={initiative}
          style={{ margin: '10px 10px', height: 40 }}
          onChange={(e) => setInitiative(e.target.value)}
        >
          {Array.from({ length: 31 }, (_, i) => (
            <MenuItem  key={i} value={i}>{i}</MenuItem >
          ))}
        </Select>
      <label style={{ margin: '10px 10px' }}>
        Enemy?
        <Checkbox
          type="checkbox"
          checked={isEnemy}
          onChange={(e) => setIsEnemy(e.target.checked)}
        />
      </label>
      <Button variant="outlined" type="submit">Add Character</Button>
    </form>
  );
}

export default AddCharacterForm;
