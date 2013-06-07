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
    $scope.createPage = function() {
      PageService.create();
    }
    $scope.removePage = function() {
      if (!$scope.selectedPage) {
        alert('请选择页面!');
        return;
      }
      if ($scope.pages.length == 1) {
        alert("至少保留一个页面!");
        return;
      }
      if (confirm('您是否要删除该页面?')) {
        PageService.remove($scope.selectedPage);
      }
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