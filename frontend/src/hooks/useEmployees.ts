import { useState, useEffect } from 'react';
import * as employeeRepo from '../apis/employeeRepo';
import type { Employee } from '../types/employee';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async () => {
    try {
      const data = await employeeRepo.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const data = await employeeRepo.getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchEmployees();
    } else {
      const searchAsync = async () => {
        try {
          const filtered = await employeeRepo.searchEmployees(searchTerm);
          setEmployees(filtered);
        } catch (error) {
          console.error('Error searching:', error);
        }
      };
      searchAsync();
    }
  }, [searchTerm]);

  return {
    employees,
    departments,
    searchTerm,
    setSearchTerm,
    fetchEmployees
  };
}