var app = angular.module('AricleIndex', ['angularUtils.directives.dirPagination']);
var IndexDetails = [];
app.controller('ArticleIndex', function ($scope, $http) {
    $scope.IndexDetails = ArticleIndexDetails;
});