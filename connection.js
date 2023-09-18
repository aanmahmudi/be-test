const Pool = require('pg').Pool

// Create a new PostgreSQL client
const pool = new Pool({
  user: 'aan',
  host: 'localhost', // Change to your PostgreSQL server's host
  database: 'mydb',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool