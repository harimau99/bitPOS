var saleModule = angular.module('saleModule', [])

  .controller('SaleNumpadController', function() {
    this.itemcode = '';
    this.keyPress = function(key) {
      this.itemcode += key;
    };
    this.tickPress = function() {
      $('#saletickbutton').css('color', 'green');
    };
  })

  .factory('saleService', function($http) {
    var getDefaultWallet = function() {
      return $http.get('http://localhost:5000/wallet').then(function(result){
        return result.data.defaultAddress;
      });
    };
    return { getDefaultWallet: getDefaultWallet };
  });