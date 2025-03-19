const db = require("./data/db-config");

function getAllShippers() {
    return db("shippers");
}



//Fetch by ID
function getShipperByID(id) {
    return db('shippers').where("shipperid", id).first(); //SELECT * FROM shippers WHERE shipper = id;
}


//Insert a new record
async function createShipper(shipper) {
    const [id] = await db("shippers").insert(shipper);
    return getShipperByID(id);
}



//Update a record
async function updateShipper (id, changes) {
    await db("shippers").where("shipperid", id).update(changes);
    return getShipperByID(id);
}

//Delete
async function deleteShipper(id) {
    return db("shippers").where("shipperid", id).del();
}

module.exports = {
    getAllShippers,
    getShipperByID,
    createShipper,
    updateShipper,
    deleteShipper
};