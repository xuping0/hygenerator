'use strict';
define(function(require, exports) {

  var template = require("../templates/list.html");

  angular.module('definerPageList', [])
  .controller('PageListController', ['$scope', 'PageService', function ($scope, PageService) {
    $scope.pages = PageService.list();
    $scope.selectedPage = PageService.getSelected();
    $scope.select = function(idx) {
      $scope.selectedPage = PageService.setSelected(idx);
    };
  }])
  .directive("definerPageList", ['$location', function ($location) {
    return {
      restrict: 'E',
      replace: false,
      template: template,
      controller: "PageListController",
      link: function ($scope, $element, $attrs) {
        
      }
    };
  }]);
});