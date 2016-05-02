angular.module('MacBookCtrl', []).controller('MacBookController', function($scope) {
	$scope.tagline = 'MacBook';
    $scope.normalPrice = 1200;
    $scope.price = $scope.normalPrice;
    $scope.voucherStatus = 'not submitted';
    $scope.getVoucher = function(scope) {
      var value = $scope.voucherForm.voucher.$modelValue;
      $.post('/generate/use/'+value, function(data) {
        if(!data.success) {
          scope.voucherStatus = data.msg;
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
});
