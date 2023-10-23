const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL database configuration
const dbConfig = {
  host: 'sql12.freesqldatabase.com',      // Replace with your MySQL server host
  user: 'sql12655207',  // Replace with your MySQL username
  password: 'qnZ9kgYAUm',  // Replace with your MySQL password
  database: 'sql12655207',  // Replace with your MySQL database name
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as ID ' + connection.threadId);
});

// Your Express routes and application logic go here

// Close the MySQL connection when your Express app is finished

process.on('SIGINT', () => {
  connection.end();
  process.exit();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const execute_query = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error);
            reject(error);
            return;
        }
    
        resolve(results);
        });
    });
};

app.get('/get', async(req, res) => {
    const query = 'SELECT * FROM contact_us'; 
    const data= await execute_query(query)
    console.log(data);
    let emails=data.map(item=>item.email)
    console.log(emails);
    res.json(data)
   
});
