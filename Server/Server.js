import express from 'express';
import mysql from 'mysql2/promise'; // Use the promise-based version
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.get('/sales', async (req, res) => {
  try {
    // Retrieve all users from the database
    const [sales] = await pool.query('SELECT * FROM sales');
    
    res.status(200).json(sales);
  } catch (err) {
    console.error('Error fetching sales:', err);
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});
// GET users
app.get('/users', async (req, res) => {
  try {
    // Retrieve all employees from the database
    const [users] = await pool.query('SELECT * FROM users');
    
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get all products
app.get('/product', async (req, res) => {
  try {
    // Retrieve all users from the database
    const [product] = await pool.query('SELECT * FROM product');
    
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});


// Get all employees
app.get('/employee', async (req, res) => {
  try {
    // Retrieve all employees from the database
    const [employees] = await pool.query('SELECT * FROM employee');
    
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});
app.get('/company', async (req, res) => {
  try {
    // Retrieve all employees from the database
    const [company] = await pool.query('SELECT * FROM company');
    
    res.status(200).json(company);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// Get employee by ID
app.get('/employee/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve a single employee by ID
    const [employee] = await pool.query('SELECT * FROM employee WHERE employee_id = ?', [id]);

    if (employee.length > 0) {
      res.status(200).json(employee[0]);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});
app.get('/product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve a single employee by ID
    const [product] = await pool.query('SELECT * FROM product WHERE product_id = ?', [id]);

    if (product.length > 0) {
      res.status(200).json(product[0]);
    } else {
      res.status(404).json({ error: 'product not found' });
    }
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'joseph123', // Ensure this is correct
  database: 'ims'
});

// POST endpoint to insert a new Company
app.post('/company', async (req, res) => {
  console.log('Received data:', req.body);

  const {
    company_id,
    company_name,
    company_desc,
    storageName,
    locationName,
    locationAddress,
    facilities,
    productName,
    productId,
    productPrice,
    productAmount,
    expirationDate
  } = req.body;

  try {
    // Check if the company already exists
    const [existingCompany] = await pool.query('SELECT * FROM company WHERE company_id = ?', [company_id]);

    // Make sure to check if existingCompany is not empty
    if (existingCompany.length > 0) {
      res.status(200).json({ message: 'Company already exists, stock updated if applicable.' });
    } else {
      // Insert new company
      const [results] = await pool.query(
        'INSERT INTO company (company_id, company_name, company_desc, storageName, locationName, locationAddress, facilities, expirationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [company_id, company_name, company_desc, storageName, locationName, locationAddress, facilities, expirationDate]
      );

      // Insert product information if provided
      if (productId && productName && productPrice !== undefined && productAmount !== undefined) {
        await pool.query(
          'INSERT INTO product (product_id, product_name, product_price, product_amount, company_id) VALUES (?, ?, ?, ?, ?)',
          [productId, productName, productPrice, productAmount, company_id]
        );
      } else {
        console.log('Product details are missing or invalid.');
      }

      // Send back the inserted dataproduct
      const insertedData = {
        id: results.insertId,
        company_id,
        company_name,
        company_desc,
        storageName,
        locationName,
        locationAddress,
        facilities,
        productName,
        productId,
        productPrice,
        productAmount,
        expirationDate
      };

      res.status(201).json(insertedData);
      console.log('Inserted data:', insertedData);
    }
  } catch (err) {
    console.error('Error handling Company submission:', err.message); // More detailed error message
    res.status(500).json({ error: 'Failed to handle Company submission', details: err.message });
  }
});

app.post('/employee', async (req, res) => {
  const {
    employeeId,
    employeeName,
    employeeSalary,
    employeeSales,
    employeeLocation,
    storageName,
  
  } = req.body;

  try {
    // Insert employee into the database
    const [result] = await pool.query(
      'INSERT INTO employee (employee_id, employee_name, employee_salary, employee_sales, employee_location, storage_name) VALUES (?, ?, ?, ?, ?, ?)',
      [employeeId, employeeName, employeeSalary, employeeSales, employeeLocation, storageName]
    );

    res.status(201).json({ message: 'Employee added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

app.post('/sales', async (req, res) => {
  const {
     sale_id,
employee_id,
product_id,
company_id,
sale_amount,
product_amount,
employee_salary,
product_price,

  
  } = req.body;

  try {
    // Insert employee into the database
    const [result] = await pool.query(
      `INSERT INTO sales (

employee_id,
product_id,
company_id,
sale_amount,
product_amount,
employee_salary,
product_price) VALUES ( ?, ?, ?, ?, ?,?,?)`,
      [    
        employee_id,
        product_id,
        company_id,
        sale_amount,
        //sale_date,
        product_amount,
        employee_salary,
        product_price]
    );

    res.status(201).json({ message: 'Sale added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding Sale:', err);
    res.status(500).json({ error: 'Failed to add Sale' });
  }
});

// POST to users
app.post('/users', async (req, res) => {
  const {
    name,
    email,
    password

  
  } = req.body;

  try {
    // Insert users into the database
    const [result] = await pool.query(
      `INSERT INTO users (

        name,
        email,
        password) VALUES ( ?, ?, ?)`,
      [    
        name,
        email,
        password]
    );

    res.status(201).json({ message: 'User added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

app.put('/employee/:id', async (req, res) => {
  const employeeId = req.params.id; // Get the employee ID from the URL
  const { employeeSalary,employeeSales } = req.body; // Get the new salary from the request body
  console.log("EL SLARIO"+employeeSalary)
  try {
    // Update the employee's salary in the database
    const [result] = await pool.query(

      'UPDATE employee SET employee_salary= ?,employee_sales = ? WHERE employee_id = ?',
      [employeeSalary,employeeSales, employeeId]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Employee salary updated successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error('Error updating employee salary:', err);
    res.status(500).json({ error: 'Failed to update employee salary' });
  }
});
app.put('/sales/:id', async (req, res) => {
  const employeeId = req.params.id; // Get the employee ID from the URL
  const { employeeSalary,employeeSales } = req.body; // Get the new salary from the request body
  console.log("The salary after the sale"+employeeSalary)
  try {
    // Update the employee's salary in the database
    const [result] = await pool.query(

      'UPDATE sales SET employee_salary= ?,sale_amount= ? WHERE employee_id = ?',
      [employeeSalary,employeeSales, employeeId]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Employee salary updated successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    console.error('Error updating employee salary:', err);
    res.status(500).json({ error: 'Failed to update employee salary' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
