import { Inventory } from "../Model/Inventory.js";

export class Storage extends Inventory {
    constructor(company_id, company_name,company_desc,storageName,storageId,storageAddress, locationName, locationAddress, facilities) {
        super( company_id, company_name,company_desc)
        this._storageName = storageName;
        this._storageId=storageId;
        this._storageAddress=storageAddress;
        this._locationName = locationName;
        this._locationAddress = locationAddress;
        this._facilities = facilities;
        
    }

    // Setters
    setStorageName(value) {
        this._storageName = value;
    }
    setStorageId(value) {
        this._storageId = value;
    }
    setStorageAddress(value) {
        this._storageAddress = value;
    }
    setLocationName(value) {
        this._locationName = value;
    }

    setLocationAddress(value) {
        this._locationAddress = value;
    }

    setFacilities(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Facilities must be a number');
        }
        this._facilities = value;
    }

    // Getters
    getStorageName() {
        return this._storageName;
    }
    getStorageId() {
        return this._storageName;
    }
    getStorageAddress() {
        return this._storageAddress;
    }
    getLocationName() {
        return this._locationName;
    }

    getLocationAddress() {
        return this._locationAddress;
    }

    getFacilities() {
        return this._facilities;
    }

    // Method to display storage info
    displayStorageInfo() {
        try {
            if (!this._storageName || !this._locationName || !this._locationAddress) {
                throw new Error("Storage details are incomplete.");
            }

            console.log("Storage Details:");
            console.log(`Storage Name: ${this._storageName}`);
            console.log(`Location Name: ${this._locationName}`);
            console.log(`Location Address: ${this._locationAddress}`);
            console.log(`Number of Facilities: ${this._facilities}`);
            this.displayInventoryInfo()
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }
}