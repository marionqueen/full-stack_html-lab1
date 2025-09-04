// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load and display employees
    loadEmployees();
});

async function loadEmployees() {
    try {
        const response = await fetch('employees.json');
        const data = await response.json();
        
        const main = document.querySelector('main');
        const employeeSection = document.createElement('section');
        
        // Create department sections
        for (const [department, employees] of Object.entries(data.departments)) {
            const departmentDiv = document.createElement('div');
            departmentDiv.className = 'departments-employees';
            
            // Department heading
            const heading = document.createElement('h4');
            heading.textContent = department;
            departmentDiv.appendChild(heading);
            
            // Employee list
            const employeeList = document.createElement('ul');
            employees.forEach(employee => {
                const listItem = document.createElement('li');
                listItem.textContent = employee;
                employeeList.appendChild(listItem);
            });
            
            departmentDiv.appendChild(employeeList);
            employeeSection.appendChild(departmentDiv);
        }
        
        main.appendChild(employeeSection);
    } catch (error) {
        console.error('Error loading employees:', error);
    }
}