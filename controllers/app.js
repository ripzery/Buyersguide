var app = angular.module('Droidaday', ['ngMaterial']);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('light-green')
        .accentPalette('teal',{
            'default': '500',
            'hue-1' : '100',
            'hue-2' : '200',
            'hue-3' : '300'
        });
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