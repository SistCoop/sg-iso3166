var module = angular.module('iso-3166', ['restangular', 'ui-iso3166']);

module.controller('PruebaController', function($scope, Restangular, CountryCode){
    $scope.countryCode = CountryCode;
    $scope.build = CountryCode.$build();
});
