//here all of user referance/route handler functions
const UserModel = require("../models/user");
const getUsers = (req, res) => {
  UserModel.find()
    .then((resullt) => {
      res.send(resullt);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addUser = (req, res) => {
  const body = req.body; //{}
  UserModel.create(body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUser = (req, res) => {
  const id = req.params.id;
  UserModel.findOne({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  UserModel.findByIdAndUpdate(id, body, { new: true })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
