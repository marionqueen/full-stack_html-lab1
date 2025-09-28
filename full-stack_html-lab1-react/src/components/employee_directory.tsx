import React, { useState } from 'react';
import { employeeData } from '../data/employee_data';

const EmployeeDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <h2>Employee Directory</h2>
      Please enter employee name or department to search:
      {/* search bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
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
        {Object.entries(employeeData.departments).map(([department, employees]) => {
          // Simple filtering - only show employees that match search
          const filteredEmployees = employees.filter(employee =>
            employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
            department.toLowerCase().includes(searchTerm.toLowerCase())
          );

          // Only show department if it has matching employees or empty search
          if (filteredEmployees.length > 0 || searchTerm === '') {
            return (
              <div key={department} className="departments-employees">
                <h4>{department}</h4>
                <ul>
                  {(searchTerm === '' ? employees : filteredEmployees).map((employee, index) => (
                    <li key={index}>{employee}</li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </section>
    </div>
  );
};

export default EmployeeDirectory;