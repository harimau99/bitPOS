var app = angular.module('statusModule', []);

app.controller('StatusCtrl', ['$scope', 'statusService', function($scope, statusService) {
    $scope.random = function() {
      var value = statusService;
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
    };
    $scope.random();
  }]);

// factory('statusService', ['$http', function($http) {
app.factory('statusService', function() {
    var connections = 5;
    // $http.get('http://localhost:5000/status').success(function(data, status, headers, config) {
    //     that.connections = data;
    //   }).error(function(data, status, headers, config) {
    //     alert('\nData:\n' + data + '\nStatus:\n' + status + '\nHeaders:\n' + headers + '\nConfig:\n' + config);
    //   });
    return connections;
  });
