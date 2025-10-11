export interface Employee {
  name: string;
  department: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}

export interface EmployeeData {
  departments: {
    [key: string]: Employee[];
  };
}