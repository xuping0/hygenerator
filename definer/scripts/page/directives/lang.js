'use strict';
define(function(require, exports) {

  var template = require("../templates/lang.html");

  angular.module('definerPageLangSelect', [])
  .controller('PageLangSelectController', ['$scope', 'PageService', function ($scope, PageService) {
    
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