## Project - Win Backend Order Management

## Available Scripts
### Clone the repository `https://github.com/bidyut10/winbackend.git`
In the winbackend directory, you can run:
### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### description
This is a backend project for a service order system. It uses the following technologies:
JavaScript,
Node.js,
Express.js for routing,
MongoDB as the database

The project includes multiple API routes for handling service and order related requests. The service routes allow for creating, reading, while the order routes allow for creating, reading, updating and deleting orders. The project also has a catch-all route for handling requests that do not match any defined routes, which will return a 404 response.

To run the project, you will need to have Node.js and MongoDB installed on your machine. You will also need to set up a MongoDB database and add the connection details to the project's configuration. Once the setup is done, you can start the project by running npm start in the project's root directory.

This project is a basic service order system and can be used as a starting point for building a more complex system.


## FEATTURE I - Service
### Models
- Service Model
```yaml
{ 
  name: {string, mandatory, unique},
  description: {string, mandatory}
  isDeleted: {boolean, default: false},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```

POST /services
This route is used to create a new service. It expects a JSON object in the request body with the following properties:
name: The name of the service.
description: A brief description of the service.

GET /getAllServices
This route is used to retrieve a list of all services. It does not require any request body

### service create response
```yaml
{
  "_id": ObjectId("88abc190ef0288abc190ef88"),
  name: "Win Home Service",
  description: "Awesome Home Service",
  createdAt: "2021-09-17T04:25:07.803Z",
  updatedAt: "2021-09-17T04:25:07.803Z",
}
```





## FEATTURE II - Order
### Models
- Order Model
```yaml
{ 
  services: [{ObjectId, refs to Service, mandatory}],
  address: {string, mandatory},
  orderStatus: {string, default: 'completed', enum[completed, cancled]},
  totalFee: {number, mandatory, default: 100},
  dateTime: {date},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```

POST /orders
This route is used to create a new order. It expects a JSON object in the request body with the following properties:
services: {ObjectId, refs to Service, mandatory},
address: {string, mandatory}

GET /getAllCompletedOrders
This route is used to retrieve a list of all completed orders. It does not require any request body.


GET /getParticularOrder/:orderId
This route is used to retrieve a specific order by its ID. It requires the order ID as a path parameter, for example /getParticularOrder/1 to retrieve the order with ID 1.

PUT /updateOrder/:orderId
This route is used to update an existing order. It expects a JSON object in the request body with the properties to be updated. It requires the order ID as a path parameter, for example /updateOrder/1 to update the order with ID 1.

DELETE /deleteOrder/:orderId
This route is used to delete an existing order. It requires the order ID as a path parameter, for example /deleteOrder/1 to delete the order with ID 1.

### order create response
```yaml
{
  "_id": ObjectId("88abc190ef0288abc190ef88"),
  totalFee: 100,
  address: "Bishnupur",
  services: [ ObjectId("88abc190e45588abc190ef88") ],
  orderStatus: "completed",
  dateTime: "2021-09-17T04:25:07.803Z",
  createdAt: "2021-09-17T04:25:07.803Z",
  updatedAt: "2021-09-17T04:25:07.803Z",
}
```
