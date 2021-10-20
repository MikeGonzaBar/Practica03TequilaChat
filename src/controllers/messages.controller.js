const Database = require('../models/database.model.js');
const ObjectIdType = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const val = require("../middlewares/validations.js");

/**
 * @typedef { import('./dataTypes').Messages } Messages
 */

class MessagesController {
  static getMessagesByChannel(req, res) {
    const messagesDB = new Database('messages');
    /** @type { Messages} */
    const userChannelsDB = new Database('userChannels');
    userChannelsDB.find({ idUser: ObjectIdType(req.userId), idChannel: ObjectIdType(req.params.channelId)}, {}).toArray().then((result) => {
      if (result.length === 0){
        res.status(403).send({data: 'No authorization to see messages'});
      }
      else{
        messagesDB.find ({ channel: ObjectIdType(req.params.channelId) }, {}).toArray().then((results) => {
          if (results.length === 0) {
            res.status(400).send({ msg: 'No messages registered' });
          } else {
            res.status(200).send({ data: results });
          }
        })
        .catch((err) => {
          res.status(500).send({ err });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
  }

  static createMessage(req, res) {
    const messagesDB = new Database('messages');
    /** @type { Messages} */
    let userId = ObjectIdType(req.userId);
    let channelId = ObjectIdType(req.params.channelId);
    const userChannelsDB = new Database('userChannels');
    userChannelsDB.find({ idUser: ObjectIdType(req.userId), idChannel: ObjectIdType(req.params.channelId)}, {}).toArray().then((result) => {
      if (result){
        let messageData = {
          user: userId,
          channel: channelId,
          message: req.body.message,
          date: new Date()
        }
        messagesDB.insertOne(messageData).then((result) => {
          res.status(200).send({ status: result });
        })
      }
      else{
        res.status(400).send('Bad request');
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
  }
}

module.exports = MessagesController;