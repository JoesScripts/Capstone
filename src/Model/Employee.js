
import { Storage } from "../Model/Storage.js"

export class Employee extends Storage  {

empName=''
emp_id=null
salary=Number
bonus=Number



constructor(){
    super()


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
setNamess(n,id,sala){
  this.empName=n  
}
getName(){
    return this.empName
}


}