const ObjectIdType = require('mongodb').ObjectID;
const Database = require('../models/database.model.js');
const jwt = require('jsonwebtoken');
/**
 * @typedef { import('./dataTypes').Channel } Channel
 */

class ChannelsController {
  static getAllChannels(req, res) {
    const channelsDb = new Database('channels');
    channelsDb.find({}, {}).toArray().then((results) => {
      if (results.length === 0) {
        res.status(400).send({ msg: 'No channels registered' });
      } else {
        res.status(200).send({ data: results });
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
  }

  static createChannel(req, res) {
    const channelsDb = new Database('channels');
    const userChannelsDb = new Database('userChannels');
    /** @type { Channel} */
    var channelData = {
      name: req.body.name,
      description: req.body.description,
      owner: ObjectIdType(req.userId)
    }
    channelsDb.insertOne(channelData).then((result1) => {
      var tempUserChannel = {
        idUser: ObjectIdType(req.userId),
        idChannel: result1.insertedId
      }
      userChannelsDb.insertOne(tempUserChannel).then((result)=>{
        res.send({ statusChannel: result1 , statusUserChannel: result});
      })
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }
}

module.exports = ChannelsController;