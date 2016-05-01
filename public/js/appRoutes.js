angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })
    .when('/macbook', {
        templateUrl: 'views/macbook.html',
        controller: 'MacBookController'
    })
    .when('/ipad', {
        templateUrl: 'views/ipad.html',
        controller: 'IPadController'	
    })
    .when('/iphone', {
        templateUrl: 'views/iphone.html',
        controller: 'IPhoneController'	
    })
    .otherwise({
        redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}]);
