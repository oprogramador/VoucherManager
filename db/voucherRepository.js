var voucherRepository = {};
var randomstring = require('randomstring');
var connector = require('./connector.js');
var userRepository = require('./userRepository');
var mongo = require('mongodb');

voucherRepository.save = function(res, params) {
  userRepository.verify(params.username, params.password, function(result) {
    if(result) {
      connector.connect(function(err, db) {
        if(!err) {
          var vouchers  = db.collection('vouchers');
          var indexes = [];
          var serieHash = randomstring.generate();
          for(var i = 0; i < params.n; i++) {
            var record = {amount: params.amount, serieHash: serieHash};
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

voucherRepository.getAll = function(res, params) {
  userRepository.verify(params.username, params.password, function(result) {
    if(result) {
      connector.connect(function(err, db) {
        if(!err) {
          var vouchers  = db.collection('vouchers');
          vouchers.find({serieHash: params.serieHash}, function(err, cursor) {
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

voucherRepository.get = function(res, params) {
  userRepository.verify(params.username, params.password, function(result) {
    if(result) {
      connector.connect(function(err, db) {
        if(!err) {
          var vouchers  = db.collection('vouchers');
          vouchers.findOne({_id: new mongo.ObjectId(params.id)}, function(err, record) {
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
