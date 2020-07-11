var app = angular.module('UMaster', []);
var Emp;
var RoleList = [];
var GenderList = [];
app.controller('usermasterctrl', function ($http, $scope, $window) {
    debugger;
    Emp = UserMaster;
    $scope.RoleList = RolesLst;
    $scope.GenderList = GenderLst;

    console.log(GenderLst)

   // console.log(UserMaster);

    $scope.User_ID = Emp.user_Id,
        $scope.User_Name = Emp.user_Name;
    $scope.Password = Emp.password;
    $scope.Email_ID = Emp.email_ID;
    $scope.Gmail_Email_ID = Emp.gmail_Email_ID;
    $scope.Facebook_Email_ID = Emp.facebook_Email_ID;
    $scope.Phone_No = Emp.phone_No;
    $scope.Active_Flag = Emp.active_Flag;
    $scope.Full_Name_L1 = Emp.full_Name_L1;
    //var Gender_ID = $scope.ddlGender_ID;
  //  cosole.log(GenderID)
    $scope.ddlGender_ID = Emp.gender_ID;
    $scope.ddlRoleList = Emp.role_ID;
    debugger;
   

    $scope.CreateUser = function (Emp) {
        debugger;
        var genderid = parseInt($("#Gender_ID").val())||0;
        var roleid = parseInt($("#Role_ID").val()) || 0;

        var data = {
          
            User_ID:$scope.User_ID ,
            User_Name:$scope.User_Name ,
            Password:$scope.Password ,
            Email_ID:$scope.Email_ID,
            Gmail_Email_ID:$scope.Gmail_Email_ID ,
            Facebook_Email_ID:$scope.Facebook_Email_ID ,
            Phone_No:$scope.Phone_No ,
            Active_Flag: $scope.Active_Flag,
            Full_Name_L1: $scope.Full_Name_L1,
            Gender_ID: genderid,
            Role_ID: roleid

            
        };
        console.log(data);
        $http({
            method: 'POST',
            url: '/UserMaster/CreateUser',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).
            then(function (response) {

                //alert(response.data);
                $window.location.href = "/UserMaster/Index";
                return response.data;
               
            });
    };

    $scope.Remove = function (index) {
        debugger;
        var ArticleDet = Details;
        var ArticleTitle = ArticleDet[index].article_Title;
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
                    url: "/UserMaster/DeleteArticle",
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


});








































