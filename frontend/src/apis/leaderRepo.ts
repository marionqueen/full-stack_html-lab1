import type { Leader } from '../types/organization';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function getLeaders(token?: string): Promise<Leader[]> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/leaders`, {
    headers,
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to fetch leaders');
  return response.json();
}

export async function addLeader(leader: Omit<Leader, 'id'>, token?: string): Promise<Leader> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/leaders`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(leader)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create leader');
  }
  return response.json();
}

export function getLeaderByRole(role: string): Promise<Leader | undefined> {
  // Backend handles validation now
  return Promise.resolve(undefined);
}

export async function searchLeaders(query: string, token?: string): Promise<Leader[]> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}/leaders?search=${encodeURIComponent(query)}`, {
    headers,
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to search leaders');
  return response.json();
}