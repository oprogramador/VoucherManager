var MongoClient = require('mongodb').MongoClient;
var config = require('../config/config.js');
var connector = {};

connector.connect = function(callback) {
  return MongoClient.connect('mongodb://'+config.db.user+':'+config.db.password+'@'+config.db.domain+':'+config.db.port+'/'+config.db.dbName, callback);
}

module.exports = connector;
