/**
 * Created by visit on 7/25/15 AD.
 */
app.controller('BuyersGuideController',['$scope','$http',function($scope,$http){
    $scope.mode = 'determinate';
    $scope.day = 365;
    $scope.determinateValue = 30;
    $scope.modelName = "Iphone 6";
    $scope.hint = "buy now";
    $scope.isShownRecentRelease = false;
    $scope.models = {};
    $scope.allMonthes = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    $scope.init = function(){
        $http.get('http://buyersguide.droidaday.com/labs/buyers/api/v1/getAllLatestModels.php')
            .success(function(data, status, headers, config){
                $scope.models = data;
                angular.forEach(data,function(value,outerKey){
                    angular.forEach(value.announceHistory, function(value,innerKey){
                        var date = new Date(value.date);
                        $scope.models[outerKey].announceHistory[innerKey].date = $scope.allMonthes[date.getMonth()] + " " + date.getUTCFullYear();
                        console.log($scope.models[outerKey].announceHistory[innerKey].date);
                    });
                });
            });
    };

    $scope.init();
}]);