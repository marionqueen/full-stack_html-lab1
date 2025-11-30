import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useEmployees } from '../hooks/useEmployees';
import { useEntryForm } from '../hooks/useEntryForm';
import * as EmployeeService from '../services/employeeService';
import * as employeeRepo from '../apis/employeeRepo';

function EmployeeDirectory() {
  const { getToken } = useAuth();
  const { employees, departments, searchTerm, setSearchTerm, fetchEmployees } = useEmployees();
  const form = useEntryForm();
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  
  const handleAdd = async () => {
    const validationErrors = EmployeeService.validateEmployee(form.name, form.selected);
    
    if (validationErrors.size > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const token = await getToken();
      await employeeRepo.addEmployee({
        name: form.name,
        department: form.selected
      }, token || undefined);
      
      await fetchEmployees();
      form.reset();
      setErrors(new Map());
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  
  return (
    <div>
      <h2>Employee Directory</h2>
      {/* Add Employee Form */}
      <h3>Add New Employee</h3>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          placeholder="Employee Name"
          value={form.name}
          onChange={(e) => form.setName(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginRight: '10px'
          }}
        />
        {errors.get('name') && <p style={{color: 'red', margin: '5px 0'}}>{errors.get('name')}</p>}
        
        <select 
          value={form.selected} 
          onChange={(e) => form.setSelected(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          <option value="">Select Department</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {errors.get('department') && <p style={{color: 'red', margin: '5px 0'}}>{errors.get('department')}</p>}
        
        <button 
          onClick={handleAdd}
          style={{
            padding: '8px 16px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Employee
        </button>
      </div>
      
      {/* Search bar */}
      <p>Please enter employee name or department to search:</p>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          placeholder="Search by name or department"
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
      
      {/* Employee List */}
      <section>
        {departments.map(dept => {
          const deptEmps = employees.filter(e => e.department === dept);
          if (deptEmps.length === 0) return null;
          
          return (
            <div key={dept} className="departments-employees">
              <h4>{dept}</h4>
              <ul>
                {deptEmps.map(emp => <li key={emp.name}>{emp.name}</li>)}
              </ul>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default EmployeeDirectory;