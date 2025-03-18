const sqlite3 = require("sqlite3").verbose();

//connect to the database

let db = new sqlite3.Database(
	"./data/northwind.db3",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log("connection established");
	}
);

//Create insert for a new customer
function createCustomer() {
	const sql = `INSERT INTO customers (customerID, CustomerName, ContactName, Address, City, PostalCode, Country) VALUES (?, ?, ?, ?, ?, ?, ?)`;
	db.run(
		sql,
		[92, "BloomTech", "Derek", "ab.TN 68", "37618", "US"],
		function (err) {
			if (err) {
				return console.error(err.message);
			}
			console.log(`Customer created with id: ${this.lastID}`);
		}
	);
}

//Read function with a limit of 5
function readCustomers() {
	const sql = `SELECT * FROM customers LIMIT 5`;
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		console.log("Customer List:");
		console.table(rows);
	});
}

//Update customer
function updateCustomer() {
    const sql = `UPDATE customers SET address = ?, City = ?, PostalCode = ? WHERE CustomerID = ?`
    db.run(sql, ['ul. Filtrowa 70', 'Warsaw', '02-345', 91], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Updated ${this.changes} record(s).`);
    });
}

//Delete a record
function deleteCustomer() {
    const sql = `DELETE FROM customers WHERE CustomerID = ?`;
    db.run(sql, [90], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Deleted ${this.changes} record(s)`);
    });

}

//Run CRUD Operations
createCustomer();
setTimeout(readCustomers, 1000);
setTimeout(updateCustomer, 2000);
setTimeout(deleteCustomer, 3000);
