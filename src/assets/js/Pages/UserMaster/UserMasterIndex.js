var app = angular.module('UserMasterIndex', []);
var IndexDetails = [];
app.controller('UserMaster', function ($scope, $http, $window) {
    $scope.IndexDetails = Details;

    console.log(Details);

    $scope.Remove = function (index) {
        debugger;

        //Find the record using Index from Array.
        var name = Details[index].user_Name;
        var userid = Details[index].user_Id;
        var data = {};
        data = (Details[index])
        if ($window.confirm("Do you want to delete: " + name)) {
            //Remove the item from Array using Index.
           // AreaDetails.splice(index, 1);
            if (userid > 0) {
                var post = $http
                    ({
                        method: "POST",
                        dataType: "json",
                        url: "/UserMaster/DeleteUser",
                        data: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        if (response.data.success == true) {
                            alert(response.data.responseText);
                            $window.location.href = "/UserMaster/Index";
                        } else {

                        }
                    },
                        function (response) { // optional
                            // failed
                        });

            }
        }
    }
})
