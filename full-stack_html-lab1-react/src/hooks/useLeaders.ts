import { useEffect, useState, useMemo } from 'react';
import * as LeaderService from '../services/leaderService';
import * as leaderRepo from '../apis/leaderRepo';
import type { Leader } from '../types/organization';

export function useLeaders() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchLeaders = async () => {
    const result = await LeaderService.fetchLeaders();
    setLeaders(result);
  };
  
  const filteredLeaders = useMemo(() => {
    if (!searchTerm) return leaders;
    return leaderRepo.searchLeaders(searchTerm);
  }, [leaders, searchTerm]);
  
  useEffect(() => {
    fetchLeaders();
  }, []);
  
  return {
    leaders: filteredLeaders,
    searchTerm,
    setSearchTerm,
    fetchLeaders
  };
}