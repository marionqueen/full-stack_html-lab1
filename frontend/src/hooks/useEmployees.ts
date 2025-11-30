import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import * as employeeRepo from '../apis/employeeRepo';
import type { Employee } from '../types/employee';

export function useEmployees() {
  const { getToken } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async () => {
    try {
      const token = await getToken();
      const data = await employeeRepo.getEmployees(token || undefined);
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = await getToken();
      const data = await employeeRepo.getDepartments(token || undefined);
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
    const searchAsync = async () => {
      if (searchTerm.trim() === '') {
        await fetchEmployees();
      } else {
        try {
          const token = await getToken();
          const filtered = await employeeRepo.searchEmployees(searchTerm, token || undefined);
          setEmployees(filtered);
        } catch (error) {
          console.error('Error searching:', error);
        }
      }
    };
    searchAsync();
  }, [searchTerm]);

  return {
    employees,
    departments,
    searchTerm,
    setSearchTerm,
    fetchEmployees
  };
}