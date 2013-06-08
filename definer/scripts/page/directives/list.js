'use strict';
define(function(require, exports) {

  var template = require("../templates/list.html");

  angular.module('definerPageList', [])
  .controller('PageListController', ['$scope', 'PageService', 'PreviewService', function ($scope, PageService, PreviewService) {

    // 设置应用id
    PageService.setAppId($scope.selectedApp.id);
    // 列表初始化
    $scope.pages = PageService.list();

    // 选择
    $scope.select = function(idx) {
      $scope.selectedPage = PageService.setSelected(idx);
      PreviewService.save($scope.selectedPage);
    };
    $scope.select(0);

    // 新增
    $scope.createPage = function() {
      PageService.create();
      $scope.select($scope.pages.length - 1);
    }

    // 删除
    $scope.unremoveable = false;
    $scope.$watch('pages.length', function() {
      if ($scope.pages.length === 1) {
        $scope.unremoveable = true;
      } else {
        $scope.unremoveable = false;
      }
    });
    $scope.removePage = function() {
      if (!$scope.selectedPage) {
        alert('请选择页面!');
        return;
      }
      if (confirm('您是否要删除该页面?')) {
        PageService.remove($scope.selectedPage);
        $scope.selectedPage = PageService.setSelected(0);
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