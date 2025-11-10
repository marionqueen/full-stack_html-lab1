import { useState, useEffect } from 'react';
import * as leaderRepo from '../apis/leaderRepo';
import type { Leader } from '../types/organization';

export function useLeaders() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeaders = async () => {
    try {
      const data = await leaderRepo.getLeaders();
      setLeaders(data);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchLeaders();
    } else {
      const searchAsync = async () => {
        try {
          const filtered = await leaderRepo.searchLeaders(searchTerm);
          setLeaders(filtered);
        } catch (error) {
          console.error('Error searching leaders:', error);
        }
      };
      searchAsync();
    }
  }, [searchTerm]);

  return {
    leaders,
    searchTerm,
    setSearchTerm,
    fetchLeaders
  };
}