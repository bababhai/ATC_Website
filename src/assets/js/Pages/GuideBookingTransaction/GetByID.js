
var app = angular.module('MyApp', ['angularUtils.directives.dirPagination']);
var IndexDetails = [];
var MasterInfo = null;
var Booking_ID = 0;
var Rating = 0;
app.controller('GetDtails', function ($scope, $http, $window) {

    debugger;
    MasterInfo = MasterData;
    $scope.tourist = MasterInfo.tourist
    $scope.from_Date = MasterInfo.from_Date
    $scope.touristEmail = MasterInfo.touristEmail
    $scope.to_Date = MasterInfo.to_Date
    $scope.Total = MasterInfo.order_Amount
    $scope.IndexDetails = Details;
    Booking_ID = MasterInfo.booking_ID;

    if (TestimonialDescription != null)
    {
        $scope.Testimonial_Dscription = TestimonialDescription.testimonial_Dscription;
    }





   //$scope.Testimonial_Dscription = TestimonialDescription.testimonial_Dscription;

    $scope.SubmitRting = function () {
        debugger;      
        var data = {
            Booking_ID:Booking_ID,
            Feedback :$scope.Feedback,
            Rating: Rating
        };
        console.log(JSON.stringify(data));
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/BookingTransaction/SubmitRating",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            debugger;
            if (response.data == true) {
                AlertModel('Alert', 'Rating has been Submited', 'Ok');
                $window.location.href = "/BookingTransaction/GetBookingByID?BookingID=" + Booking_ID + "";
            } else {

            }
        },
            function (response) { // optional
                // failed
            });
    }

    $scope.SubmitReason = function () {

        var data = {
            Booking_ID: Booking_ID,
            Rejection_Reason: $scope.Rejectio_Reason,
            Booking_Status: 'Reject'
        };
        console.log(JSON.stringify(data));
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/BookingTransaction/UpdateBookingStatus",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            debugger;
            if (response.data == true) {
                AlertModel('Alert', 'Reject Successfully', 'Ok');   
                $window.location.href = "/BookingTransaction/GetBookingByID?BookingID=" + Booking_ID + "";
            } else {

            }
        },
            function (response) { // optional
                // failed
            });
    }

    $scope.Approve = function () {

        var data = {
            Booking_ID: Booking_ID,
            Rejection_Reason: '',
            Booking_Status: 'Approve'
        };
        console.log(JSON.stringify(data));
        var post = $http({
            method: "POST",
            dataType: "json",
            url: "/BookingTransaction/UpdateBookingStatus",
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            debugger;
            if (response.data == true) {
                AlertModel('Alert', 'Approve Successfully', 'Ok');
                $window.location.href = "/BookingTransaction/GetBookingByID?BookingID=" + Booking_ID + "";
            } else {

            }
        },
            function (response) { // optional
                // failed
            });
    }

    $scope.rating = 0;
    $scope.ratings = [
        {
        current: 1,
        max: 5
    }];

    $scope.getSelectedRating = function (rating) {
        //console.log(rating);
        Rating = rating;
    }

    $scope.setMinrate = function () {
        $scope.ratings = [
            {
            current: 0,
            max: 5
        }];
    }

    //$scope.setMaxrate = function () {
    //    $scope.ratings = [
    //        {
    //        current: 0,
    //        max: 5
    //    }];
    //}

    $scope.sendRate = function () {
        alert("Thanks for your rates!\n\nFirst Rate: " + $scope.ratings[0].current + "/" + $scope.ratings[0].max
            + "\n" + "Second rate: " + $scope.ratings[1].current + "/" + $scope.ratings[0].max)
    }


    $scope.CreateTestimonial = function () {
       
        var data = {
            Testimonial_Dscription: $scope.Testimonial_Dscription
        };

        //Loader.Show("Wait...");
        $http({
            method: 'POST',
            url: '/Testimonial/Create',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).
            then(function (response) {
              

                if (response.data.success) {

                    //  AlertModel("Alert", "Profile Updated Successfully", "Ok");
                    AlertModel("Alert", "Testimonial Saved Successfully", "Ok");

                } else {

                    AlertModel("Alert", response.data.message, "Ok");
                }
                //Loader.Hide();

            });


    };

});

app.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
            '\u2605' +
            '</li>' +
            '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };

            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    }

    
})