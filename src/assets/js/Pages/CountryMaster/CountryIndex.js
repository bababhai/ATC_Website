var app = angular.module('CountyIndex', ['angularUtils.directives.dirPagination']);
var IndexDetails = [];
app.controller('Country', function( $scope, $http)
{
    $scope.IndexDetails = CountryIndexDetails;
});