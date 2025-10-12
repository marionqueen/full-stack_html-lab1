import { useState } from 'react';

export function useEntryForm() {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');
  
  const reset = () => {
    setName('');
    setSelected('');
    setDescription('');
  };
  
  return {
    name,
    setName,
    selected,
    setSelected,
    description,
    setDescription,
    reset
  };
}