var statusModule = angular.module('statusModule', [])

  .controller('StatusController', ['$scope', 'statusService', '$timeout', function($scope, statusService, $timeout) {
    this.connections = 1;
    this.localHeight = 999;
    this.nextBlockFee = 9;
    this.maxHeight = 999;

    var wrapper = function() {
      var myDataPromise = statusService.getData();
      myDataPromise.then(function(result) {  
        var value = result;
        var type;
        if (value >= 8) {
          type = 'success';
        } else if (value >= 6) {
          type = 'info';
        } else if (value >= 3) {
          type = 'warning';
        } else {
          type = 'danger';
        }
        $scope.dynamic = value * 12.5;
        $scope.type = type;
      });
      $timeout(wrapper, 10000);
    };
    wrapper(); 
  }])

  .factory('statusService', function($http) {
    var getData = function() {
      return $http.get('http://localhost:5000/status').then(function(result){
        return result.data.connections;
      });
    };
    return { getData: getData };
  });