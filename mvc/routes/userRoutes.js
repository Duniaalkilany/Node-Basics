/*
contain all routes related to one type of resourse (related to blog resourse)
*/
const express = require("express");
//create new express router
console.log(__dirname); //home/dunia/Node.JS/mvc/routes
const router = express.Router(); //this create anew instance of router object
// const UserMosel = require("../models/user"); //.. come out of current folder then to models folder
console.log(router); //function
console.log(typeof router); //function

// const userController = require("../controllers/userController");

const {
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// console.log(controller);
//then attach req handlers to router instead of app
//created new instance of router is mean /like create miny app(but it does not woek stand alone )
//so export router
router.post("/users", addUser);
// router.post("/users", userController.addUser);
router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);
module.exports = router;
