'use strict';
define(function(require, exports) {

  var template = require("../templates/list.html");

  angular.module('definerPageList', [])
  .controller('PageListController', ['$scope', 'PageModel', function ($scope, PageModel) {
    $scope.selectedPage = PageModel.getSelected();
    $scope.pages = PageModel.list();
    $scope.select = function(idx) {
      $scope.selectedPage = PageModel.setSelected(idx);
    }
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