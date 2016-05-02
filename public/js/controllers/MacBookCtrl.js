angular.module('MacBookCtrl', []).controller('MacBookController', function($scope, ProductService) {
	$scope.tagline = 'MacBook';
    $scope.normalPrice = 1200;
    ProductService.decorateScope($scope);
});
