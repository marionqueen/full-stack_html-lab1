export interface Employee {
  name: string;
  department: string;
}

export interface Department {
  name: string;
  employees: string[];
}

export interface EmployeeData {
  departments: {
    [key: string]: string[];
  };
}