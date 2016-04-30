var voucherValidator = {};

voucherValidator.validateNumber = function(n) {
  return n >= 1 && n <= 10000;
}

module.exports = voucherValidator;
