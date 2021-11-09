//const User = require('../models/user');
const db = require("../models");
const User = db.users;


exports.getAllUser = (req, res) => {
    User.findAll()
    .then(users => {
        console.log(users);
        res.status(200).json({ data: users});
    })
    .catch(err => {
      res.status(500).send({ message:err.message || "Some error occurred while retrieving tutorials."
      });
    });

 


};
