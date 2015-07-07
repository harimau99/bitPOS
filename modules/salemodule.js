var saleModule = angular.module('saleModule', [])

  .controller('SaleNumpadController', ['saleService', function(saleService) {
    this.db = [];
    controller = this;
    this.tickPress = function() {
      saleService.dbFetchall().then(function(data){
            for (var i = 0; i < data.length; i++) {
              controller.db.push(data[i]);
            };
        });
    };
  }])

  .factory('saleService', function($http) {
    var dbFetchall = function() {
      return $http.get('http://10.211.55.4:5000/db-fetchall').then(function(result){
        return result.data;
      });
    };
    return { dbFetchall: dbFetchall };
  });