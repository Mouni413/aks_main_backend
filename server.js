const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(express.json());
app.use(cors());


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


const getData = (query) => {
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

app.get('/get_contact', async(req, res) => {
    const query = 'SELECT * FROM contact_us'; 
    const data= await getData(query)
    res.json(data)
   
});

app.post('/add_contact', (req, res) => {
  const { name, email,message } = req.body; // Assuming you have a JSON object with the data to insert

  // Insert data into the database
  const insertQuery = 'INSERT INTO contact_us (name, email,message) VALUES (?, ?,?)';
  connection.query(insertQuery, [name, email,message], (err, results) => {
    if (err) {
      console.error('Error executing the insert query:', err);
      res.status(500).json({ error: 'An error occurred while inserting data' });
    } else {
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});
  
