var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var randomstring = require('randomstring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VoucherManager' });
});

router.get('/generate/create/:n/:amount', function(req, res, next) {
  var n = req.param('n');
  var amount = req.param('amount');
  var serieHash = randomstring.generate();
  MongoClient.connect('mongodb://localhost:27017/VoucherManager', function(err, db) {
    var vouchers  = db.collection('vouchers');
    var indexes = [];
    for(var i = 0; i < n; i++) {
      var record = {amount: amount, serieHash: serieHash};
      vouchers.save(record);
      indexes.push(record._id);
    }
    //res.json(indexes);
  });
  res.json({serieHash: serieHash});
});

module.exports = router;
