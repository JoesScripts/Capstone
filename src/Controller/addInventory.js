document.addEventListener('DOMContentLoaded', () => {
    fetchInventory(); // Fetch company data on load
    document.getElementById('generateReport').addEventListener('click', generateInventoryReport); // Button to generate report
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
async function fetchInventory() {
    try {
        const response = await fetch('http://localhost:3000/inventory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const inventory = await response.json();
            displayInventory(inventory); // Update the HTML with inventory data
            window.inventoryData = inventory; // Store fetched inventory data for later use
        } else {
            console.error('Failed to fetch inventory');
        }
    } catch (error) {
        console.error('Error fetching inventory:', error);
    }
}

// Function to update the HTML with Inventory data
function displayInventory(inventory) {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = ''; // Clear existing content

    // Create HTML content from the inventory data
    inventory.forEach(inventory => {
        // Check if this inventory is expired
        let isExpired = getExpirationDate(inventory.expirationDate);

        const inventoryItem = document.createElement('div');
        inventoryItem.innerHTML = `
        <ul>
        <li>
            <p style="color: red">${isExpired ? '<strong>To expire soon</strong>' : ''}</p>
            <p><strong>ID:</strong> ${inventory.company_id}</p>
            <p><strong>Company Name:</strong> ${inventory.company_name}</p>
            <p><strong>Product:</strong> ${inventory.product_name}</p>
            <p><strong>Storage: </strong> ${inventory.storageName}</p>
            <p><strong>Location:</strong> ${inventory.locationName}</p>
            <p><strong>Storage Address: </strong> ${inventory.locationAddress}</p>
            <p><strong>Facilities:</strong> ${inventory.facilities}</p>
            <p><strong>Expiration date:</strong> ${inventory.expirationDate}</p>
        </li>
        </ul>
        <br>
        <hr>
        <br>
        `;
       
        inventoryList.appendChild(inventoryItem);
    });
}

// Function to generate a CSV file from the data
function generateInventoryReport() {
    if (window.inventoryData && window.inventoryData.length) {
        const csvData = formatInventoryForCSV(window.inventoryData);
        generateCSV(csvData, 'inventory_report.csv'); // Generate CSV
    } else {
        alert('No inventory data available to generate report.');
    }
}

// Function to format Inventory data for CSV
function formatInventoryForCSV(inventory) {
    const csvArray = [];

    // Add header row
    csvArray.push(['ID', 'Name', 'Product' ,'Description', 'Storage', 'Location', 'Address', 'Facilities']);

    // Add company data
    inventory.forEach(inventory => {
        csvArray.push([
            inventory.company_id,
            inventory.company_name,
            inventory.product_name,
            inventory.company_desc,
            inventory.storage_name,
            inventory.locationName,
            inventory.locationAddress,
            inventory.facilities,
        ]);
    });

    return csvArray;
}

// Function to generate a CSV file from the data
function generateCSV(data, filename = 'inventory_report.csv') {
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
