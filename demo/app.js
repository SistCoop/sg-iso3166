var module = angular.module('demoApp', ['restangular', 'sg-iso3166']);

module.config(function(sgIso3166Provider){
    sgIso3166Provider.restUrl = 'https://someweb';
});

module.controller('PruebaController', function($scope, Restangular, SGCountryCode){

    $scope.obj = SGCountryCode.$search().$object;

});
