var app = angular.module('guideserviceIndex', ['angularUtils.directives.dirPagination', 'ngResource']);
var IndexDetails = [];
var lstServices = [];
var service = {};
var rsLanguage = [];
app.controller('guideservicectrl', function ($scope, $http, $window) {
    $scope.IndexDetails = servicelist;
    service.service_Code = service_Code;
    $scope.newService = service;
    $scope.Languages = LanguageList;
    rsLanguage = LanguageList;
    //$scope.addService = function (val) {
    //    AlertModel("Save", "Guide Service Saved Successfully.", "Ok");
    //}
    $scope.addLanguage = function () {
        if (isPropertyDefined($scope.newService.service_Name)) {
            service.service_Code = $scope.service_Code;
            service.service_Name = $scope.newService.service_Name;
            service.language_Name = $scope.newService.ddlLanguage.language_Name;
            service.language_ID = $scope.newService.ddlLanguage.language_ID;
            lstServices.push(service);
            service = {};
            service.service_Code = service_Code;
            $scope.Languages = rsLanguage.filter(a => !lstServices.some(b => b.language_ID === a.language_ID));
            $scope.newService = service;
            $scope.lstServices = lstServices;
        }
    }
    $scope.removeLanguage = function (id) {
        lstServices = lstServices.filter(a => a.language_ID !== id);
        $scope.lstServices = lstServices;
        $scope.Languages = rsLanguage.filter(a => !lstServices.some(b => b.language_ID === a.language_ID));
    }


    $scope.editLanguage = function (object) {
        debugger;
        var ServiceID = null;
        ServiceID = object.service_ID;
        console.log(ServiceID);
        $scope.newService = object;
        lstServices = lstServices.filter(a => a.language_ID !== object.language_ID);
        $scope.lstServices = lstServices;
        $scope.Languages = rsLanguage.filter(a => !lstServices.some(b => b.language_ID === a.language_ID));
        $scope.newService.ddlLanguage = rsLanguage.find(a => a.language_ID == object.language_ID);


    }
        //Save
        $scope.addService = function () {
            
            Loader.Show("....");
            $scope.addLanguage();
            var data = {
                //Service_ID : $scope.newService.service_ID,
                //Service_ID: ServiceID,
                Service_Code: $scope.service_Code,
                GuideServiceLang: $scope.lstServices
            }
            
            var post = $http({
                method: "POST",
                dataType: "json",
                url: "/GuideServiceMaster/Create",
                data: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                console.log(response);
                if (response.data.success == true) {
                    $("#myModal").modal('toggle');
                    AlertModel("Alert", response.data.message, "Ok");
                    var objservice = lstServices.find(a => a.language_ID == lang_ID);
                    if (objservice == null) {
                        objservice = lstServices[0];
                    }
                    objservice.service_ID = response.data.returnValue;
                    servicelist.push(objservice);
                    $scope.IndexDetails = servicelist;

                } else {
                    AlertModel("Alert", response.data.message, "Ok");
                }
                Loader.Hide();
            });
        }


  
   
    $scope.editService = function (eService) {
        
        $.getJSON("/GuideServiceMaster/Get/" + eService.service_ID, function (data) {
            console.log(data);
            
            $scope.service_Code = data.service_Code;
            $scope.newService.service_ID = data.service_ID;            
            $scope.lstServices = data.guideServiceLang;
            lstServices = data.guideServiceLang;            
            $scope.Languages = LanguageList.filter(a => !$scope.lstServices.some(b => b.language_ID === a.language_ID));
            $scope.$apply();
            $("#myModal").modal('toggle');
        });
    }
    $scope.addnewService = function () {
        debugger;
        $.getJSON("/GuideServiceMaster/GetCode?id=Service_Code&table=Guide_Service_Master", function (data) {
            console.log(data);
            $scope.newService = {};
            $scope.lstServices = [];
            lstServices = [];
            service = {};            
            $scope.service_Code = data;            
            $scope.Languages = LanguageList;        
            $scope.$apply();
            $("#myModal").modal('toggle');
        });
    }
})