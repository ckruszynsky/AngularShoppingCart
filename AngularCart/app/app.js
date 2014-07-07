'use strict';
angular.module('shoppingCart', ['ngRoute']);

angular.module('shoppingCart').config([
       '$routeProvider', function ($routeProvider) {

           $routeProvider.when('/products', {
               templateUrl: 'app/partials/product-listing.html',
               controller: 'productListingController'
           });

        $routeProvider.when('/product/:id', {
                templateUrl: 'app/partials/product-detail.html',
                controller: 'productDetailController'
        });

           $routeProvider.otherwise({ redirectTo: '/products' });

       }
]);

angular.module('shoppingCart').service('productService', [
    '$http','$q',function($http,$q) {
    var products;
    this.getProducts = function () {
        var defer = $q.defer();
            $http.get("/app/data/products.json",{cache:true}).success(function(data) {
                products = data;
                defer.resolve(products);
            });
        return defer.promise;
    };
    this.getProductFor = function(id) {
        var product = products.filter(function(p) {
            return p.id == id;
        });

        if (!product) {
            return {};
        } else {
            return product[0];
        }
    };

}]);

angular.module('shoppingCart').controller('productListingController', [
       '$scope','productService', function ($scope,productService) {

        productService.getProducts().then(function(products) {
            $scope.products = products;
        });
    }
]);

angular.module('shoppingCart').controller('productDetailController', [
    '$scope', '$routeParams','productService', function($scope, $routeParams,productService) {
        $scope.product = productService.getProductFor($routeParams.id);
    }
]);




