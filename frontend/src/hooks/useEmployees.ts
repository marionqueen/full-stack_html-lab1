import { useEffect, useState, useMemo } from 'react';
import * as EmployeeService from '../services/employeeService';
import * as employeeRepo from '../apis/employeeRepo';
import type { Employee } from '../types/employee';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchEmployees = async () => {
    const result = await EmployeeService.fetchEmployees();
    setEmployees(result);
  };
  
  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
    return employeeRepo.searchEmployees(searchTerm);
  }, [employees, searchTerm]);
  
  const departments = useMemo(() => {
    return employeeRepo.getDepartments();
  }, [employees]);
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  
  return {
    employees: filteredEmployees,
    departments,
    searchTerm,
    setSearchTerm,
    fetchEmployees
  };
}