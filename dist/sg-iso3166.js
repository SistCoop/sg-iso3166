'use strict';

(function(){

    var module = angular.module('sg-iso3166', ['restangular']);

    module.provider('sgIso3166', function() {

        this.restUrl = 'http://localhost';

        this.$get = function() {
            var restUrl = this.restUrl;
            return {
                getRestUrl: function() {
                    return restUrl;
                }
            }
        };

        this.setRestUrl = function(restUrl) {
            this.restUrl = restUrl;
        };
    });

    module.factory('Iso3166Restangular', ['Restangular', 'sgIso3166', function(Restangular, sgIso3166) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(sgIso3166.getRestUrl());
        });
    }]);


    var RestObject = function (path, restangular, extendMethods) {
        var modelMethods = {

            /**
             * Retorna url*/
            $getBasePath: function () {
                return path;
            },
            /**
             * Retorna la url completa del objeto*/
            $getAbsoluteUrl: function () {
                return restangular.one(path, this.id).getRestangularUrl();
            },
            /**
             * Concatena la url de subresource con la url base y la retorna*/
            $concatSubResourcePath: function (subResourcePath) {
                return this.$getBasePath() + '/' + this.id + '/' + subResourcePath;
            },


            $new: function (id) {
                return angular.extend({id: id}, modelMethods);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethods, {
                    $save: function () {
                        return restangular.all(path).post(this);
                    }
                });
            },

            $search: function (queryParams) {
                return restangular.all(path).getList(queryParams);
            },

            $find: function (id) {
                return restangular.one(path, id).get();
            },
            $save: function () {
                return restangular.one(path, this.id).customPUT(restangular.copy(this), '', {}, {});
            },
            $saveSent: function (obj) {
                return restangular.all(path).post(obj);
            },

            $enable: function () {
                return restangular.one(path, this.id).all('enable').post();
            },
            $disable: function () {
                return restangular.one(path, this.id).all('disable').post();
            },
            $remove: function () {
                return restangular.one(path, this.id).remove();
            }
        };

        modelMethods = angular.extend(modelMethods, extendMethods);

        restangular.extendModel(path, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethods);
            } else {
                return angular.extend({id: obj}, modelMethods)
            }
        });

        restangular.extendCollection(path, function (collection) {
            angular.forEach(collection, function (row) {
                angular.extend(row, modelMethods);
            });
            return collection;
        });

        return modelMethods;
    };


    module.factory('SGCountryCode', ['Iso3166Restangular',  function(Iso3166Restangular) {
        var countryCodeResource = RestObject('countryCodes', Iso3166Restangular);
        return countryCodeResource;
    }]);


    module.factory('SGCountryName', ['Iso3166Restangular',function(Iso3166Restangular) {
        var countryNameResource = RestObject('countryNames', Iso3166Restangular);
        return countryNameResource;
    }]);


    module.factory('SGLanguage', ['Iso3166Restangular',function(Iso3166Restangular) {
        var countryLanguagesResource = RestObject('countryLanguages', Iso3166Restangular);
        return countryLanguagesResource;
    }]);


    module.factory('SGSubdivisionCategory', ['Iso3166Restangular', function(Iso3166Restangular) {
        var subdivisionCategoriesResource = RestObject('subdivisionCategories', Iso3166Restangular);
        return subdivisionCategoriesResource;
    }]);


    module.factory('SGTerritory', ['Iso3166Restangular',function(Iso3166Restangular) {
        var territorieResource = RestObject('territories', Iso3166Restangular);
        return territorieResource;
    }]);

})();