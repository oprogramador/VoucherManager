angular.module('IPadCtrl', []).controller('IPadController', function($scope, ProductService, ngDialog) {
	$scope.tagline = 'iPad';
    $scope.normalPrice = 350;
    ProductService.decorateScope($scope, ngDialog);
});
