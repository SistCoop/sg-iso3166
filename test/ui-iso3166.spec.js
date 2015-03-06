describe("iso-3166", function() {

    var countryCodeFactory;

    // Load required modules
    beforeEach(function() {
        angular.module('restangular',[]);
        module('ui-iso3166');
        module(function($provide) {
            $provide.service('CountryCode', function(CountryCode) {
                countryCodeFactory = CountryCode;
            });
        });
    });

    describe("CountryCode", function(){
        it("CountryCode factory", function(){
            var output = 1;
            expect(output);
        });
    });

});
