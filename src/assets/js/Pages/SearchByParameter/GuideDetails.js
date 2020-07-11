var app = angular.module('MyApp', []);
var Guideinfo = [];
var langDetail = [];
var Languages = "";
var Genderlist = "";
var Text = "";
app.controller('GuideSearchDeails', function ($scope, $http, $window) {
    $scope.Guideinfo = Guidedata;
    console.log(Guidedata);
    $scope.langDetail = langdata;
    $scope.BuClick = function () {
        var detail = $scope.Gui;
        var ChkValues = [];
        var gender = [];
        var gendervalue = $scope.gen;
         //detail.PriceRange = "100";
        //debugger
        if ($scope.gen == null) { gendervalue = null } else {
            if (gendervalue.Male == true) {
                gender.push("Male")
            }
            if (gendervalue.Female == true) {
                gender.push("Female")
            }
            if (gendervalue.Other == true) {
                gender.push("Other")
            }
        }
        if (detail == null) { Text = "" } else {
            Text = detail.SearchText || "";
        }

            angular.forEach($scope.langDetail, function (a) {
            if (!!a.Selected) ChkValues.push(a.language_Name);
        });
        Languages = ChkValues.toString();
        Genderlist = gender.toString();
        Loader.Show("Searching....");
        //window.location = '/SearchByParameter/SearchDetails?SearchText=' + $("#GuideName").val() + '&languages=null&FromRange=null&ToRange=null&FromDate=null&ToDate=null&Type=location';
        //  $window.location.href = "/SearchByParameter/SearchDetails?SearchText=" + Text + "&languages=" + Languages + " & FromRange=null & ToRange=null & FromDate=null & ToDate=null & Gender=" + Genderlist + " & Type=location";
        var fromdate = $('#frmDate').val() || null;
        var todate = $('#tDate').val() || null;
        console.log(fromdate + "---" + todate);
        var urlgetguidelist = "/SearchByParameter/SearchDetailsJson?SearchText=" + Text + "&languages=" + Languages + "&FromRange=null&ToRange=null&FromDate=" + fromdate + "&ToDate=" + todate + "&Gender=" + Genderlist + "&Type=location";
        console.log(gender.toString());

        $.ajax({
            type: "GET",
            url: urlgetguidelist,            
            datatype: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                console.log(response);
                $scope.Guideinfo = response;
                $scope.$apply();
                Loader.Hide();
            }
        });

        //var post = $http({
        //    method: "GET",
        //    url: urlget,
        //    dataType: 'json',
        //    //data: { SearchText: detail.SearchText, languages: detail.languages, PriceRange: detail.PriceRange},
        //    headers: { "Content-Type": "application/json" }           
        //});

        //post.success(function (Response, status) {

        //    debugger;
           
        //    $scope.Guideinfo = Response[0];
        //    //$scope.langDetail = Response[1];
        //    console.log(Guideinfo)
        //    console.log(langdata)
           
        //});

        //post.error(function (data, status) {
        //    $window.alert(data.Message);
        //});
       
       
    }

    $scope.Reset = function () {
        $window.location.reload();
    }

});