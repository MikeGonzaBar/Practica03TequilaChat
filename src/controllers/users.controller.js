const ObjectIdType = require('mongodb').ObjectID;
const Database = require('../models/database.model.js');

/**
 * @typedef { import('./dataTypes').User } User
 */

class UsersController {
  static getAllUsers(req, res) {
    const usersDb = new Database('users');
    usersDb.find({}, {}).toArray().then((results) => {
      if (results.length === 0) {
        res.status(400).send({ msg: 'No users registered' });
      } else {
        res.status(200).send({ data: results });
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
  }

  static getUserById(req, res) {
    const usersDb = new Database('users');
    usersDb.findOne({ _id: ObjectIdType(req.params.userId) }, {}).then((result) => {
      if (result) {
        res.status(200).send({ data: result });
      } else {
        res.status(400).send({ BadRequest: 'User ' + req.params.userId + ' does not exist' });
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
  }

  static createUser(req, res) {
    const usersDb = new Database('users');
    /** @type { User} */
    var userData = {
      email: req.body.email,
      password: req.body.password
    }
    usersDb.insertOne(userData).then((result) => {
      res.send({ status: result });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }
}

module.exports = UsersController;