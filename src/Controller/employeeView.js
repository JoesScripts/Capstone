document.addEventListener('DOMContentLoaded', () => {
    fetchAllSales(); // Fetch sales data on load
    document.getElementById('generateReport').addEventListener('click', generateSalesReport); // Button to generate report
});

// Function to fetch all sales
async function fetchAllSales() {
    try {
        const response = await fetch('http://localhost:3000/sales', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const sales = await response.json();
            displaySales(sales); // Update the HTML with sales data
            window.salesData = sales; // Store fetched sales data for later use
        } else {
            console.error('Failed to fetch sales');
        }
    } catch (error) {
        console.error('Error fetching sales:', error);
    }
}

// Function to update the HTML with sales data
function displaySales(sales) {
    const saleList = document.getElementById('salesList');
    saleList.innerHTML = ''; // Clear existing content

    // Create HTML content from the sales data
    sales.forEach(sale => {
        const saleItem = document.createElement('div');
        saleItem.innerHTML = `
            <ul>
                <li>
                    <p><strong>Employee ID:</strong> ${sale.employee_id}</p>
                    <p><strong>Product ID:</strong> ${sale.product_id}</p>
                    <p><strong>Company ID:</strong> ${sale.company_id}</p>
                    <p><strong>Date Sold:</strong> ${sale.sale_date}</p>
                    <p><strong>Sale Amount:</strong> $${sale.sale_amount}</p>
                    <p><strong>Employee Salary:</strong> $${sale.employee_salary}</p>
                    <p><strong>Sale ID:</strong> ${sale.sale_id}</p>
                    <p><strong>Product Amount:</strong> ${sale.product_amount}</p>
                </li>
            </ul>
            <br>
            <hr>
            <br>
        `;
        saleList.appendChild(saleItem);
    });
}

// Function to generate a CSV file from the data
function generateSalesReport() {
    if (window.salesData && window.salesData.length) {
        const csvData = formatSalesForCSV(window.salesData);
        generateCSV(csvData, 'sales_report.csv'); // Generate CSV
    } else {
        alert('No sales data available to generate report.');
    }
}

// Function to format sales data for CSV
function formatSalesForCSV(sales) {
    const csvArray = [];

    // Add header row
    csvArray.push(['Employee ID', 'Product ID', 'Company ID', 'Date Sold', 'Sale Amount', 'Employee Salary', 'Sale ID', 'Product Amount']);

    // Add sales data
    sales.forEach(sale => {
        csvArray.push([
            sale.employee_id,
            sale.product_id,
            sale.company_id,
            sale.sale_date,
            sale.sale_amount,
            sale.employee_salary,
            sale.sale_id,
            sale.product_amount
        ]);
    });

    return csvArray;
}

// Function to generate a CSV file from the data
function generateCSV(data, filename = 'sales_report.csv') {
    // Check if data is a two-dimensional array
    if (!Array.isArray(data) || !data.every(Array.isArray)) {
        console.error('Invalid data format for CSV:', data); // Debugging
        throw new TypeError('Data should be a two-dimensional array.');
    }

    // Convert the data array into a CSV string
    const csvContent = data.map(row => row.join(',')).join('\n');

    // Create a Blob object with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link element
    const link = document.createElement('a');
    
    // Create a URL for the Blob and set it as the href attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    // Set the download attribute with the specified filename
    link.setAttribute('download', filename);
    
    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Clean up by removing the link element
    document.body.removeChild(link);
}