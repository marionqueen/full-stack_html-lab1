import employeeData from '../data/employee_data';
import type { Employee } from '../types/employee';

// flatten the data structure
let employees: Employee[] = employeeData.flatMap(dept => 
  dept.employees.map(name => ({ 
    name, 
    department: dept.department 
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
  let depts: string[] = [];
  employees.forEach(e => {
    if (!depts.includes(e.department)) {
      depts.push(e.department);
    }
  });
  return depts;
}

export function searchEmployees(query: string) {
  const lower = query.toLowerCase();
  return employees.filter(e => 
    e.name.toLowerCase().includes(lower) || 
    e.department.toLowerCase().includes(lower)
  );
}