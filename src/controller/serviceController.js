const serviceModel = require("../model/serviceModel"); //requiring model

//Crate Service API
const createServices = async (req, res) => {
  try {
    //retrieve the request body data
    let data = req.body;
    let { name, description } = data; //destructureing

    //body empty or not
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "Provide the Product's Data",
      });
    }

    //Service name validation
    if (!name || name.trim().length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Provide the Service Name " });
    }
    //checking name type via regex
    if (!name.match(/^[a-zA-Z. ]+$/)) {
      return res
        .status(400)
        .send({ status: false, message: "Services only in Alphabets" });
    }

    //checking name should be unique
    let checkService = await serviceModel.findOne({ name: name });
    if (checkService) {
      return res.status(400).send({
        status: false,
        message: `This ${name} Service is Already Present`,
      });
    }

    //description validation
    if (!description || description.trim().length == 0) {
      return res.status(400).send({
        status: false,
        message: "Please Write Description About Product",
      });
    }

    //after checking all the validation, creating the service data
    const createService = await serviceModel.create(data);
    return res.status(201).send({
      status: true,
      message: "Service is Created Successfully",
      data: createService,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};



//Get All Services API
const getAllServices = async function (req, res) {
  try {
    
    //try to findout service data avaialable or not in my db
    const getServiceData = await serviceModel.find({
      isDeleted: false,
    });

    if (getServiceData.length == 0) {
      return res.status(404).send({
        status: false,
        message: "No Services Currently Available",
      });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "Service List", data: getServiceData });
    }
  } catch (err) {
    {
      res.status(500).send({ status: false, error: err.message });
    }
  }
};

module.exports = { createServices, getAllServices };
