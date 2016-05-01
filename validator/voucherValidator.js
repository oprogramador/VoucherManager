var voucherValidator = {};

voucherValidator.validateNumber = function(n) {
  return n >= 1 && n <= 10000;
}

voucherValidator.validateVoucher = function(record) {
  if(record.validTo && record.validTo < new Date) {
    return false;
  }
  if(record.maxTimes === 0) {
    return false;
  }
  return true;  
}

module.exports = voucherValidator;
