var app = angular.module("Country", []);

var Countrycode;
var Languages = [];
var CountryDetails = [];
var Country_ID=0;
var Nationality_ID;
var IndexDetails = [];


app.controller('CountryCtrl', function ($scope, $http, $window) {
    $scope.NationalityList = ddlNationality;
    Countrycode = CountryMasterCode.code;
    Country_ID = CountryID;
    Nationality_ID=NationalityID;
    $scope.Languages = LanguageList;
    $scope.CountryCode = Countrycode;
    $scope.CountryDetails = Details;
    $scope.CountryID = Country_ID;
    $scope.Nationality_ID = Nationality_ID;

    if (Country_ID > 0) {
        debugger;

        $scope.CountryCode = CountryMasterCode;
        CountryDetails = Details;

    }

    debugger;
    $scope.AddRow = function () {
        
        var isvalid = checkDuplicateInObject($scope.ddlLanguage.language_Name, CountryDetails);
        if (isvalid === true) {

            CountryDetails.push({
                country_Name: $scope.Country_Name,
                language_ID: $scope.ddlLanguage.language_ID,
                language_Name: $scope.ddlLanguage.language_Name
            });
           
        }
        $scope.CountryDetails = CountryDetails;
    };


    debugger;
    $scope.SaveRecord = function () {
     
        var data = {
            Country_ID: CountryID,
            Nationality_ID: $scope.ddlNationality.nationality_ID,
            Country_Code: $scope.CountryCode,
            CountryMasterLang: $scope.CountryDetails
        };

       // console.log(JSON.stringify(data));
       
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/CountryMaster/CreateCountry",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
          
            if (response.data.success === true) {
                alert(response.data.responseText);
            }
        });

    };


    $scope.Clearvalues = function () {
        $scope.AreaName = "";
        $scope.AreaAddress = "";
        $scope.areadescription = "";
        hidebtn(-1)
    }


    $scope.Remove = function (index) {
        debugger;

        //Find the record using Index from Array.
        var Country = CountryDetails[index].country_Name;
        var countryLangID = CountryDetails[index].country_Lang_ID;
        var data = {};
        data = (CountryDetails[index]);
        if ($window.confirm("Do you want to delete: " + Country)) {
            //Remove the item from Array using Index.
            CountryDetails.splice(index, 1);
            if (countryLangID > 0) {
                var post = $http
                    ({
                        method: "POST",
                        dataType: "json",
                        url: "/CountryMaster/DeleteCountryLang",
                        data: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        //if (response) {

                        //}
                    });

            }
        }
    };


    var Index;
    $scope.SetValuetoModal = function (index) {
        Index = index;
        hidebtn(Index);
      //  console.log(CountryDetails);
        $scope.Country_Name = CountryDetails[index].country_Name;
    };


    debugger;
    $scope.Editvalues = function () {
        debugger;
        //Find the record using Index from Array.
        CountryDetails[Index].country_Name = $scope.Country_Name;
        //CountryDetails[Index].language_ID = $scope.ddlLanguage.Language_ID;
        //CountryDetails[Index].language_Name = $scope.ddlLanguage.language_Name;
        //console.log(CountryDetails[Index]);
        var data = {};
        data = CountryDetails[Index];
       // console.log(JSON.stringify(data));
        if (Country_ID > 0) {
            var post = $http({
                method: "POST",
                dataType: "json",
                url: "/CountryMaster/Update",
                data: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                //if (response) {

                //} else {

                //}
            },
                function (response) { // optional
                    // failed
                });
        }

    };
    $scope.SelectFile = function (element) {
        debugger;
        var files = element.files;

        fileList.push(files);
      //  console.log(fileList);
    };

    function checkDuplicateInObject(propertyName, inputArray) {
        
        var seenDuplicate = true;
        for (var i = 0; i < inputArray.length; i++) {
            if (inputArray[i].language_Name === propertyName) {
                return seenDuplicate = false;
            }

        }
        return seenDuplicate;
    }

     function hidebtn(Indexval) {
        $scope.Hidebtn = function () {
            return Indexval >= 0;
        }
        $scope.Showbtn = function () {
            return Indexval >= 0;
        }
    }

});

