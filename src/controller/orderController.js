const orderModel = require("../model/orderModel"); //requiring order model
const serviceModel = require("../model/serviceModel");  //requiring service model

//Crate Order Api
const createOrder = async (req, res) => {
  try {
    //retrieve the request body data
    let data = req.body;
    let { services, address } = data; //destructuring

    //body empty
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the data" });
    }
    //serviceId Validation
    if (!/^[0-9a-fA-F]{24}$/.test(services)) {
      return res
        .status(400)
        .send({ status: false, message: "serviceId isn't correct" });
    }

    //Service exist or not
    const serviceExist = await serviceModel.findById(services);
    if (!serviceExist) {
      return res
        .status(404)
        .send({ status: false, message: "No such as services Found" });
    }
    //Address validation
    if (!address || address.trim().length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the Address" });
    }

    //After all validations passed, creating the new service in the database
    let orderCreated = await orderModel.create(data);

    //Returning a 201 success response with the newly created service data
    return res.status(201).send({
      status: true,
      message: "Order Created Successfully",
      Order: orderCreated,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Get All Orders API
const getAllCompletedOrders = async function (req, res) {
  try {
    //checking any completed order is avaialable or not in my db
    const getOrderData = await orderModel.find({
      orderStatus: "completed",
    });

    //if data is not present than give a error msg , if present send the data with 200 status code
    if (getOrderData.length == 0) {
      return res.status(404).send({
        status: false,
        message: "No Orders Currently Available",
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "Completed Order List",
        data: getOrderData,
      });
    }
  } catch (err) {
    {
      res.status(500).send({ status: false, error: err.message });
    }
  }
};


//Update Order API
const getParticularOrder = async function (req, res) {
  try {
    //retrieve the request orderId from params
    let orderId = req.params.orderId;

    //OrderId Validation
    if (!/^[0-9a-fA-F]{24}$/.test(orderId)) {
      return res
        .status(400)
        .send({ status: false, message: "OrderId isn't correct" });
    }
    //checking any data is avaialable or not in my db
    const getUpdateData = await orderModel.findOne({
      _id: orderId,
      orderStatus: "completed",
    });

    // console.log(getUpdateData)

    if (!getUpdateData) {
      return res.status(404).send({
        status: false,
        message: "Order Not Available",
      });
    }

    //After checking all the validation send the data from db
    let getOrderData = await orderModel.findById(
      { _id: orderId }
    );

    {
      return res
        .status(200)
        .send({ status: true, message: "Success", data: getOrderData });
    }
  } catch (err) {
    {
      res.status(500).send({ status: false, error: err.message });
    }
  }
};


//Update Order API
const updateOrder = async function (req, res) {
  try {
    //retrieve the request body data and orderId from params
    let orderId = req.params.orderId;
    let updateAddress = req.body.address;

    //OrderId Validation
    if (!/^[0-9a-fA-F]{24}$/.test(orderId)) {
      return res
        .status(400)
        .send({ status: false, message: "OrderId isn't correct" });
    }
    //checking any data is avaialable or not in my db
    const getUpdateData = await orderModel.findOne({
      _id: orderId,
      orderStatus: "completed",
    });

    // console.log(getUpdateData)

    if (!getUpdateData) {
      return res.status(404).send({
        status: false,
        message: "Order Not Available",
      });
    }
    //Address validation
    if (!updateAddress || updateAddress.trim().length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the Address" });
    }

    //After checking all the validation now update the new data
    let updateOrderData = await orderModel.findOneAndUpdate(
      { _id: orderId },
      {
        $set: {
          address: updateAddress,
        },
      },
      { new: true }
    );

    {
      return res
        .status(200)
        .send({ status: true, message: "Success", data: updateOrderData });
    }
  } catch (err) {
    {
      res.status(500).send({ status: false, error: err.message });
    }
  }
};

const deleteOrder = async function (req, res) {
  try {
    //retrieve the request orderId from Params
    let orderId = req.params.orderId;

    //OrderId Validation
    if (!/^[0-9a-fA-F]{24}$/.test(orderId)) {
      return res
        .status(400)
        .send({ status: false, message: "OrderId isn't correct" });
    }

    //order is already canceled or not
    const orderData = await orderModel.findOne({
      _id: orderId,
      orderStatus: "completed",
    });

    if (!orderData) {
      return res.status(404).send({
        status: false,
        message: "Order Not Available",
      });
    }

    //after checking all the validations now we just update the orderStatus feild
    let deleteOrder = await orderModel.findOneAndUpdate(
      { _id: orderId },
      {
        $set: {
          orderStatus: "canceled",
        },
      },
      { new: true }
    );

    {
      return res
        .status(200)
        .send({ status: true, message: "Order Canceled Successfully" });
    }
  } catch (err) {
    {
      res.status(500).send({ status: false, error: err.message });
    }
  }
};

module.exports = {
  createOrder,
  getAllCompletedOrders,
  getParticularOrder,
  updateOrder,
  deleteOrder,
};
