var statusModule = angular.module('statusModule', [])

  .controller('StatusCtrl', ['$scope', 'statusService', '$timeout', function($scope, statusService, $timeout) {
    this.connections = 1;
    this.localHeight = 999;
    this.nextBlockFee = 9;
    this.maxHeight = 999;

    var wrapper = function() {
      var myDataPromise = statusService.getData();
      myDataPromise.then(function(result) {  
        var value = result;
        var type;
        if (value === 8) {
          type = 'success';
        } else if (value >= 4) {
          type = 'info';
        } else if (value > 0) {
          type = 'warning';
        } else {
          type = 'danger';
        }
        $scope.showWarning = (type === 'danger' || type === 'warning');
        $scope.dynamic = value * 12.5;
        $scope.type = type;
      });
      $timeout(wrapper, 1000);
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