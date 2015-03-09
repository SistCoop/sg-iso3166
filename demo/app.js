var module = angular.module('iso-3166', ['restangular', 'sg-iso3166']);

module.config(function(sgIso3166Provider){
    sgIso3166Provider.restUrl = 'https://someweb';
});

module.controller('PruebaController', function($scope, Restangular, CountryCode){
    $scope.countryCode = CountryCode;
    $scope.build = CountryCode.$build();
});
