document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('salesForm'); // Ensure the form ID matches

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        // Get values from input
        const productId = document.getElementById('productId').value;
        const productAmount = parseInt(document.getElementById('productAmount').value);
        const retailerPrice = parseFloat(document.getElementById('retailerPrice').value);
        const salesPerson = document.getElementById('salesPerson').value; // Parse as int
        const employeeLocation = document.getElementById('employeeLocation').value;
        const storageId = document.getElementById('storageId').value;

        const productData = {
            product_amount: productAmount, // Ensure the key matches
        };
        
        console.log("Product Data to Send:", productData); // Log the data before sending
        
        await productUpdate(productData, productId);
        // Send data to the database
          await toDataBase(companyData);
          console.log(Bonus_calculation(productAmount,retailerPrice))

        // Reset the form after submission
        form.reset();
    });
});

function Bonus_calculation (prod_amount,ret_price){

    return prod_amount*ret_price

}

async function product_reduction(prod_total,prod_amount){



}
async function productUpdate(data, productId) {
    try {
        console.log("Sending Product Data:", JSON.stringify(data)); // Log data

        const response = await fetch(`http://localhost:3000/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Response result:', result);

        if (response.ok) {
            alert('Product updated successfully');
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}