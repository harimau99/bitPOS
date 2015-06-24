var app = angular.module('bitPOS-directives', []);

app.directive("wallet", function() {
  return {
    restrict: "E",
    templateUrl: "/views/wallet.html"
  };
});

app.directive("transactions", function() {
  return {
    restrict: "E",
    templateUrl: "/views/transactions.html"
  };
});

app.directive("request", function() {
  return {
    restrict: "E",
    templateUrl: "/views/request.html"
  };
});

app.directive("sale", function() {
  return {
    restrict: "E",
    templateUrl: "/views/sale.html"
  };
});

app.directive("status", function() {
  return {
    restrict: "E",
    templateUrl: "/views/status.html"
  };
});