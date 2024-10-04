document.addEventListener('DOMContentLoaded', async () => {
    // Automatically fetch all employees when the page loads
    await fetchAllEmployees();
});

// Function to fetch all employees
async function fetchAllEmployees() {
    try {
        const response = await fetch('http://localhost:3000/company', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const companys = await response.json();
            displaycompanys(companys); // Call function to update the HTML
        } else {
            console.error('Failed to fetch companys');
        }
    } catch (error) {
        console.error('Error fetching companys:', error);
    }
}

// Function to update the HTML with company data
function displaycompanys(companys) {
    const companyList = document.getElementById('companyList');

    // Clear the existing content
    companyList.innerHTML = '';

    // Create HTML content from the companys data
    companys.forEach(company => {
        const companyItem = document.createElement('div');
        companyItem.innerHTML = `
        <ul>
        <li>
            <p><strong>ID:</strong> ${company.company_id}</p>
            <p><strong>Name:</strong> ${company.company_name}</p>
            <p><strong>Salary: $ </strong> ${company.company_desc}</p>
            <p><strong>Sales: $ </strong> ${company.storage_name}</p>
            <p><strong>Location:</strong> ${company.locationName}</p>
            <p><strong>Storage Name:</strong> ${company.locationAddress}</p>
            <p><strong>Product sold:</strong> ${company.facilities}</p>
            <p><strong>Product amount sold:</strong> ${company.facilities}</p>
            </li>
            </ul>
            <br>
            <Hr>
            <br>
        `;
        employeeList.appendChild(employeeItem);
    });
}