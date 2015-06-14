(function() {
  var app = angular.module('bitPOS', ['bitPOS-directives', 'statusModule', 'ui.bootstrap']);

  app.controller('TabController', function() {
    this.tab = 4;
    this.isSet = function(checkTab) {
      return this.tab === checkTab;
    };
    this.setTab = function(activeTab) {
      this.tab = activeTab;
    };
    this.reload = function() {
      location.reload();
    };
  });

  app.controller('DataController', ['$http', function($http) {
    var dataStore = this;
    this.wallet = wallet;
    this.transactions = transactions;
    this.status = status;
    this.update = function() {
      $http.get('http://localhost:5000/wallet').success(function(data, status, headers, config) {
        dataStore.wallet = data;
      }).error(function(data, status, headers, config) {
        alert('\nData:\n' + data + '\nStatus:\n' + status + '\nHeaders:\n' + headers + '\nConfig:\n' + config);
      });
      $http.get('http://localhost:5000/transactions').success(function(data, status, headers, config) {
        dataStore.transactions = data;
      }).error(function(data, status, headers, config) {
        alert('\nData:\n' + data + '\nStatus:\n' + status + '\nHeaders:\n' + headers + '\nConfig:\n' + config);
      });
      $http.get('http://localhost:5000/status').success(function(data, status, headers, config) {
        dataStore.status = data;
      }).error(function(data, status, headers, config) {
        alert('\nData:\n' + data + '\nStatus:\n' + status + '\nHeaders:\n' + headers + '\nConfig:\n' + config);
      });
    };
  }]);

  app.controller('NumPadController', ['$http', '$scope', '$sce', function($http, $scope, $sce) {
    this.value = '';
    this.keyPress = function(key) {
      this.value = this.value.concat(key);
    };
    this.tickPress = function() {
      this.URL = 'https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:' + wallet.address + "?"
      params = {
        amount: this.value,
        label: 'JamesG-Pi',
        size: '210x210'
      };
      this.URL = this.URL.concat(decodeURIComponent($.param(params)));
      html = '<div class="col-xs-12 well" style="margin-top: 10px;"><img src="' + this.URL + '"></div>'
      $scope.QRcode = $sce.trustAsHtml(html);
    };
  }]);

  
  var wallet = {
    defaultAddress: 'mvwtUwzBT7EUW4tNB39R33MF9G4vrpyznH',
    balance: 999,
    lastTransaction: {
      time: 999,
      timedelta: 99,
      amount: 999,
      fromAddress: 'mvwtUwzBT7EUW4tNB39R33MF9G4vrpyznH',
      confirmations: 1
    }
  };

  var transactions = {'t1': {
    time: 13242354,
    amount: 999,
    address: 'mvwtUwzBT7EUW4tNB39R33MF9G4vrpyznH'
  }};

})();
