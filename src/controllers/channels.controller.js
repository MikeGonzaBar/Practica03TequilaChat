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
    let invitelink = req.protocol + '//' + req.get('host') + '/api/channels/invite/'+req.body.name + '-' + req.userId
    /** @type { Channel} */
    var channelData = {
      name: req.body.name,
      description: req.body.description,
      owner: ObjectIdType(req.userId),
      inviteUrl: invitelink
    }
    channelsDb.insertOne(channelData).then((result1) => {
      var tempUserChannel = {
        idUser: ObjectIdType(req.userId),
        idChannel: result1.insertedId
      }
      userChannelsDb.insertOne(tempUserChannel).then((result)=>{
        res.send({ statusChannel: result1 , statusUserChannel: result, data:channelData});
      })
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }

  static joinChannel(req, res) {
    const channelsDb = new Database('channels');
    let identifications = req.params.inviteUrl
    let ids = identifications.split('-')
    let channelName=ids[0]
    let user=ids[1]
    channelsDb.find({name: channelName, owner: ObjectIdType(user)}, {}).toArray().then((result) => {
      if (result.length === 0) {
        res.status(400).send({ msg: 'Not found' });
      } else {
        let newUserInChannel = {
          idUser: ObjectIdType(req.userId),
          idChannel: result[0]._id
        }
        console.log(newUserInChannel);
        const userChannelsDb = new Database('userChannels');
        userChannelsDb.insertOne(newUserInChannel).then((result3)=>{
          console.log(result3);
          if(result3){
            res.status(200).send({ status: result3});
          }
          else{
            res.status(400).send({status: 'Error with join'});
          }
        })        
      }
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
  }
}

module.exports = ChannelsController;