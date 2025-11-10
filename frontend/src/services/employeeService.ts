import * as employeeRepo from '../apis/employeeRepo';
import type { Employee } from '../types/employee';

export async function fetchEmployees() {
  const employees = await employeeRepo.getEmployees();
  return employees;
}

export async function createEmployee(employee: Employee) {
  return await employeeRepo.addEmployee(employee);
}

export function validateEmployee(name: string, department: string) {
  const validationErrors = new Map<string, string>();
  
  if (!name?.trim()) {
    validationErrors.set('name', 'Name must be defined');
  } else if (name.trim().length < 3) {
    validationErrors.set('name', 'Name must be at least 3 characters');
  }
  
  if (!department?.trim()) {
    validationErrors.set('department', 'Department must be selected');
  }
  
  return validationErrors;
}