import { organizationData } from '../data/organization_data';
import type { Leader } from '../types/organization';

let leaders: Leader[] = Object.values(organizationData.leadership).flatMap(
  departmentLeaders => departmentLeaders.map(leader => ({
    role: leader.role,
    name: leader.name,
    description: leader.description
  }))
);

export async function getLeaders() {
  return leaders;
}

export async function addLeader(leader: Leader) {
  leaders.push(leader);
  return leader;
}

export function getLeaderByRole(role: string) {
  return leaders.find(l => l.role.toLowerCase() === role.toLowerCase());
}

export function searchLeaders(query: string) {
  const lower = query.toLowerCase();
  return leaders.filter(l => 
    l.role.toLowerCase().includes(lower) || 
    l.name.toLowerCase().includes(lower)
  );
}