var express = require('express');
var router = express.Router();
var voucherRepository = require('../db/voucherRepository.js');
var dbResponseAdapter = require('../db_response/dbResponseAdapter.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'VoucherManager' });
});

router.get('/generate/create/:username/:password/:n/:amount', function(req, res, next) {
  var username = req.params['username'];
  var password = req.params['password'];
  var n = req.params['n'];
  var amount = req.params['amount'];
  voucherRepository.save(dbResponseAdapter.create(res), username, password, n, amount);
});

router.get('/generate/getAll/:username/:password/:serieHash', function(req, res, next) {
  var username = req.params['username'];
  var password = req.params['password'];
  var serieHash = req.params['serieHash'];
  voucherRepository.getAll(dbResponseAdapter.create(res), username, password, serieHash);
});

module.exports = router;
