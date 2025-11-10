import { useState } from 'react';
import * as EmployeeService from '../services/employeeService';
import * as LeaderService from '../services/leaderService';

export function useEntryForm() {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  
  const validateEmployee = () => {
    const validationErrors = EmployeeService.validateEmployee(name, selected);
    setErrors(validationErrors);
    return validationErrors.size === 0;
  };
  
  const validateLeader = async () => {
    const validationErrors = LeaderService.validateLeader(selected, name, description);
    setErrors(await validationErrors);
    return (await validationErrors).size === 0;
  };
  
  const reset = () => {
    setName('');
    setSelected('');
    setDescription('');
    setErrors(new Map());
  };
  
  return {
    name,
    setName,
    selected,
    setSelected,
    description,
    setDescription,
    errors,
    validateEmployee,
    validateLeader,
    reset
  };
}