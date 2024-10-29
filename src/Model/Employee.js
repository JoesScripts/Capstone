
import { Storage } from "../Model/Storage.js"

export class Employee extends Storage  {

  empName
  emp_id
  salary
  bonus


constructor(empName, emp_id, salary, bonus, storageName,storageId,storageAddress, locationName, locationAddress, facilities){
    super(storageName,storageId,storageAddress, locationName, locationAddress, facilities)

    empName=''
    emp_id=null
    salary=Number
    bonus=Number
}

setSales(product,location,amount,price){

    var finalPrice=amount*price

return ` The ${amount} products ${product} at ${location}  were sold at ${finalPrice} `
}

setSalary(s){
this.salary=s
}
getSalary(){
  return this.salary  
}
setNames(name){
  this.empName=name  
}
getName(){
    return this.empName
}


}