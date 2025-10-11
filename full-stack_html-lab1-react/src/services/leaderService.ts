import * as leaderRepo from '../apis/leaderRepo';
import type { Leader } from '../types/organization';

export async function fetchLeaders() {
  const leaders = await leaderRepo.getLeaders();
  return leaders;
}

export async function createLeader(leader: Leader) {
  return await leaderRepo.addLeader(leader);
}

export function validateLeader(role: string, name: string, description: string) {
  const validationErrors = new Map<string, string>();
  
  const existing = leaderRepo.getLeaderByRole(role);
  if (existing) {
    validationErrors.set('role', 'This role is already filled');
  }
  
  if (!name?.trim()) {
    validationErrors.set('name', 'Name must be defined');
  } else if (name.trim().length < 3) {
    validationErrors.set('name', 'Name must be at least 3 characters');
  }
  
  if (!description?.trim()) {
    validationErrors.set('description', 'Description must be defined');
  } else if (description.trim().length < 3) {
    validationErrors.set('description', 'Description must be at least 3 characters');
  }
  
  return validationErrors;
}