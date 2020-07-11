var app = angular.module('Area', []);
var CityList = [];
var Languages = [];
var AreaDetails = [];
var fileList = [];
var AreaCode;
var CityID;
var AreaID = 0;
var Image_Name = "";
app.controller('Areamaster', function ($scope, $http, $window, $element) {
    $scope.CityList = ddlcity;
    $scope.Languages = LanguageList;
    AreaCode = AreaMasterCode;
   

    AreaID = AreaId;
    if (AreaID > 0) {
        debugger;
        $scope.AreaCode = AreaCode;
        $scope.AreaDetails = Details;
        AreaDetails = Details;
        CityID = CityId;       
    } else {
        $scope.AreaCode = AreaCode.code;
    }
    console.log(AreaCode);
    $scope.AddRow = function ()
    {
        debugger;
        var isvalid = checkDuplicateInObject($scope.ddlLanguage.language_Name, AreaDetails);
        if (isvalid == true) {
        AreaDetails.push({
            area_Lang_ID: 0,
            area_Name: $scope.AreaName,
            location: $scope.AreaAddress,
            area_Details: $scope.areadescription,
            area_ID: AreaID,
            language_ID: $scope.ddlLanguage.language_ID,
            language_Name: $scope.ddlLanguage.language_Name
        });

        //AreaDetails.push(data);
            console.log(AreaDetails);
            $scope.AreaDetails = AreaDetails;
            debugger;
            var InsertArealang = {};
            
                InsertArealang.area_Lang_ID = 0,
                InsertArealang.area_Name = $scope.AreaName,
                InsertArealang.location = $scope.AreaAddress,
                InsertArealang.area_Details = $scope.areadescription,
                InsertArealang.area_ID = AreaID,
                InsertArealang.language_ID = $scope.ddlLanguage.language_ID

            console.log(JSON.stringify(InsertArealang));
            if (AreaID > 0) {
                var post = $http({
                    method: "POST",
                    dataType: "json",
                    url: "/AreaMaster/Update",
                    data: JSON.stringify(InsertArealang),
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if(response.data.success == true) {
                        alert(response.data.responseText);
                        $window.location.href = "/AreaMaster/Create?id=" + response.data.id;
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
        UploadFile();
        //var ba = { AreaDetails };
        var data = {
            Area_ID: AreaID ,
            City_ID: $scope.ddlCityID.city_ID ,    
            Area_Code: $scope.AreaCode,
            Area_Image: Image_Name,
            AreaMasterLang: $scope.AreaDetails,           
        };

        console.log(JSON.stringify(data));
        //return $http.post("/AreaMaster/Create?AreaMasterObj=",Ar)
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/AreaMaster/CreateArea",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            debugger;
            if (response.data.success==true) {
                alert(response.data.responseText);
                $window.location.href="/AreaMaster/Index";  
            } else {
                
            }
        },
            function (response) { // optional
                // failed
            });
            
    }

    $scope.Clearvalues = function () {
        $scope.AreaName = "";
        $scope.AreaAddress = "";
        $scope.areadescription = "";
        hidebtn(-1)
    }

    $scope.Remove = function (index)
    {
        debugger;
        
        //Find the record using Index from Array.
        var name = AreaDetails[index].language_Name;
        var arealangID = AreaDetails[index].area_Lang_ID;
        var data = {};
        data = (AreaDetails[index])
        if ($window.confirm("Do you want to delete: " + name)) {
            //Remove the item from Array using Index.
            AreaDetails.splice(index, 1);
            if (arealangID > 0)
            {            
                var post = $http
                    ({
                         method: "POST",
                         dataType: "json",
                        url: "/AreaMaster/DeleteAreaLang",
                        data: JSON.stringify(data),
                         headers: { "Content-Type": "application/json" }
                    }).then(function (response)
                    {
                        if (response.data.success == true) {
                            alert(response.data.responseText);
                            $window.location.href = "/AreaMaster/Index";
                        } else
                                 {

                                  }
                   },
                        function (response)
                        { // optional
                    // failed
                });

            }
        }
    }
    var Index;
    $scope.SetValuetoModal = function (index)
    {
        debugger;
        Index = index;
        hidebtn(Index);
        $scope.AreaName = AreaDetails[index].area_Name;
        $scope.AreaAddress = AreaDetails[index].location;
        $scope.areadescription = AreaDetails[index].area_Details;
        $("#Language_ID").val(AreaDetails[index].language_ID);
        $("#Language_ID").attr("disabled", true);
    }
    $scope.Editvalues = function ()
    {
        var langid = parseInt($("#Language_ID").val());
        debugger;
        //Find the record using Index from Array.
        AreaDetails[Index].area_Name = $scope.AreaName,
        AreaDetails[Index].location = $scope.AreaAddress,
        AreaDetails[Index].area_Details= $scope.areadescription,
        AreaDetails[Index].area_ID = AreaID,
        AreaDetails[Index].language_ID = langid 
        var data = {};
        data= AreaDetails[Index]
        console.log(JSON.stringify(data))
        if (AreaID > 0) {
            var post = $http({
                method: "POST",
                dataType: "json",
                url: "/AreaMaster/Update",
                data: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data.success == true) {
                    alert(response.data.responseText);
                    $window.location.href = "/AreaMaster/Index";
                }else {

                }
            },
                function (response) { // optional
                    // failed
                });
        }

    }

    $scope.UpdateImage = function () {
        debugger;
       UploadFile();
        //var ba = { AreaDetails };   
        var data = {
            AreaId: AreaID,           
            Image: Image_Name,           
        };        
        //return $http.post("/AreaMaster/Create?AreaMasterObj=",Ar)
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/AreaMaster/UpdateImage",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            debugger;
            if (response.data.success == true) {
                AlertModel('Alert',response.data.responseText,'Ok');
                $window.location.href = "/AreaMaster/Index";
            } else {

            }
        },
            function (response) { // optional
                // failed
            });
    }

    $scope.SelectFile = function (element) {
        debugger;
        var files = element.files;

            fileList.push(files);
        console.log(fileList); 
    }
    function checkDuplicateInObject(propertyName, inputArray) {
        debugger;
        var seenDuplicate = true;
        for (var i = 0; i < inputArray.length; i++) {
            if (inputArray[i].language_Name == propertyName) {
                    return seenDuplicate=false;
                }
           
        }
        return seenDuplicate;
    }

    $scope.hideSavebtn = function ()
    {
        return AreaID >0;
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
    function UploadFile() {
        debugger;
        var imagen = 'Area-'+$scope.AreaCode;
        var fileUpload = $("#files").get(0);
        var files = fileUpload.files;
        var data = new FormData();
        data.append(files[0].name, files[0]);
        data.append('Image_Name', imagen);

        $.ajax({

            url: "/AreaMaster/Upload_File",
            type: "POST",            
            contentType: false,
            processData: false,
            data: data,
            async: false,
            success: function (message) {

                Image_Name = message;
            },
            error: function () {
                alert("Error!");
            },
        });

    }
});
