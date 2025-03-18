const sqlite3 = require('sqlite3').verbose();

//connect to the database
let db = new sqlite3.Database('./data/northwind.db3', sqlite3.OPEN_READWRIT, (err) => {
  if (err) {
    return console.error(err.message);
  }  
  console.log('Connected to Northwind Database')
})

//Run a quary
db.all("SELECT * FROM customers", [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log(rows);
});

//Close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database connection is closed');
});