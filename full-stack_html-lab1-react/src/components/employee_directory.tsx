import React, { useState } from 'react';
import { employeeData } from '../data/employee_data';

const EmployeeDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter employees
  const filterEmployees = () => {
    if (!searchTerm) {
      return employeeData.departments;
    }

    const filtered: { [key: string]: string[] } = {};
    
    Object.entries(employeeData.departments).forEach(([department, employees]) => {
      // Dept Name = Search?
      if (department.toLowerCase().includes(searchTerm.toLowerCase())) {
        filtered[department] = employees;
      } else {
        // Individual Employee = Match?
        const matchingEmployees = employees.filter(employee =>
          employee.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (matchingEmployees.length > 0) {
          filtered[department] = matchingEmployees;
        }
      }
    });

    return filtered;
  };

  const filteredDepartments = filterEmployees();

  return (
    <div>
      <h2>Employee Directory</h2>
      
      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '300px'
          }}
        />
      </div>

      <section>
        {Object.keys(filteredDepartments).length === 0 ? (
          <p>No employees found matching "{searchTerm}"</p>
        ) : (
          Object.entries(filteredDepartments).map(([department, employees]) => (
            <div key={department} className="departments-employees">
              <h4>{department}</h4>
              <ul>
                {employees.map((employee, index) => (
                  <li key={index}>{employee}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default EmployeeDirectory;