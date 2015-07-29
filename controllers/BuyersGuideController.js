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
                        //console.log($scope.models[outerKey].announceHistory[innerKey].date);
                    });
                });
            });
    };

    var percentColors = [
        {pct: 0.0, color: {r: 0xff, g: 0x00, b: 0}},
        {pct: 0.5, color: {r: 0xff, g: 0xff, b: 0}},
        {pct: 1.0, color: {r: 0x00, g: 0xff, b: 0}}];


    $scope.getColorForPercentage = function (pct) {
        for (var i = 1; i < percentColors.length - 1; i++) {
            if (pct < percentColors[i].pct) {
                break;
            }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (pct - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        console.log('rgb(' + [color.r, color.g, color.b].join(',') + ')');
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
        // or output as hex if preferred
    };

    $scope.init();
}]);