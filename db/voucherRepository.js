var voucherRepository = {};
var randomstring = require('randomstring');
var connector = require('./connector.js');
var userRepository = require('./userRepository');
var voucherValidator = require('../validator/voucherValidator.js');
var mongo = require('mongodb');

voucherRepository.save = function(res, params) {
  userRepository.verify(params.username, params.password, function(result) {
    if(result) {
      connector.connect(function(err, db) {
        if(!err) {
          var vouchers  = db.collection('vouchers');
          var indexes = [];
          var serieHash = randomstring.generate();
          var validTo = params.validTo ? new Date(params.validTo) : undefined;
          for(var i = 0; i < params.n; i++) {
            var record = {
              id: params.prefix + randomstring.generate(),
              amount: params.amount,
              percent: params.percent,
              maxTimes: params.maxTimes,
              validTo: validTo,
              serieHash: serieHash,
            };
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

voucherRepository.use = function(res, id) {
  connector.connect(function(err, db) {
    if(!err) {
      var vouchers  = db.collection('vouchers');
      vouchers.findOne({id: id}, function(err, record) {
        if(!err) {
          if(record) {
            if(voucherValidator.validateVoucher(record)) {
              if(record.maxTimes) {
                record.maxTimes--;
                vouchers.save(record);
              }
              res.json({success: true, amount: record.amount, percent: record.percent});
            } else {
              res.json({success: false, msg: 'voucher not valid'});
            }
          } else {
            res.json({success: false, msg: 'voucher not found'});
          }
        } else {
          res.error('error with db');
        }
      });
    } else {
      res.error('error with db');
    }
  });
}

module.exports = voucherRepository;
