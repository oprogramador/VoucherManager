var voucherRepository = {};
var randomstring = require('randomstring');
var connector = require('./connector.js');
var userRepository = require('./userRepository');
var mongo = require('mongodb');

voucherRepository.save = function(res, username, password, n, amount) {
  userRepository.verify(username, password, function(result) {
    if(result) {
      connector.connect(function(err, db) {
        if(!err) {
          var vouchers  = db.collection('vouchers');
          var indexes = [];
          var serieHash = randomstring.generate();
          for(var i = 0; i < n; i++) {
            var record = {amount: amount, serieHash: serieHash};
            vouchers.save(record);
            indexes.push(record._id);
          }
          res.json({serieHash: serieHash});
        } else {
          res.error('error with db');
        }
      });
    } else {
      res.error('invalid user credentials');
    }
  });
}

voucherRepository.getAll = function(res, username, password, serieHash) {
  userRepository.verify(username, password, function(result) {
    if(result) {
      connector.connect(function(err, db) {
        if(!err) {
          var vouchers  = db.collection('vouchers');
          vouchers.find({serieHash: serieHash}, function(err, cursor) {
            if(!err) {
              cursor.toArray(function(err, data) {
                res.json(data);    
              });
            } else {
              res.error('error with db');
            }
          });
        } else {
          res.error('error with db');
        }
      });
    } else {
      res.error('invalid user credentials');
    }
  });
}

voucherRepository.get = function(res, username, password, id) {
  userRepository.verify(username, password, function(result) {
    if(result) {
      connector.connect(function(err, db) {
        if(!err) {
          var vouchers  = db.collection('vouchers');
          vouchers.findOne({_id: new mongo.ObjectId(id)}, function(err, record) {
            if(!err) {
              res.json(record);    
            } else {
              res.error('error with db');
            }
          });
        } else {
          res.error('error with db');
        }
      });
    } else {
      res.error('invalid user credentials');
    }
  });
}

module.exports = voucherRepository;
