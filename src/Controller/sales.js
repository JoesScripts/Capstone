import { Product } from "../Model/Product";

const prod = new Product()
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('salesForm'); // Ensure the form ID matches

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        // Get values from input
        const productId = document.getElementById('productId').value;
        const productAmount = parseInt(document.getElementById('productAmount').value);
        const retailerPrice = parseFloat(document.getElementById('retailerPrice').value);
        const employee_id = parseInt(document.getElementById('salesPerson').value); // Parse as int
        const employeeLocation = document.getElementById('employeeLocation').value;
        const storageId = document.getElementById('storageId').value;

        // | sale_id | employee_id | product_id | company_id | sale_amount | sale_date 
        // | product_amount | employee_salary | product_price |


        // Update product and handle the response
        await productUpdate(productAmount,retailerPrice, employee_id,productId);
        await salesUpdate(productAmount,retailerPrice, employee_id,productId)
        // Reset the form after submission
        form.reset(productAmount,retailerPrice, employee_id,productId);
    });
});

function Bonus_calculation(prod_amount,marketPrice, ret_price) {
    
    return prod_amount *(ret_price-marketPrice)*0.03//

}

async function productUpdate(productAmount,retailerPrice, employee_id,productId) {
    try {
        // Step 1: Fetch the current salary and sales
        const currentEmployee = await fetch(`http://localhost:3000/employee/${employee_id}`);
        const empData = await currentEmployee.json();

        if (!currentEmployee.ok) {
            throw new Error(empData.error || 'Failed to fetch current employee data');
        }
        // Step 2: Fetch the current product
        const currentProduct = await fetch(`http://localhost:3000/product/${productId}`);
        const prodData = await currentProduct.json();

        if (!currentProduct.ok) {
            throw new Error(currentData.error || 'Failed to fetch current employee data');
        }
        const currentSalary = parseFloat(empData.employee_salary) || 0; // Default to 0 if undefined
        const currentSales = parseFloat(empData.employee_sales) || 0; // Default to 0 if undefined
        const marketPrice = parseFloat(prodData.product_price) || 0; // Default to 0 if undefined
        console.log("Current Sales:", currentSales);
        console.log("Current Salary:", currentSalary);
        console.log("Current product price:", marketPrice);

        // Step 2: Calculate new salary and sales

       const bonus=  Bonus_calculation(productAmount,marketPrice,retailerPrice)

        const updateData = {
            employeeSalary: currentSalary+bonus ,
            employeeSales: currentSales+bonus  // Add bonus to current sales
        };
        console.log("UPDATED DATA:", updateData);

        // Step 3: Update the employee's salary and sales
        const updateResponse = await fetch(`http://localhost:3000/employee/${employee_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        const result = await updateResponse.json();

        if (updateResponse.ok) {
            alert('Employee salary and sales updated successfully');
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred: ' + error.message);
    }
}
async function salesUpdate(productAmount,retailerPrice, employee_id,productId) {
    try {
        // Step 1: Fetch the current salary and sales
        const currentSale = await fetch(`http://localhost:3000/employee/${employee_id}`);
        const empData = await currentSale.json();

        if (!currentSale.ok) {
            throw new Error(empData.error || 'Failed to fetch current employee data');
        }
        // Step 2: Fetch the current product
        const currentProduct = await fetch(`http://localhost:3000/product/${productId}`);
        const prodData = await currentProduct.json();

        if (!currentProduct.ok) {
            throw new Error(currentData.error || 'Failed to fetch current employee data');
        }
        const currentSalary = parseFloat(empData.employee_salary) || 0; // Default to 0 if undefined
        const currentSales = parseFloat(empData.employee_sales) || 0; // Default to 0 if undefined
        const marketPrice = parseFloat(prodData.product_price) || 0; // Default to 0 if undefined

        console.log("Current Sales:", currentSales);
        console.log("Current Salary:", currentSalary);
        console.log("Current product price:", marketPrice);
        // Step 2: Calculate new salary and sales

       const bonus=  Bonus_calculation(productAmount,marketPrice,retailerPrice)

        const updateData = {
            employeeSalary: currentSalary+bonus ,
            employeeSales: currentSales+bonus  // Add bonus to current sales
        };
        console.log("UPDATED DATA:", updateData);

        // Step 3: Update the employee's salary and sales
        const updateResponse = await fetch(`http://localhost:3000/sales/${employee_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        const result = await updateResponse.json();
        console.log("THE RESULT",result)
        if (updateResponse.ok) {
            alert('Employee salary and sales updated successfully');
        } else {
            console.log('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred: ' + error.message);
    }
}