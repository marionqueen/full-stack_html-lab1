import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import * as leaderRepo from '../apis/leaderRepo';
import type { Leader } from '../types/organization';

export function useLeaders() {
  const { getToken } = useAuth();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeaders = async () => {
    try {
      const token = await getToken();
      const data = await leaderRepo.getLeaders(token || undefined);
      setLeaders(data);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  useEffect(() => {
    const searchAsync = async () => {
      if (searchTerm.trim() === '') {
        await fetchLeaders();
      } else {
        try {
          const token = await getToken();
          const filtered = await leaderRepo.searchLeaders(searchTerm, token || undefined);
          setLeaders(filtered);
        } catch (error) {
          console.error('Error searching leaders:', error);
        }
      }
    };
    searchAsync();
  }, [searchTerm]);

  return {
    leaders,
    searchTerm,
    setSearchTerm,
    fetchLeaders
  };
}