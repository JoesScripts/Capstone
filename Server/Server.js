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

      // Send back the inserted data
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
    productSold,
    productAmountSold
  } = req.body;

  try {
    // Insert employee into the database
    const [result] = await pool.query(
      'INSERT INTO employee (employee_id, employee_name, employee_salary, employee_sales, employee_location, storage_name, productSold, productAmountSold) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [employeeId, employeeName, employeeSalary, employeeSales, employeeLocation, storageName, productSold, productAmountSold]
    );

    res.status(201).json({ message: 'Employee added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
