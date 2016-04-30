var express = require('express');
var router = express.Router();
var voucherRepository = require('../db/voucherRepository.js');
var dbResponseAdapter = require('../db_response/dbResponseAdapter.js');
var voucherValidator = require('../validator/voucherValidator.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'VoucherManager' });
});

router.get('/generate/create/:username/:password/:n/:amount', function(req, res, next) {
  var username = req.params['username'];
  var password = req.params['password'];
  var n = req.params['n'];
  var amount = req.params['amount'];
  if(!voucherValidator.validateNumber(n)) {
    res.json({error: true, msg: 'invalid number'});   
  } else {
    voucherRepository.save(dbResponseAdapter.create(res), username, password, n, amount);
  }
});

router.get('/generate/getAll/:username/:password/:serieHash', function(req, res, next) {
  var username = req.params['username'];
  var password = req.params['password'];
  var serieHash = req.params['serieHash'];
  voucherRepository.getAll(dbResponseAdapter.create(res), username, password, serieHash);
});

router.get('/generate/get/:username/:password/:id', function(req, res, next) {
  var username = req.params['username'];
  var password = req.params['password'];
  var id = req.params['id'];
  voucherRepository.get(dbResponseAdapter.create(res), username, password, id);
});

module.exports = router;
