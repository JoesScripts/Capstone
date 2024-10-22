document.addEventListener('DOMContentLoaded', () => {
    fetchAllEmployees(); // Fetch company data on load
    document.getElementById('generateReport').addEventListener('click', generateCompanyReport); // Button to generate report
});

function getExpirationDate(exp) {
    // Expiration date set by the user
    let expirationDate = exp;
    // Real month now
    let monthNow = new Date().getMonth() + 1;
    // Real year now
    let yearNow = new Date().getFullYear();

    // Amount of months left to expire
    let expirationWindow = 3;

    // Removal of / and set to an array => ["07","22","2024"]
    const strNew = expirationDate.split("-");

    // Extracting the value of the position in array where month and year are
    let month = parseInt(strNew[1]);
    let year = parseInt(strNew[0]);

    // Compare expiring year with current year && 3 months left to match expiration month
    return year == yearNow && month + expirationWindow >= monthNow;
}

// Function to fetch all employees (company data in this context)
async function fetchAllEmployees() {
    try {
        const response = await fetch('http://localhost:3000/company', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const company = await response.json();
            displayCompany(company); // Update the HTML with company data
            window.companyData = company; // Store fetched company data for later use
        } else {
            console.error('Failed to fetch company');
        }
    } catch (error) {
        console.error('Error fetching company:', error);
    }
}

// Fetch all products
async function fetchAllProducts() {
    try {
        const response = await fetch('http://localhost:3000/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const product = await response.json();
            return product;
        } else {
            console.error('Failed to fetch product');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}
const product = fetchAllProducts();
console.log(product);

// Function to update the HTML with company data
function displayCompany(company) {
    const companyList = document.getElementById('companyList');
    companyList.innerHTML = ''; // Clear existing content

    // Create HTML content from the company data
    company.forEach(company => {
        // Check if this company is expired
        let isExpired = getExpirationDate(company.expirationDate);

        const companyItem = document.createElement('div');
        companyItem.innerHTML = `
        <ul>
        <li>
            <p style="color: red">${isExpired ? '<strong>To expire soon</strong>' : ''}</p>
            <p><strong>ID:</strong> ${company.company_id}</p>
            <p><strong>Company Name:</strong> ${company.company_name}</p>
            <p><strong>Product:</strong> ${product}</p>
            <p><strong>Storage: </strong> ${company.storageName}</p>
            <p><strong>Location:</strong> ${company.locationName}</p>
            <p><strong>Storage Address: </strong> ${company.locationAddress}</p>
            <p><strong>Facilities:</strong> ${company.facilities}</p>
            <p><strong>Expiration date:</strong> ${company.expirationDate}</p>
        </li>
        </ul>
        <br>
        <hr>
        <br>
        `;
       
        companyList.appendChild(companyItem);
    });
}

// Function to generate a CSV file from the data
function generateCompanyReport() {
    if (window.companyData && window.companyData.length) {
        const csvData = formatCompanyForCSV(window.companyData);
        generateCSV(csvData, 'company_report.csv'); // Generate CSV
    } else {
        alert('No company data available to generate report.');
    }
}

// Function to format company data for CSV
function formatCompanyForCSV(company) {
    const csvArray = [];

    // Add header row
    csvArray.push(['Company ID', 'Company Name', 'Description', 'Storage Name', 'Location Name', 'Location Address', 'Facilities']);

    // Add company data
    company.forEach(company => {
        csvArray.push([
            company.company_id,
            company.company_name,
            company.company_desc,
            company.storage_name,
            company.locationName,
            company.locationAddress,
            company.facilities,
        ]);
    });

    return csvArray;
}

// Function to generate a CSV file from the data
function generateCSV(data, filename = 'company_report.csv') {
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
