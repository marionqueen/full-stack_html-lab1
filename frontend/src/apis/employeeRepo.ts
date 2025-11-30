import { useAuth } from '@clerk/clerk-react';
import type { Employee } from '../types/employee';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function getAuthHeaders() {
  // This will be called from a component with useAuth
  return {
    'Content-Type': 'application/json'
  };
}

export async function getEmployees(token?: string): Promise<Employee[]> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/employees`, { 
    headers,
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to fetch employees');
  return response.json();
}

export async function addEmployee(employee: Omit<Employee, 'id'>, token?: string): Promise<Employee> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(employee)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create employee');
  }
  return response.json();
}

export async function getDepartments(token?: string): Promise<string[]> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/employees/departments`, {
    headers,
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to fetch departments');
  return response.json();
}

export async function searchEmployees(query: string, token?: string): Promise<Employee[]> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/employees?search=${encodeURIComponent(query)}`, {
    headers,
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to search employees');
  return response.json();
}