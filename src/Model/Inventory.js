// staff.js

export class Inventory  {

  company_id;
   company_name
  company_desc=[]
  constructor( company_id, company_name,company_desc) {
      this.company_id = company_id;
      this.company_name = company_name;
      this.company_desc =company_desc;
  }

  // Method to interact with the Storage class
  /**
   * @param {any} ci
   */
  set companyId(ci) {
    this.companyId=ci
  }
      /**
   * @param {any} cn
   */
  set companyName(cn) {
      this.company_name=cn
    }    
 
 /**
   * @param {any[]} cd
   */
 set companyDesc(cd) {
      this.company_desc=cd
    }
  // Setters


     // Method to display storage info
     displayInventoryInfo() {
      try {
          if (!this.company_id || !this.company_name ) {
              throw new Error("Inventory details are incomplete.");
          }

          console.log("Company Details:");
          console.log(`Company ID: ${this.company_id}`);
          console.log(`Company Name: ${this.company_name}`);
          console.log(`Description: ${this.company_desc}`);


          //console.log(`Location Address: ${this.company_desc}`);
        
      } catch (error) {
          console.log(`Error: ${error.message}`);
      }
  }

  
  
}