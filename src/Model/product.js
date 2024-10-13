import { Storage } from '../Model/Storage.js'; // Ensure correct path and file extension

export class Product extends Storage {
    constructor(company_id, company_name,company_desc,storageName, locationName, locationAddress, facilities, productName, productId, productPrice, productAmount) {
        super(company_id, company_name,company_desc,storageName, locationName, locationAddress, facilities); // Initialize base class
        this._productName = productName;
        this._productId = productId;
        this._productPrice = productPrice;
        this._productAmount = productAmount;
    }

    // Setters
    set productName(value) {
        this._productName = value;
    }

    set productId(value) {
        this._productId = value;
    }

    set productPrice(value) {
        this._productPrice = value;
    }

    set productAmount(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Product amount must be a number');
        }
        this._productAmount = value;
    }

    // Getters
    get productName() {
        return this._productName;
    }

    get productId() {
        return this._productId;
    }

    get productPrice() {
        return this._productPrice;
    }

    get productAmount() {
        return this._productAmount;
    }

    // Method to display product info
    displayProductInfo() {
        try {
            if (!this.productName || !this.productId || !this.productPrice) {
                throw new Error("Product details are incomplete.");
            }

            console.log("Product Details:");
            console.log(`Product Name: ${this.productName}`);
            console.log(`Product ID: ${this.productId}`);
            console.log(`Product Price: ${this.productPrice}`);
            console.log(`Product Amount: ${this.productAmount}`);

            // Display storage info using Storage's method
            this.displayStorageInfo();
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }
}
