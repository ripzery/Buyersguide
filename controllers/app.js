var app = angular.module('Droidaday', ['ngMaterial']);

var _theme;
var _palettes;

app.config(function($mdThemingProvider) {

    $mdThemingProvider.definePalette('progressPalette',{
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('amber')
        .warnPalette('red');

    _theme = $mdThemingProvider.theme();
    _palettes = $mdThemingProvider._PALETTES;
});

app.directive('guideCard',function(){

    return{
        restrict: 'E',
        templateUrl: 'guideCard.html',
        scope: {
            model : '=model'
        },
        controller: function ($scope) {

            $scope.lastReleasePercent = $scope.model.announceCount / $scope.model.announceAverage * 100;
            console.log($scope.lastReleasePercent);

            $scope.setTextColor = function () {
                if ($scope.lastReleasePercent >= 90) {
                    $scope.textColor = 'warn.hue-2';
                } else if ($scope.lastReleasePercent >= 80) {
                    $scope.textColor = 'warn.500';
                } else if ($scope.lastReleasePercent >= 70) {
                    $scope.textColor = 'warn.hue-1';
                } else if ($scope.lastReleasePercent >= 60) {
                    $scope.textColor = 'accent.hue-3';
                } else if ($scope.lastReleasePercent >= 50) {
                    $scope.textColor = 'accent.hue-2';
                } else if ($scope.lastReleasePercent >= 40) {
                    $scope.textColor = 'primary.hue-1';
                } else if ($scope.lastReleasePercent >= 30) {
                    $scope.textColor = 'primary.500';
                } else if ($scope.lastReleasePercent >= 20) {
                    $scope.textColor = 'primary.hue-2';
                } else {
                    $scope.textColor = 'primary.hue-3';
                }
            };

            $scope.setTextColor();
        }
    };
});

app.directive('mdStyleColor',
    function ($mdColorPalette) {
        return {
            restrict: 'A',
            scope: {mdStyleColor: '='},
            link: function (scope, element, attrs) {
                for (var p in scope.mdStyleColor) {
                    if (scope.mdStyleColor.hasOwnProperty(p)) {

                        var themeColors = _theme.colors;

                        var split = (scope.mdStyleColor[p] || '').split('.');
                        if (split.length < 2) split.unshift('primary');

                        var hueR = split[1] || 'hue-1';    // 'hue-1'
                        var colorR = split[0] || 'primary';  // 'warn'

                        // Absolute color: 'orange'
                        var colorA = themeColors[colorR] ?
                            themeColors[colorR].name : colorR;

                        // Absolute Hue: '500'
                        var hueA =
                            themeColors[colorR] ?
                            themeColors[colorR].hues[hueR] || hueR :
                                hueR;

                        var colorValue = _palettes[colorA][hueA] ?
                            _palettes[colorA][hueA].value :
                            _palettes[colorA]['500'].value;

                        element.css(p, 'rgb(' + colorValue.join(',') + ')');

                    }
                }
            }
        }
    });