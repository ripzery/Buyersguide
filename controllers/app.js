var app = angular.module('Droidaday', ['ngMaterial']);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('pink')
});

app.directive('guideCard',function(){

    return{
        restrict: 'E',
        templateUrl: 'guideCard.html',
        scope: {
            model : '=model'
        }
    };
});