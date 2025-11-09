import { Request, Response } from 'express';
import * as employeeService from '../services/employeeService';

export async function getEmployees(req: Request, res: Response) {
  try {
    const { search } = req.query;
    
    if (search && typeof search === 'string') {
      const employees = await employeeService.searchEmployees(search);
      return res.json(employees);
    }
    
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
}

export async function createEmployee(req: Request, res: Response) {
  try {
    const { name, department } = req.body;
    const employee = await employeeService.createEmployee(name, department);
    res.status(201).json(employee);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getDepartments(req: Request, res: Response) {
  try {
    const departments = await employeeService.getDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
}