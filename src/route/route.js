//Importing the express module and creating a router instance to handle routing
const express = require("express");
const router = express.Router();

//Importing the serviceController and orderController modules for handling service and order related requests
const serviceController = require("../controller/serviceController");
const orderController = require("../controller/orderController");

//Service Api routes
router.post("/services", serviceController.createServices);
router.get("/getAllServices", serviceController.getAllServices);

//Order Api routes
router.post("/orders", orderController.createOrder);
router.get("/getAllCompletedOrders", orderController.getAllCompletedOrders);
router.get("/getParticularOrder/:orderId", orderController.getParticularOrder);
router.put("/updateOrder/:orderId", orderController.updateOrder);
router.delete("/deleteOrder/:orderId", orderController.deleteOrder);

//Setting up a catch-all route to handle requests that do not match any defined routes and return a 404 response
router.all("/****", function (req, res) {
  return res.status(404).send({ status: false, msg: "Endpoint Not Found" });
});

//Exporting the router module for use in the main app
module.exports = router; 
