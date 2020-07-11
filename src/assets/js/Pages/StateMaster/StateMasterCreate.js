var app = angular.module('State', []);
var CountryList = [];
var Languages = [];
var StateDetails = [];
var fileList = [];
var StateCode;
var CountryID=0;
var StateID = 0;
//var StateName;
app.controller('Statemaster', function ($scope, $http, $window, $element) {
    debugger;
    $scope.CountryList = ddlCountryID;
    $scope.Languages = LanguageList;
    StateCode = StateMasterCode;        
    debugger;

    StateID = StateId;
    if (StateID > 0) {
        debugger;
        $scope.StateCode = StateCode;
        $scope.StateDetails = Details;
        StateDetails = Details;
        CountryID = Country_Id;        
    } else {
        $scope.StateCode = StateCode.code;
    }
    console.log(StateCode);
    $scope.AddRow = function () {

        var isvalid = checkDuplicateInObject($scope.ddlLanguage.language_Name, StateDetails);
        if (isvalid == true) {
            StateDetails.push({
                state_Lang_ID: 0,
                state_Name: $scope.StateName,
                //country_ID: CountryID,
                language_ID: $scope.ddlLanguage.language_ID,
                language_Name: $scope.ddlLanguage.language_Name
            });

            //AreaDetails.push(data);
            console.log(StateDetails);
            $scope.StateDetails = StateDetails;
            debugger;

            var InsertStatelang = {};

            InsertStatelang.state_Lang_ID = 0,
                InsertStatelang.state_Name = $scope.StateName,
                InsertStatelang.state_ID = StateID,
                InsertStatelang.language_ID = $scope.ddlLanguage.language_ID

            console.log(JSON.stringify(InsertStatelang));
            if (StateID > 0) {
                var post = $http({
                    method: "POST",
                    dataType: "json",
                    url: "/StateMaster/Update",
                    data: JSON.stringify(InsertStatelang),
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if (response.data.success == true) {
                        alert(response.data.responseText);
                        $window.location.href = "/StateMaster/Create?id=" + response.data.id;
                    } else {

                    }
                },
                    function (response) { // optional
                        // failed
                    });
            }

        }
        else {
            alert('This languege is already added')
        }

    }

    $scope.SaveRecord = function () {
        debugger;
        //var ba = { AreaDetails };
        var data = {
            State_ID: StateID,
            Country_ID: $scope.ddlCountryID.country_ID,
            State_Code: $scope.StateCode,
            StateMasterLang: $scope.StateDetails,
        };

        console.log(JSON.stringify(data));
        //return $http.post("/AreaMaster/Create?AreaMasterObj=",Ar)
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/StateMaster/CreateState",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            debugger;
            if (response.data.success == true) {
                alert(response.data.responseText);
                $window.location.href = "/StateMaster/Index";
            } else {

            }
        },
            function (response) { // optional
                // failed
            });

    }

    $scope.Clearvalues = function () {
        $scope.StateName = "";
        hidebtn(-1)
    }

    $scope.Remove = function (index) {
        debugger;

        //Find the record using Index from Array.
        var name = StateDetails[index].language_Name;
        var statelangID = StateDetails[index].state_Lang_ID;
        var data = {};
        data = (StateDetails[index])
        if ($window.confirm("Do you want to delete: " + name)) {
            //Remove the item from Array using Index.
            StateDetails.splice(index, 1);
            if (statelangID > 0) {
                var post = $http
                    ({
                        method: "POST",
                        dataType: "json",
                        url: "/StateMaster/DeleteStateLang",
                        data: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        if (response) {

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
        $scope.StateName = StateDetails[index].state_Name;
        $("#Language_ID").val(StateDetails[index].language_ID);
        $("#Language_ID").attr("disabled", true);
        //$scope.StateCode = StateDetails[index].state_Code;        
        //$scope.StateAddress = AreaDetails[index].location;
        //$scope.areadescription = AreaDetails[index].area_Details;
    }
    $scope.Editvalues = function () {        
        var langid = parseInt($("#Language_ID").val());
        debugger;
        //Find the record using Index from Array.
        StateDetails[Index].state_Name = $scope.StateName,           
            StateDetails[Index].state_ID = StateID,
            StateDetails[Index].language_ID = langid            
        var data = {};
        data = StateDetails[Index]
        console.log(JSON.stringify(data))
        if (StateID > 0) {
            var post = $http({
                method: "POST",
                dataType: "json",
                url: "/StateMaster/Update",
                data: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data.success == true) {
                    alert(response.data.responseText);
                    $window.location.href = "/StateMaster/Index";
                } else {

                }
            },
                function (response) { // optional
                    // failed
                });
        }

    }
    $scope.SelectFile = function (element) {
        debugger;
        var files = element.files;

        fileList.push(files);
        console.log(fileList);
    }
    function checkDuplicateInObject(propertyName, inputArray) {
        //debugger;
        var seenDuplicate = true;
        for (var i = 0; i < inputArray.length; i++) {
            if (inputArray[i].language_Name == propertyName) {
                return seenDuplicate = false;
            }

        }
        return seenDuplicate;
    }

    $scope.hideSavebtn = function () {
        return StateID > 0;
    }


    function hidebtn(Indexval) {
        debugger;
        $scope.Hidebtn = function () {
            return Indexval >= 0;
        }
        $scope.Showbtn = function () {
            return Indexval >= 0;
        }
    }

});
