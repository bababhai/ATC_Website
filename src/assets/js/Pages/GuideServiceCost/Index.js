

var app = angular.module('ServiceCost', ['angularUtils.directives.dirPagination']);
var IndexDetails = [];
var Costtype = [];
var Service = [];
var AreaList = [];
var ServiceType = "";
var Service_ID = 0;
app.controller('ServiceCostList', function ($scope, $http, $window) {
    //$scope.IndexDetails = Details;
    IndexDetails = Details;
    Costtype = CosttypeDetails;
    Service = ServiceDetails;
    $scope.Costtype = Costtype;
    $scope.Service = Service;
    AreaList = AreaDetails;
    $scope.AreaList = AreaList;
    $scope.IndexDetails = IndexDetails;

    function Clearvalues() {
        $scope.From_No_Of_Persons = "";
        $scope.To_No_Of_Persons = "";
        $scope.From_Date = "";
        $scope.Cost = "";
        $("#Service_ID").val('');
        $("#Cost_Type_ID").val('');
        $("#Area_ID").val('');
        $scope.RdServices = "";
        hidebtn(-1)
    }


    $scope.Create = function () {
        Clearvalues();
       var Code = {};       
        var post = $http({
            method: "GET",          
            url: "/GuideServiceCost/Create",          
        }).then(function (response) {
            if (response != null) {
                console.log(response.data);
                Code = response.data;
                $scope.MasterCode = Code.code;
            } else {

            }
        },
            function (response) { // optional
                // failed
            });
        
    }

    $scope.AddRow = function () {
        if (ServiceType == "Services") {
            Service_ID = parseInt($("#Service_ID").val()) || 0;
        }
        else if (ServiceType == "Area") {
            Service_ID = parseInt($("#Area_ID").val()) || 0;
        }
        var isvalid =  checkDuplicateInObject(ServiceType,Service_ID, $scope.IndexDetails);
        if (isvalid == true) {
            Loader.Show('....');
            var date = $('#From_Date').val();
            var data  = {
               Service_ID: Service_ID,
               Service_Type: ServiceType,
               //Cost_Type_Name : parseInt($("#Cost_Type_ID").val()) || 0,
               From_No_Of_Persons : parseInt($scope.From_No_Of_Persons),
               To_No_Of_Persons : parseInt($scope.To_No_Of_Persons),
                From_Date: date,
               Cost : parseFloat($scope.Cost) ,
               Cost_Type_ID : parseInt($("#Cost_Type_ID").val()) || 0,
               Service_Cost_Code : $scope.MasterCode
            };
            console.log(JSON.stringify(data));
                var post = $http({
                    method: "POST",
                    dataType: "json",
                    url: "/GuideServiceCost/CreateGsc",
                    data: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if (response.data!= null) {
                        $scope.IndexDetails = response.data;
                        IndexDetails = response.data;
                        $scope.Apply;
                        Loader.Hide();
                    } else {

                    }
                },
                    function (response) { // optional
                        // failed
                    });
            

        }
        else {
            AlertModel('Alert','This is already added','Ok')
        }

    }
    var Index;
    $scope.SetValuetoModal = function (index) {
        Index = index;
        hidebtn(Index);
        var serviceId = IndexDetails[index].service_ID;
        var ServiceType = IndexDetails[index].service_Type;
        $scope.MasterCode = IndexDetails[index].service_Cost_Code;
        $scope.RdServices = ServiceType;
        $scope.From_No_Of_Persons = IndexDetails[index].from_No_Of_Persons;
        $scope.To_No_Of_Persons = IndexDetails[index].to_No_Of_Persons;
        $scope.From_Date = IndexDetails[index].from_Date;
        $scope.Cost = IndexDetails[index].cost;
        $("#Cost_Type_ID").val(IndexDetails[index].cost_Type_ID);
        if (ServiceType == "Services") {
            $("#Service").show();
            $("#Area").hide();
            $("#Service_ID").val(parseInt(serviceId));
        }
        else if (ServiceType == "Area") {
            $("#Service").hide();
            $("#Area").show();
            $("#Area_ID").val(parseInt(serviceId));
        }
        //$("#Language_ID").attr("disabled", true);
    }

    $scope.Editvalues = function () {
        Loader.Show('...');
        if (ServiceType == "Services") {
            Service_ID = parseInt($("#Service_ID").val()) || 0;
        }
        else if (ServiceType == "Area") {
            Service_ID = parseInt($("#Area_ID").val()) || 0;
        }
        //Find the record using Index from Array.
        IndexDetails[Index].service_ID = Service_ID,
            IndexDetails[Index].service_Type = ServiceType,
            IndexDetails[Index].from_No_Of_Persons = parseInt($scope.From_No_Of_Persons),
            IndexDetails[Index].to_No_Of_Persons = parseInt($scope.To_No_Of_Persons),
            IndexDetails[Index].from_Date = $scope.From_Date,
            IndexDetails[Index].cost = parseFloat($scope.Cost),
            IndexDetails[Index].cost_Type_ID = parseInt($("#Cost_Type_ID").val()) || 0
        var data = {};
            data = IndexDetails[Index];
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/GuideServiceCost/Update",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            if (response.data != null) {
                $scope.IndexDetails = response.data;
                IndexDetails = response.data;
                $scope.Apply;
                Loader.Hide();
            } else {

            }
        },
            function (response) { // optional
                // failed
            });
    }
      

    $scope.Remove = function (index) {   
        var data = {};
        data = (IndexDetails[index])    
        if ($window.confirm("Do you want to delete: " + name)) {
                var post = $http
                    ({
                        method: "POST",
                        dataType: "json",
                        url: "/GuideServiceCost/Delete",
                        data: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        if (response.data != null) {
                            Loader.Show('...');
                            $scope.IndexDetails = response.data;
                            IndexDetails = response.data;
                            $scope.Apply;
                            Loader.Hide();
                        } else {

                        }
                    },
                        function (response) { // optional
                            // failed
                        });

            
        }
    }
    $scope.radioChanged = function () {
        var Type = $scope.RdServices;
        ServiceType = Type;
        if (Type == "Services") {
            $("#Service").show();
            $("#Area").hide();
            $("#Area_ID").val('');
        }
        else if (Type == "Area") {
            $("#Service").hide();
            $("#Area").show();
            $("#Service_ID").val('');
        }
    }
    function hidebtn(Indexval) {
        $scope.Hidebtn = function () {
            return Indexval >= 0;
        }
        $scope.Showbtn = function () {
            return Indexval >= 0;
        }
    }

    function checkDuplicateInObject(propertyName, Service, inputArray) {
        var seenDuplicate = true;
        for (var i = 0; i < inputArray.length; i++) {
            if (inputArray[i].service_Type == propertyName && inputArray[i].service_ID == Service) {
                return seenDuplicate = false;
            }

        }
        return seenDuplicate;
    }
})





//app.value('$strapConfig', {
//    datepicker: {
//        language: 'fr',
//        format: 'M d, yyyy'
//    }
//});