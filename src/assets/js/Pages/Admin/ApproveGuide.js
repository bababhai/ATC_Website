var app = angular.module('Approveguide', []);
var IndexDetails = [];
var selectedIDS = "";
app.controller('ApproveGuideList', function ($scope, $http, $window) {
    $scope.IndexDetails = Details;

   
    $scope.SaveData = function () {
        var ChkValues = [];
        angular.forEach($scope.IndexDetails, function (d) {
            if (!!d.Selected) ChkValues.push(d.user_Id);
        });
        selectedIDS = ChkValues.toString();
        var urlget = "/admin/ApprovedGuide?selectedIds=" + selectedIDS ;      
        var post = $http({
            method: "GET",
            url: urlget,
            dataType: 'json',
            //data: { SearchText: detail.SearchText, languages: detail.languages, PriceRange: detail.PriceRange},
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
          
            if (response.data.success == true) {
                AlertModelRedirect("Alert", "Approved Successfully", "Ok", "/admin/ApproveGuide");               
            } else {
                AlertModel("Alert", "Please Select User", "Ok");
            }
        },
            function (response) { // optional
                // failed
            });
    }
})
