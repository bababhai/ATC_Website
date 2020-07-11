var app = angular.module('MyApp', []);
var Guideinfo = [];
var langDetail = [];
var Languages = "";
var Genderlist = "";
var Text = "";
app.controller('SearchLocation', function ($scope, $http, $window) {
    $scope.Guideinfo = Guidedata;
    //$scope.langDetail = langdata;
    $scope.BuClick = function () {
        

        var detail = $scope.Gui;
        if (detail == null) { Text = "" } else {
            Text = detail.SearchText;
        }
        var urlget = "/SearchByParameter/GetAreaDetailsJson?SearchText=" + Text;
        //console.log(gender.toString());
       
        var post = $http({
            method: "GET",
            url: urlget,
            dataType: 'json',
            //data: { SearchText: detail.SearchText, languages: detail.languages, PriceRange: detail.PriceRange},
            headers: { "Content-Type": "application/json" }           
        });

        post.success(function (data, status) {
            
            
            $scope.Guideinfo = data;
            //$scope.langDetail = Response[1];
            //console.log(Guideinfo)
           // console.log(langdata)
           
        });

        post.error(function (data, status) {
            $window.alert(data.Message);
        });
       
       
    }

});