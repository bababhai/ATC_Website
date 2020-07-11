
var app = angular.module('MyApp', []);
app.controller('GuideDetails', function ($scope, $http, $window) {
    var minDate = new Date();
    var maxDate = "2020-03-21"
    var Paymentype = [];
    var AreaOfExpertiese = [];
    var Services = [];
    var paymentTypeID;
    $scope.Total = 0;
    var Calculateddata = [];
    var total = 0;
    var No_of_Days = 0;
    var hours = 0;
    $scope.GetBookingDetail = function () {
        Clearvalues();
        Loader.Show();
        var profileId =parseInt($("#ProfileID").val());
       
        var post = $http({
            method: "GET",
            url: "/GuideDetails/GetBookingdetails?UserProfileID=" + profileId,
            
        }).then(function (response) {
            if (response != null) {
         $scope.GuidePaymenttype = response.data.paymentType;
        $scope.Guideservices = response.data.gBookingService;
                $scope.GuideAreaofexperties = response.data.gBookingAreaExpertise;  
                Loader.Hide();
            } else {

            }
        },
            function (response) { // optional
                // failed
            });
    }
   
    $scope.BookingSave = function () {
        debugger;
            var profileId = parseInt($("#ProfileID").val());
            var guiarea = [];
            angular.forEach($scope.GuideAreaofexperties, function (a) {
                if (!!a.Selected) AreaOfExpertiese.push(a.guide_Service_Cost_ID);
            });
            angular.forEach($scope.Guideservices, function (s) {
                if (!!s.Selected) Services.push(s.guide_Service_Cost_ID);
            });
            for (i = 0; i <= AreaOfExpertiese.length; i++) {
                guiarea.push($scope.GuideAreaofexperties.find(x => x.guide_Service_Cost_ID == AreaOfExpertiese[i]));
            }
            for (i = 0; i <= Services.length; i++) {
                guiarea.push($scope.Guideservices.find(x => x.guide_Service_Cost_ID == Services[i]));
            }
            guiarea = guiarea.filter(function (element) {
                return element !== undefined;
            });
            var data = {
                Guide_ID: profileId,
                Payment_Type_ID: paymentTypeID,
                From_Date: $("#From_Date").val(),
                To_Date: $("#To_Date").val(),
                Order_Amount: $scope.Total,
                Number_Of_Person: parseInt($scope.No_Of_Persons),
                BookingDetails: guiarea,
            };
            console.log(JSON.stringify(data));
            var post = $http({
                method: "POST",
                dataType: "json",
                url: "/GuideDetails/CreateGuideBooking",
                data: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                debugger;
                console.log(response);
                if (response.data.success == true) {
                    $scope.Messege = response.data.message
                    $("#MessegeModal").modal('show');
                    //AlertModel('Alert', 'Request Submitted Successfully!', 'Ok');
                    Clearvalues();
                } else {

                }
            },
                function (response) { // optional
                    // failed
                });
    }
    $scope.Getselectedcost = function (s,Selected) {
        debugger;
        if (hours > 0 || No_of_Days > 0) {
            Calculation(s, Selected);
        }
        //else {
        //   // AlertModel('Alert', 'Select Date', 'Ok'); 
        //    Clearvalues();
        //}
    }
    $scope.CheckBox_Payment = function (position, entities) {
        debugger;
        angular.forEach(entities, function (p, index) {
            if (position != index)
                p.checked = false;
            if (position == index)
                paymentTypeID = entities[position].payment_Type_ID;
        });
    }
    $scope.Bookingdate = function () {
        debugger;       
        Paymentype = [];
        AreaOfExpertiese = [];
        Services = [];
        paymentTypeID;
        $scope.Total = 0;
        total = 0;
        var profileId = parseInt($("#ProfileID").val());
        var d1 =new Date($("#To_Date").val());
        var d2 = new Date($("#From_Date").val());
        var diff = d1.getTime() - d2.getTime();
         No_of_Days = diff / (1000 * 3600 * 24); 
        hours = Math.abs(d1 - d2) / 36e5;
        var guiarea = [];
        angular.forEach($scope.GuideAreaofexperties, function (a) {
            if (!!a.Selected) AreaOfExpertiese.push(a.guide_Service_Cost_ID);
        });
        angular.forEach($scope.Guideservices, function (s) {
            if (!!s.Selected) Services.push(s.guide_Service_Cost_ID);
        });
        for (i = 0; i <= AreaOfExpertiese.length; i++) {
            guiarea.push($scope.GuideAreaofexperties.find(x => x.guide_Service_Cost_ID == AreaOfExpertiese[i]));
        }
        for (i = 0; i <= Services.length; i++) {
            guiarea.push($scope.Guideservices.find(x => x.guide_Service_Cost_ID == Services[i]));
        }
        guiarea = guiarea.filter(function (element) {
            return element !== undefined;
        });
        for (i = 0; i <= guiarea.length; i++) {
            Calculation(guiarea[i],true);
        }
        var post = $http({
            method: "GET",
            url: "/GuideDetails/GetGuideBookingdetails?guideid=" + profileId+"&todate=" + $("#To_Date").val() + "&fromdate=" + $("#From_Date").val()+"",

        }).then(function (response) {
            if (response != null) {
                if (response.data != true) {
                   $("#To_Date").val('');
                    $("#From_Date").val('');
                    AlertModel('Alert', 'Guide is Booked for this date!', 'Ok');
                }
            } else {

            }
        },
            function (response) { // optional
                // failed
            });
    }
        function Clearvalues() {
            $(".pcheckUncheck").prop("checked", false);
            $(".acheckUncheck").prop("checked", false);
            $(".scheckUncheck").prop("checked", false);
            $(".pcheckUncheck").trigger("click");
            $(".acheckUncheck").trigger("change");
            $(".scheckUncheck").trigger("change");
            $("#To_Date").val('');
            $("#From_Date").val(''); 
            $("#No_Of_Persons").val('');
            Paymentype = [];
             AreaOfExpertiese = [];
             Services = [];
             paymentTypeID;
            $scope.Total = 0;
             total = 0;
             No_of_Days = 0;
             hours = 0;
    }
    function Calculation(value, Selected) {
        if (Selected == true) {
            if (isPropertyDefined(value)) {
                if (value.cost_Type_Name == 'hr') {
                    total += value.cost * hours;
                    $scope.Total = total;
                }
                if (value.cost_Type_Name == 'day') {
                    total += value.cost * No_of_Days;
                    $scope.Total = total;
                }
                if (value.cost_Type_Name == 'pack') {
                    total += value.cost;
                    $scope.Total = total;
                }
            }
        }
        else {
            if (value.cost_Type_Name == 'hr') {
                total -= value.cost * hours;
                $scope.Total = total;
            }
            if (value.cost_Type_Name == 'day') {
                total -= value.cost * No_of_Days;
                $scope.Total = total;
            }
            if (value.cost_Type_Name == 'pack') {
                total -= value.cost;
                $scope.Total = total;
            }
        }
    }
});