'use strict';
define(function(require, exports) {

  var template = require("../templates/properties.html");

  angular.module('definerPageProperties', [])
  .controller('PagePropertiesController', ['$scope', 'PageService', function ($scope, PageService) {
    $scope.$watch('selectedPage.name', function() {
        PageService.save($scope.selectedPage);
    });
  }])
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