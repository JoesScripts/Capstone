document.addEventListener('DOMContentLoaded', () => {
    fetchAllEmployees(); // Fetch company data on load
    document.getElementById('generateReport').addEventListener('click', generateCompanyReport); // Button to generate report
});

// Function to fetch all company
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

// fetch all products
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
            return product
        } else {
            console.error('Failed to fetch product');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}
const product=fetchAllProducts()
console.log(product)

// Function to update the HTML with company data
function displayCompany(company) {
    const companyList = document.getElementById('companyList');
    companyList.innerHTML = ''; // Clear existing content

    // Create HTML content from the company data
    company.forEach(company => { console.log(company)
        const companyItem = document.createElement('div');
        companyItem.innerHTML = `
        <ul>
        <li>
            <p><strong>ID:</strong> ${company.company_id}</p>
            <p><strong>Company Name:</strong> ${company.company_name}</p>
            <p><strong>Product:</strong> ${product}</p>
            <p><strong>Storage: </strong> ${company.storageName}</p>
            <p><strong>Location:</strong> ${company.locationName}</p>
            <p><strong>Storage Address: </strong> ${company.locationAddress}</p>
            <p><strong>Product sold:</strong> ${company.facilities}</p>
            </li>
            </ul>
            <br>
            <Hr>
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