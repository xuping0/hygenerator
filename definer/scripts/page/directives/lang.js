'use strict';
define(function(require, exports) {

  var template = require("../templates/lang.html");

  angular.module('definerPageLangSelect', [])
  .controller('PageLangSelectController', ['$scope', 'PageService', 'PreviewService', function ($scope, PageService, PreviewService) {
    $scope.changeLang = function(lang) {
      $scope.previewSetting.lang = lang;
      PreviewService.save();
    }
  }])
  .directive("definerPageLangSelect", ['$location', function ($location) {
    return {
      restrict: 'E',
      replace: false,
      template: template,
      controller: "PageLangSelectController",
      link: function ($scope, $element, $attrs) {
        
      }
    };
  }]);
});