document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employeeForm'); // Ensure the form ID matches

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        // Get values from input
        const employeeName = document.getElementById('employeeName').value;
        const employeeId = parseInt(document.getElementById('employeeId').value);
        const employeeSalary = parseFloat(document.getElementById('employeeSalary').value);
        const employeeSales = parseInt(document.getElementById('employeeSales').value, 10); // Parse as int
        const employeeLocation = document.getElementById('employeeLocation').value;
        const storageName = document.getElementById('storageName').value;
        const productId = document.getElementById('productId').value;
        const companyId = document.getElementById('companyId').value;

   

        // Prepare company data
        const companyData = {
            employeeId: employeeId,
            employeeName: employeeName,
            employeeSalary: employeeSalary, // Use the employeeSalary input
            employeeSales: employeeSales,
            employeeLocation: employeeLocation,
            storageName: storageName,

        };
        // employee_id | product_id | company_id | sale_amount | sale_date           | product_amount | employee_salary | product_price
const saleData={
    
    employee_id:employeeId,
    product_id:productId,
    company_id:companyId,
    sale_amount:0,
   // sale_date,
    product_amount:0,
    employee_salary:employeeSalary,
    product_price:0,







}
        console.log(companyData); // Log the entire companyData object

        // Send data to the database
           await addEmployeeToDb(companyData);
        await postSaleData(saleData)
        // Reset the form after submission
        form.reset();
    });
});

async function addEmployeeToDb(data) {
    try {
        const response = await fetch('http://localhost:3000/employee', { // Ensure the URL matches your server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log('Response status:', response.status); // Log the response status

        const result = await response.json();
        console.log('Response result:', result); // Log the response status

        if (response.ok) {
            alert('Company added successfully: ' + result.id);
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Fetch error:', error); // Log fetch errors
    }
}
async function postSaleData(data) {
    try {
        const response = await fetch('http://localhost:3000/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Sale data posted successfully:', result);
    } catch (error) {
        console.error('Error posting sale data:', error);
    }
}