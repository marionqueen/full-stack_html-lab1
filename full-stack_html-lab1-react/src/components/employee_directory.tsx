import React from 'react';
import { employeeData } from '../data/employee_data';

const EmployeeDirectory: React.FC = () => {
  return (
    <main className="main">
      <h2>Employee Directory</h2>
      <section>
        {Object.entries(employeeData.departments).map(([department, employees]) => (
          <div key={department} className="departments-employees">
            <h4>{department}</h4>
            <ul>
              {employees.map((employee, index) => (
                <li key={index}>{employee}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
};

export default EmployeeDirectory;