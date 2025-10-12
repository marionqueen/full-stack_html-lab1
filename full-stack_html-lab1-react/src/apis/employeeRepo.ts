import { employeeData } from '../data/employee_data';
import type { Employee } from '../types/employee';

// Transform the string-based data to Employee objects with department
let employees: Employee[] = Object.entries(employeeData.departments).flatMap(
  ([deptName, empNames]) => 
    empNames.map(name => ({ 
      name, 
      department: deptName 
    }))
);

export async function getEmployees() {
  return employees;
}

export async function addEmployee(employee: Employee) {
  employees.push(employee);
  return employee;
}

export function getDepartments() {
  return Object.keys(employeeData.departments);
}

export function searchEmployees(query: string) {
  const lower = query.toLowerCase();
  return employees.filter(e => 
    e.name.toLowerCase().includes(lower) || 
    e.department.toLowerCase().includes(lower)
  );
}