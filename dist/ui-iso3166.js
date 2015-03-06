/**
 * Restful factories for iso3166
 * @version v0.0.5 - 2015-03-06 * @link https://github.com/SistCoopEE/ui-iso3166
 * @author Carlos feria <carlosthe19916@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */(function(){

    var module = angular.module('ui-iso3166', ['restangular']);

    module.provider('uiIso3166', function() {

        var config = {};
        config.restUrl = 'http://localhost:3000';

        /*this.setRestUrl = function(url) {
         config.restUrl = url;
         };*/

        this.$get = function() {
            return config;
        };

    });

    module.factory('Iso3166Restangular', ['Restangular', 'uiIso3166', function(Restangular, uiIso3166) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(uiIso3166.restUrl);
        });
    }]);

    module.factory('Iso3166AbstractModel', ['Iso3166Restangular', function(Iso3166Restangular){
        var url = '';
        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.id).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        }
    }]);

    module.factory('CountryCode', ['Iso3166Restangular',  function(Iso3166Restangular) {

        var url = 'country_codes';
        var urlAlpha2Code = 'country_codes/alpha2Code';
        var urlAlpha3Code = 'country_codes/alpha3Code';
        var urlNumericCode = 'country_codes/numericCode';
        var urlCount = 'country_codes/count';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(urlAlpha3Code, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },


            $saveByAlpha2Code: function() {
                return Iso3166Restangular.one(urlAlpha2Code, this.alpha2Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },
            $saveByAlpha3Code: function() {
                return Iso3166Restangular.one(urlAlpha3Code, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },
            $saveByNumericCode: function() {
                return Iso3166Restangular.one(urlNumericCode, this.numericCode).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },


            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },
            $findByAlpha2code: function(alpha2Code){
                return Iso3166Restangular.one(urlAlpha2Code, alpha2Code).get();
            },
            $findByAlpha3code: function(alpha3Code){
                return Iso3166Restangular.one(urlAlpha3Code, alpha3Code).get();
            },
            $findByNumericCode: function(numericCode){
                return Iso3166Restangular.one(urlNumericCode, numericCode).get();
            },


            $count: function(){
                return Iso3166Restangular.one(urlCount).get();
            },


            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(urlAlpha3Code, id).remove();
            },
            $removeByAlpha2Code: function(id){
                return Iso3166Restangular.one(urlAlpha2Code, id).remove();
            },
            $removeByAlpha3Code: function(id){
                return Iso3166Restangular.one(urlAlpha3Code, id).remove();
            },
            $removeByNumericCode: function(id){
                return Iso3166Restangular.one(urlNumericCode, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso3166Restangular.extendModel(urlAlpha2Code, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso3166Restangular.extendModel(urlAlpha3Code, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso3166Restangular.extendModel(urlNumericCode, function(obj) {
            return angular.extend(obj, modelMethos);
        });
        Iso3166Restangular.extendModel(urlCount, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);


    module.factory('CountryName', ['Iso3166Restangular',function(Iso3166Restangular) {

        var url = 'country_names';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined, independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);


    module.factory('Language', ['Iso3166Restangular',function(Iso3166Restangular) {

        var url = 'languages';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined, independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);


    module.factory('SubdivisionCategory', ['Iso3166Restangular', function(Iso3166Restangular) {

        var url = 'subdivisionCategories';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined, independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);


    module.factory('Territory', ['Iso3166Restangular',function(Iso3166Restangular) {

        var url = 'territories';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined, independent: false}, modelMethos, {$save: function(){
                    return Iso3166Restangular.all(url).post(this);
                }});
            },
            $save: function() {
                return Iso3166Restangular.one(url, this.alpha3Code).customPUT(Iso3166Restangular.copy(this),'',{},{});
            },

            $find: function(id){
                return Iso3166Restangular.one(url, id).get();
            },
            $search: function(queryParams){
                return Iso3166Restangular.all(url).getList(queryParams);
            },

            $disable: function(){
                return Iso3166Restangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return Iso3166Restangular.one(url, id).remove();
            }
        };

        Iso3166Restangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);

})();