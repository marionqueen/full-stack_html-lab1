import { Request, Response } from 'express';
import * as leaderService from '../services/leaderService';

export async function getLeaders(req: Request, res: Response) {
  try {
    const { search } = req.query;
    
    if (search && typeof search === 'string') {
      const leaders = await leaderService.searchLeaders(search);
      return res.json(leaders);
    }
    
    const leaders = await leaderService.getAllLeaders();
    res.json(leaders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaders' });
  }
}

export async function createLeader(req: Request, res: Response) {
  try {
    const { role, name, description } = req.body;
    const leader = await leaderService.createLeader(role, name, description);
    res.status(201).json(leader);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}