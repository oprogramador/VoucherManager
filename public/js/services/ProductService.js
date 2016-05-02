angular.module('VoucherManager').factory('ProductService', function() {
  return {
    decorateScope: function(superScope, ngDialog) {
      superScope.price = superScope.normalPrice;
      superScope.voucherStatus = 'not submitted';
      superScope.buy = function(scope) {
        ngDialog.open({
          template: '<div>Congratulations.</div><div>Thank you for the shopping.</div>',
          plain: true
        });
        superScope.price = superScope.normalPrice;
        superScope.voucherStatus = 'not submitted';
      }
      superScope.getVoucher = function(scope) {
        scope.voucherStatus = 'loading';
        var value = superScope.voucherForm.voucher.$modelValue;
        $.post('/generate/use/'+value, function(data) {
          if(!data.success) {
            scope.voucherStatus = data.msg;
            scope.price = scope.normalPrice;
          } else {
            scope.voucherStatus = 'applied';
            var percent = data.percent ? data.percent : 0;
            var amount = data.amount ? data.amount : 0;
            scope.price = scope.normalPrice * (1 - data.percent) - data.amount;
            if(scope.price < 0) {
              scope.price = 0;
            }
          }
          scope.$apply();
        });
      }
    }
  };
});
