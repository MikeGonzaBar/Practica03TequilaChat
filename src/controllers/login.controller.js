const Database = require('../models/database.model.js');
const jwt = require('jsonwebtoken');
const val = require("../middlewares/validations.js");

/**
 * @typedef { import('./dataTypes').Login } Login
 */

class LoginController {
  static getAllLogin(req, res) {
    const loginDB = new Database('userLogins');
    loginDB
      .find({}, {})
      .toArray()
      .then((results) => {
        if (results.length === 0) {
          res.status(400).send({ msg: 'No userLogins registered' });
        } else {
          res.status(200).send({ data: results });
        }
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }

  static createLogin(req, res) {
    const loginDB = new Database('userLogins');
    /** @type { Login} */
    var userData = {
      email: req.body.email,
      password: req.body.password
    }
    console.log(userData);
    const usersDB = new Database('users');
    usersDB
      .findOne({ email: userData.email }, {})
      .then((result) => {
        if (result) {
          console.log(result);
          let newToken = jwt.sign({ idUser: result._id }, val.sign);
          var loginData = {
            userId: result._id,
            token: newToken
          }
          loginDB.insertOne(loginData).then((result) => {
              res.send({ status: result });
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        } else {
          res.status(400).send({ BadRequest: 'User ' + userData.email + ' does not exist' });
        }
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  }
}

module.exports = LoginController;