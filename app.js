(function() {
  var app = angular.module('bitPOS', ['bitPOS-directives', 'statusModule', 'ui.bootstrap', 'monospaced.qrcode', 'saleModule']);

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
      });
      $http.get('http://localhost:5000/transactions').success(function(data, status, headers, config) {
        dataStore.transactions = data;
      });
      $http.get('http://localhost:5000/status').success(function(data, status, headers, config) {
        dataStore.status = data;
      }).error(function(data, status, headers, config) {
        alert('\nData:\n' + data + '\nStatus:\n' + status + '\nHeaders:\n' + headers + '\nConfig:\n' + config);
      });
    };
  }]);

  app.controller('WalletController', function() {
    this.URI = 'bitcoin:' + wallet.defaultAddress;
  });

  app.controller('RequestController', function() {
    this.value1 = '';
    this.URI = 'bitcoin:' + wallet.defaultAddress + '?amount=';
    this.keyPress = function(key) {
      this.value1 += key;
      this.finalURI = this.URI + this.value1;
    };
  });

  
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
