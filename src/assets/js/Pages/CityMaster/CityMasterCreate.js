var app = angular.module('City', []);
var Country = [];
var Languages = [];
var CityDetails = [];
var Citycode="";
var StateID=0;
var City_ID = 0;
var StateList=[];
app.controller('CityMaster', function ($scope, $http, $window)
{
    debugger;
    $scope.Country = CountryList;
    $scope.Languages = LanguageList;
    Citycode = CityMasterCode;
    City_ID = CityId;
    if (City_ID > 0) {
        debugger;
        $scope.CityCode = Citycode;
        $scope.CityDetails = Details;
        CityDetails = Details;
        CityID = CityId;
        StateList = StateDetails;
        $scope.StateList = StateList;
    } else {
        $scope.CityCode = Citycode.code;
    }


    $scope.AddRow = function () {
        debugger;
        var isvalid = checkDuplicateInObject($scope.ddlLanguage.language_Name, CityDetails);
        if (isvalid == true) {
            CityDetails.push({
                city_Lang_ID: 0,
                city_Name: $scope.CityName,
                city_ID: CityId,
                language_ID: $scope.ddlLanguage.language_ID,
                language_Name: $scope.ddlLanguage.language_Name
            });            
            console.log(CityDetails);
            $scope.CityDetails = CityDetails;

            var InsertCityLang = {};

                InsertCityLang.city_Lang_ID = 0,
                InsertCityLang.city_Name = $scope.CityName,
                InsertCityLang.city_ID = CityId,
                InsertCityLang.language_ID = $scope.ddlLanguage.language_ID,
                InsertCityLang.language_Name = $scope.ddlLanguage.language_Name

            console.log(JSON.stringify(InsertCityLang));
            if (City_ID > 0) {
                var post = $http({
                    method: "POST",
                    dataType: "json",
                    url: "/CityMaster/Update",
                    data: JSON.stringify(InsertCityLang),
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if (response.data.success == true) {
                        AlertModel('Alert',response.data.responseText,'Ok');
                        $window.location.href = "/CityMaster/Index";
                    } else {

                    }
                },
                    function (response) { // optional
                        // failed
                    });
            }

        }
        else {
            AlertModel('Alert','This languege is already added','Ok')
        }

    }

    $scope.SaveRecord = function () {
        debugger;
        //var ba = { AreaDetails };
        var data = {
            City_ID: City_ID,
            State_ID: $scope.ddlStateId.state_ID,
            City_Code: $scope.CityCode,
            CitymasterLang: $scope.CityDetails,
        };

        console.log(JSON.stringify(data));
        //return $http.post("/AreaMaster/Create?AreaMasterObj=",Ar)
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/CityMaster/CreateCity",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            debugger;
            if (response.data.success == true) {
                alert(response.data.responseText);
                $window.location.href = "/CityMaster/Index";
            } else {

            }
        },
            function (response) { // optional
                // failed
            });

    }

    $scope.Clearvalues = function () {
        $scope.CityName = "";       
        hidebtn(-1)
    }


    $scope.Remove = function (index) {
        debugger;

        //Find the record using Index from Array.
        var name = CityDetails[index].language_Name;
        var CitylangID = CityDetails[index].city_Lang_ID;
        var data = {};
        data = (CityDetails[index])
        if ($window.confirm("Do you want to delete: " + name)) {
            //Remove the item from Array using Index.
            CityDetails.splice(index, 1);
            if (CitylangID > 0) {
                var post = $http
                    ({
                        method: "POST",
                        dataType: "json",
                        url: "/CityMaster/DeleteCityLang",
                        data: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        if (response.data.success == true) {
                            AlertModel('Alert', response.data.responseText, 'Ok');
                            $window.location.href = "/CityMaster/Index";
                        } else {

                        }
                    },
                        function (response) { // optional
                            // failed
                        });

            }
        }
    }
    var Index;
    $scope.SetValuetoModal = function (index) {
        debugger;
        Index = index;
        hidebtn(Index);
        $scope.CityName = CityDetails[index].city_Name;
        $("#Language_ID").val(CityDetails[index].language_ID);
        $("#Language_ID").attr("disabled", true);
    }
    $scope.Editvalues = function () {
        debugger;
        var Langid = parseInt( $("#Language_ID").val());       
        var data = {};
        //Find the record using Index from Array.
            CityDetails[Index].city_Name = $scope.CityName,
                CityDetails[Index].city_ID = City_ID,
                
        CityDetails[Index].language_ID = Langid,
                //CityDetails[Index].language_Name = $scope.ddlLanguage.language_Name,
       
        data = CityDetails[Index]
        console.log(JSON.stringify(data))
        if (City_ID > 0) {
            var post = $http({
                method: "POST",
                dataType: "json",
                url: "/CityMaster/Update",
                data: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data.success == true) {
                    AlertModel('Alert', response.data.responseText, 'Ok');
                    $window.location.href = "/CityMaster/Index";
                } else {

                }
            },
                function (response) { // optional
                    // failed
                });
        }

    } 

    function checkDuplicateInObject(propertyName, inputArray) {
        debugger;
        var seenDuplicate = true;
        for (var i = 0; i < inputArray.length; i++) {
            if (inputArray[i].language_Name == propertyName) {
                return seenDuplicate = false;
            }

        }
        return seenDuplicate;
    }

    $scope.hideSavebtn = function () {
        return City_ID > 0;
    }


    function hidebtn(Indexval)
    {
        debugger;
        $scope.Hidebtn = function () {
            return Indexval >= 0;
        }
        $scope.Showbtn = function () {
            return Indexval >= 0;
        }
    }


    $scope.GetState = function () {
        var data = {
            Country_ID: $scope.ddlCountry.country_ID,
    }
         
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/CityMaster/GetStateList",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            if (response != null) {
                console.log(response.data);
                StateList = response.data;
                $scope.StateList = StateList;
            } else {

            }
        },
            function (response) { // optional
                // failed
            });
    }
})