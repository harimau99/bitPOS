var saleModule = angular.module('saleModule', [])

  .controller('SaleNumpadController', ['saleService', function(saleService) {
    this.itemcode = '';
    this.db = [];
    this.keyPress = function(key) {
      this.itemcode += key;
    };
    this.tickPress = function() {
      $('#saletickbutton').css('color', 'green');
      saleService.dbFetchall().then(function(data){
            for (var i = 0; i < data.length; i++) {
              this.db.push(data[i]);
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