var app = angular.module('TestimonialIndex', ['angularUtils.directives.dirPagination']);
var IndexDetails = [];
app.controller('Testimonial', function ($scope, $http) {
    $scope.IndexDetails = TestimonialIndexDetails;
    var testimonial_Dscription = TestimonialDescription;
    var TestimonialDescriptionCreatedBy= JSON.stringify(testimonial_Dscription.testimonial_Dscription);
    $scope.Testimonial_Dscription = TestimonialDescriptionCreatedBy;

   
    $scope.CreateTestimonial = function () {
        debugger;
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
                debugger;

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