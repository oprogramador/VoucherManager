angular.module('IPhoneCtrl', []).controller('IPhoneController', function($scope, ProductService, ngDialog) {
	$scope.tagline = 'iPhone';
    $scope.normalPrice = 240;
    ProductService.decorateScope($scope, ngDialog);
});
