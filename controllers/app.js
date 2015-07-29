var app = angular.module('Droidaday', ['ngMaterial']);

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
        .warnPalette('red')
    ;
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

            var percentColors = [
                {pct: 0.0, color: {r: 0xf4, g: 0x43, b: 0x36}},
                {pct: 0.5, color: {r: 0xff, g: 0xc1, b: 0x07}},
                {pct: 1.0, color: {r: 0x4c, g: 0xaf, b: 0x50}}];


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
                return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
                // or output as hex if preferred
            };
        }
    };
});