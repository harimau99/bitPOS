var saleModule = angular.module('saleModule', [])

  .controller('SaleController', ['saleService', function(saleService) {
    this.value1 = '';
    this.defaultAddress = 'mvwtUwzBT7EUW4tNB39R33MF9G4vrpyznH';
    this.URI = 'bitcoin:' + this.defaultAddress + '?amount=';
    this.db = [];
    controller = this;
    this.keyPress = function(key) {
      this.value1 += key;
      this.finalURI = this.URI + this.value1;
    };
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
      return $http.get('http://10.211.55.4:5000/fetchall').then(function(result){
        return result.data;
      });
    };
    return { dbFetchall: dbFetchall };
  });