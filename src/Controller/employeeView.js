document.addEventListener('DOMContentLoaded', async () => {
    // Automatically fetch all employees when the page loads
    await fetchAllEmployees();
});

// Function to fetch all employees
async function fetchAllEmployees() {
    try {
        const response = await fetch('http://localhost:3000/employee', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const employees = await response.json();
            displayEmployees(employees); // Call function to update the HTML
        } else {
            console.error('Failed to fetch employees');
        }
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

// Function to update the HTML with employee data
function displayEmployees(employees) {
    const employeeList = document.getElementById('employeeList');

    // Clear the existing content
    employeeList.innerHTML = '';

    // Create HTML content from the employees data
    employees.forEach(employee => {
        const employeeItem = document.createElement('div');
        employeeItem.innerHTML = `
        <ul>
        <li>
            <p><strong>ID:</strong> ${employee.employee_id}</p>
            <p><strong>Name:</strong> ${employee.employee_name}</p>
            <p><strong>Salary:</strong> ${employee.employee_salary}</p>
            <p><strong>Sales:</strong> ${employee.employee_sales}</p>
            <p><strong>Location:</strong> ${employee.employee_location}</p>
            <p><strong>Storage Name:</strong> ${employee.storage_name}</p>
            <p><strong>Product sold:</strong> ${employee.productSold}</p>
            <p><strong>Product amount sold:</strong> ${employee.productAmountSold}</p>
            </li>
            </ul>
            <br>
            <Hr>
            <br>
        `;
        employeeList.appendChild(employeeItem);
    });
}
