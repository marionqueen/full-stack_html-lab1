import type { Leader } from '../types/organization';

const API_URL = 'http://localhost:3001/api';

export async function getLeaders(): Promise<Leader[]> {
  const response = await fetch(`${API_URL}/leaders`);
  if (!response.ok) throw new Error('Failed to fetch leaders');
  return response.json();
}

export async function addLeader(leader: Omit<Leader, 'id'>): Promise<Leader> {
  const response = await fetch(`${API_URL}/leaders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leader)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create leader');
  }
  return response.json();
}

export function getLeaderByRole(_role: string): Promise<Leader | undefined> {
  // Backend handles validation now
  return Promise.resolve(undefined);
}

export async function searchLeaders(query: string): Promise<Leader[]> {
  const response = await fetch(`${API_URL}/leaders?search=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search leaders');
  return response.json();
}