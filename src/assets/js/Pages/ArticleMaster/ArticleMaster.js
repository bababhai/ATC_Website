var app = angular.module("Article", []);

var Articlecode;
var Languages = [];
var ArticleDetails = [];
var Article_ID = 0;
var Nationality_ID;
var IndexDetails = [];


app.controller('ArticleCtrl', function ($scope, $http, $window) {

    Articlecode = ArticleMasterCode.code;
    Article_ID = ArticleID;
  
    $scope.Languages = LanguageList;
    $scope.Articlecode = Articlecode;

    

    $scope.ArticleDetails = Details;
    $scope.ArticleID = Article_ID;

    if (Article_ID > 0) {
        

        $scope.Articlecode = ArticleMasterCode;
        $scope.ArticleDetails = Details;

    }


    
    $scope.AddRow = function () {
        
        var isvalid = checkDuplicateInObject($scope.ddlLanguage.language_Name, ArticleDetails);
        if (isvalid === true) {

            ArticleDetails.push({
                article_Title: $scope.Article_Title,
                article_Detail: $scope.Article_Detail,
                language_ID: $scope.ddlLanguage.language_ID,
                language_Name: $scope.ddlLanguage.language_Name
            });

        }
        $scope.ArticleDetails = ArticleDetails;
    };



    $scope.SaveRecord = function () {

        
        var data = {
            Article_ID: ArticleID,
            Article_Code: $scope.Articlecode,
            ListDetail: $scope.ArticleDetails
        };

         console.log(JSON.stringify(data));

        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/ArticleMaster/CreateArticle",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {

            if (response.data.success === true) {
               
                alert(response.data.responseText);
                $window.location.href = "/ArticleMaster/Index"; 
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
        var ArticleDet = Details;
         var ArticleTitle=  ArticleDet[index].article_Title;
        var ArticleDetails = ArticleDet[index].article_Detail;

        //Find the record using Index from Array.
        var Article = ArticleTitle;
        var ArticleDetailsLangID = ArticleDetails;
        var data = {};
        data = (ArticleDet[index]);
        if ($window.confirm("Do you want to delete: " + Article)) {
            //Remove the item from Array using Index.
            ArticleDet.splice(index, 1);
            debugger;
            //if (ArticleDetailsLangID > 0) {
               
                var post = $http
                    ({
                        method: "POST",
                        dataType: "json",
                        url: "/ArticleMaster/DeleteArticle",
                        data: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        //if (response) {
                        debugger;
                        bootbox.alert("Delete");
                        $window.location.href = "/ArticleMaster/Index";
                        
                        
                        //}
                    });

            //}
        }
    };


    var Index;
  
    $scope.SetValuetoModal = function (index) {
        debugger;
        Index = index;
        hidebtn(Index);
        var Article = Details;
       

        $scope.Article_Title = Article[Index].article_Title;
        $scope.Article_Detail = Article[index].article_Detail;

        $scope.Language_ID = Article[index].article_Detail;
        $("#Language_ID").val(Article[index].language_ID);
        
    };


 
    $scope.Editvalues = function () {
        debugger;
        //Find the record using Index from Array.
        var Article = Details;

        Article[Index].article_Title = $scope.Article_Title;
        Article[Index].article_Detail = $scope.Article_Detail;


        //Article[Index].language_ID = $scope.ddlLanguage.Language_ID;
        //Article[Index].language_Name = $scope.ddlLanguage.Language_ID;



        //ArticleDetails[Index].article_Title = $scope.Article_Title;
        //ArticleDetails[Index].article_Detail = $scope.Article_Detail;
        //ArticleDetails[Index].language_ID = $scope.ddlLanguage.Language_ID;
        //ArticleDetails[Index].language_Name = $scope.ddlLanguage.language_Name;
        //console.log(CountryDetails[Index]);
        var data = {};
        //data = ArticleDetails[Index];
        data = Article[Index];

        // console.log(JSON.stringify(data));
        //if (Country_ID > 0) {
        var post = $http({
            
                method: "POST",
                dataType: "json",
                url: "/ArticleMaster/Update",
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
        //}

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

