'use strict';
define(function(require, exports) {

  var template = require("../templates/properties.html");

  angular.module('definerPageProperties', [])
  .controller('PagePropertiesController', function ($scope) {
  })
  .directive("definerPageProperties", ['$location', function ($location) {
    return {
      restrict: 'E',
      replace: false,
      template: template,
      controller: "PagePropertiesController",
      link: function ($scope, $element, $attrs) {
        
      }
    };
  }]);
});