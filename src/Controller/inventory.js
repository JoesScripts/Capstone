import { Inventory } from "../Model/Inventory.js";
import { Product } from "../Model/Product.js";
import { Storage } from "../Model/Storage.js";

document.addEventListener('DOMContentLoaded', () => {
    const inventory= new Inventory()
    const product= new Product()
    const storage= new Storage()
    const form = document.getElementById('companyForm'); // Ensure the form ID matches

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        // Get values from input
        const companyName = document.getElementById('companyName').value;
        inventory.setCompanyName(companyName)
        const companyId = document.getElementById('companyId').value;
        inventory.setCompanyId(companyId)
        const storageName = document.getElementById('storageName').value;
        storage.setStorageName(storageName)
        // !todo    const storageId = document.getElementById('storageId').value;
        // !todo    storage.setStorageId(storageId)
        const storageAddress = document.getElementById('storageAddress').value;
        const storageFacilities = parseInt(document.getElementById('storageFacilities').value, 10); // Parse as int
        const productName = document.getElementById('productName').value;
        const productId = parseInt(document.getElementById('productId').value, 10); // Parse as int
        product.setProductId(productId)
        const productPrice = parseFloat(document.getElementById('productPrice').value); // Parse as float
        product.setProductPrice(productPrice)
        const productAmount = parseInt(document.getElementById('productAmount').value, 10); // Parse as int
        const expirationDate = document.getElementById('expirationDate').value

        // Prepare company data
        const companyData = {
            company_id: inventory.getCompanyId(),
            company_name: inventory.getCompanyName(),
            company_desc: "A company for testing.",
            storageName: storage.getStorageName(),
            locationName: "Tampa",
            locationAddress: storageAddress, // Use the storageAddress input
            facilities: storageFacilities,
            productId: product.getProductId(),
            productName: productName,
            productPrice: product.getProductPrice(),
            productAmount: productAmount,
            expirationDate: expirationDate
        };

        console.log(inventory)

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
