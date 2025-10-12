import { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useEntryForm } from '../hooks/useEntryForm';
import * as EmployeeService from '../services/employeeService';

export function EmployeeDirectory() {
  const { employees, departments, searchTerm, setSearchTerm, fetchEmployees } = useEmployees();
  const form = useEntryForm();
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  
  const handleAdd = async () => {
    const validationErrors = EmployeeService.validateEmployee(form.name, form.selected);
    
    if (validationErrors.size > 0) {
      setErrors(validationErrors);
      return;
    }
    
    await EmployeeService.createEmployee({
      name: form.name,
      department: form.selected
    });
    
    await fetchEmployees();
    form.reset();
    setErrors(new Map());
  };
  
  return (
    <div>
      <h1>Employee Directory</h1>
      
      <input 
        type="text"
        placeholder="Search by name or department"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {departments.map(dept => {
        const deptEmps = employees.filter(e => e.department === dept);
        if (deptEmps.length === 0) return null;
        
        return (
          <div key={dept}>
            <h4>{dept}</h4>
            <ul>
              {deptEmps.map(emp => <li key={emp.name}>{emp.name}</li>)}
            </ul>
          </div>
        );
      })}
      
      <h3>Add New Employee</h3>
      <input 
        type="text"
        placeholder="Employee Name"
        value={form.name}
        onChange={(e) => form.setName(e.target.value)}
      />
      {errors.get('name') && <p style={{color: 'red'}}>{errors.get('name')}</p>}
      
      <select value={form.selected} onChange={(e) => form.setSelected(e.target.value)}>
        <option value="">Select Department</option>
        {departments.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      {errors.get('department') && <p style={{color: 'red'}}>{errors.get('department')}</p>}
      
      <button onClick={handleAdd}>Add Employee</button>
    </div>
  );
}