var module = angular.module('iso-3166', ['restangular', 'ui-iso3166']);

module.config(function(uiIso3166Provider){
    uiIso3166Provider.restUrl = 'https://someweb';
});

module.controller('PruebaController', function($scope, Restangular, CountryCode){
    $scope.countryCode = CountryCode;
    $scope.build = CountryCode.$build();
});
