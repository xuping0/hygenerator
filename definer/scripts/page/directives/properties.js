'use strict';
define(function(require, exports) {

  var template = require("../templates/properties.html");

  angular.module('definerPageProperties', [])
  .controller('PagePropertiesController', ['$scope', 'PageService', function ($scope, PageService) {
    function savePage() {
      PageService.save($scope.selectedPage);
    };

    $scope.unlock = function() {
      $scope.selectedPage.locked = false;
      setHeaderTextDisabled();
      savePage();
    };

    $scope.lock = function() {
      $scope.selectedPage.locked = true;
      setHeaderTextDisabled();
      savePage();
    };

    $scope.$watch('selectedPage.name', function() {
      savePage();
    });

    $scope.showHeader = function() {
      $scope.selectedPage.header.enabled = true;
      savePage();
    };
    $scope.hideHeader = function() {
      $scope.selectedPage.header.enabled = false;
      savePage();
    };

    $scope.headerTextDisabled = true;
    function setHeaderTextDisabled() {
      $scope.headerTextDisabled = $scope.selectedPage.locked;
      if (!$scope.selectedPage.locked) {
        $scope.headerTextDisabled = !$scope.selectedPage.header.label.enabled;
      }
    };
    setHeaderTextDisabled();
    $scope.showHeaderText = function() {
      $scope.selectedPage.header.label.enabled = true;
      setHeaderTextDisabled()
      savePage();
    };
    $scope.hideHeaderText = function() {
      $scope.selectedPage.header.label.enabled = false;
      savePage();
      setHeaderTextDisabled();
    };
    $scope.$watch('selectedPage.header.label.text.cn', function() {
      savePage();
    });
    $scope.$watch('selectedPage.header.label.text.en', function() {
      savePage();
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