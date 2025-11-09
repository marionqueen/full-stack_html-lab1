import type { Employee } from '../types/employee';

const API_URL = 'http://localhost:3001/api';

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) throw new Error('Failed to fetch employees');
  return response.json();
}

export async function addEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create employee');
  }
  return response.json();
}

export async function getDepartments(): Promise<string[]> {
  const response = await fetch(`${API_URL}/employees/departments`);
  if (!response.ok) throw new Error('Failed to fetch departments');
  return response.json();
}

export async function searchEmployees(query: string): Promise<Employee[]> {
  const response = await fetch(`${API_URL}/employees?search=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search employees');
  return response.json();
}