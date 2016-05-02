angular.module('MacBookCtrl', []).controller('MacBookController', function($scope, ProductService, ngDialog) {
	$scope.tagline = 'MacBook';
    $scope.normalPrice = 1200;
    ProductService.decorateScope($scope, ngDialog);
});
