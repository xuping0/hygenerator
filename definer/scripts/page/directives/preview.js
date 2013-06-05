'use strict';
define(function(require, exports) {

  var template = require("../templates/preview.html");

  angular.module('definerPagePreview', [])
  .controller('PagePreviewController', ['$scope', 'PageModel', function ($scope, PageModel) {
  }])
  .directive("definerPagePreview", ['$location', function ($location) {
    return {
      restrict: 'E',
      replace: false,
      template: template,
      controller: "PagePreviewController",
      link: function ($scope, $element, $attrs) {
        
      }
    };
  }]);
});