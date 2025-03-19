const express = require("express");
const Shippers = require("./knexcrud.js");

const server = express();
server.use(express.json());

//Define our routes

server.get("/shippers", async (req, res) => {
  try {
    const shippers = await Shippers.getAllShippers();
    res.json(shippers);
  } catch (error) {
    res.status(500).json({message: "Failed to get shippers", error});
  }
  
});

server.get("/shippers/:id", async (req, res) => {
  const shipper = await Shippers.getShipperByID(req.params.id)
  res.json(shipper);
});

server.post("/shippers", async (req, res) => {
  const newShipper = await Shippers.createShipper(req.body);
  res.status(201).json(newShipper);
});

server.put("/shippers/:id", async (req, res) => {
  const updateShipper = await Shippers.updateShipper(req.params.id, req.body);
  res.json(updateShipper);
});

server.delete("/shippers/:id", async (req, res) => {
  await Shippers.deleteShipper(req.params.id);
  res.status(204).end();
});



const PORT = process.env.PORT || 9000

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`)
})
