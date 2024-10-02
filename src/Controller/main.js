document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('companyForm'); // Ensure the form ID matches

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        // Get values from input
        const companyName = document.getElementById('companyName').value;
        const companyId = document.getElementById('companyId').value;
        const storageName = document.getElementById('storageName').value;
        const storageId = document.getElementById('storageId').value;
        const storageAddress = document.getElementById('storageAddress').value;
        const storageFacilities = parseInt(document.getElementById('storageFacilities').value, 10); // Parse as int
        const productName = document.getElementById('productName').value;
        const productId = parseInt(document.getElementById('productId').value, 10); // Parse as int
        const productPrice = parseFloat(document.getElementById('productPrice').value); // Parse as float
        const productAmount = parseInt(document.getElementById('productAmount').value, 10); // Parse as int
        const expirationDate = document.getElementById('expirationDate').value

        // Prepare company data
        const companyData = {
            company_id: companyId,
            company_name: companyName,
            company_desc: "A company for testing.",
            storageName: storageName,
            locationName: "Tampa",
            locationAddress: storageAddress, // Use the storageAddress input
            facilities: storageFacilities,
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            productAmount: productAmount,
            expirationDate: expirationDate
        };

        console.log(companyData); // Log the entire companyData object

        // Send data to the database
        await toDataBase(companyData);
        
        // Reset the form after submission
        form.reset();
    });
});

async function toDataBase(data) {
    try {
        const response = await fetch('http://localhost:3000/company', { // Ensure the URL matches your server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log('Response status:', response.status); // Log the response status

        const result = await response.json();
        
        if (response.ok) {
            alert('Company added successfully: ' + result.id);
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Fetch error:', error); // Log fetch errors
    }
}
