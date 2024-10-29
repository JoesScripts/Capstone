import { Storage } from '../Model/Storage.js'; // Ensure correct path and file extension

export class Product extends Storage {
    constructor(company_id, company_name,company_desc,storageName, locationName, locationAddress, facilities, productName, productId, productPrice, productAmount) {
        super(company_id, company_name,company_desc,storageName, locationName, locationAddress, facilities); // Initialize base class
        this._productName = productName;
        this._productId = productId;
        this._productPrice = productPrice;
        this._productAmount = productAmount;
        this._productExpirationDate="";
    }

    // Setters
    setProductName(value) {
        if(value){
        this._productName = value;
        }
    }

    setProductId(value) {
        if(value){

        this._productId = value;
        }
    }

    setProductPrice(value) {
        if(value){

        this._productPrice = value;
        }
    }

    setProductAmount(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Product amount must be a number');
        }
        this._productAmount = value;
    }
    /**
     * @param {any} value
     */
    setProductExpirationDate(value) {
      if(value){
        this._productExpirationDate = value;
      }
    }
    // Getters
    getProductName() {
        return this._productName;
    }

    getProductId() {
        return this._productId;
    }

    getProductPrice() {
        return this._productPrice;
    }

    getProductAmount() {
        return this._productAmount;
    }
    getProductExpirationDate() {
        return this.__productExpirationDate;
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