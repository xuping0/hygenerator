'use strict';
define(function(require, exports) {

  require("./lang");

  var template = require("../templates/properties.html");

  angular.module('definerPageProperties', ['definerPageLangSelect'])
  .controller('PagePropertiesController', ['$scope', 'PageService', function ($scope, PageService) {
    // base function
    function savePage() {
      PageService.save($scope.selectedPage);
    };

    // lang select
    $scope.langIsZhCn = true;
    $scope.langIsEn = false;
    $scope.$watch('previewSetting.lang.id', function() {
      $scope.langIsZhCn = false;
      $scope.langIsEn = false;
      if ($scope.previewSetting.lang.id == 'zh-cn') {
        $scope.langIsZhCn = true;
      } else if ($scope.previewSetting.lang.id == 'en') {
        $scope.langIsEn = true;
      }
    });

    // lock/unlock
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

    // name
    $scope.$watch('selectedPage.name', function() {
      savePage();
    });

    // header text
    $scope.showHeader = function() {
      $scope.selectedPage.header.enabled = true;
      savePage();
    };
    $scope.hideHeader = function() {
      $scope.selectedPage.header.enabled = false;
      savePage();
    };
    $scope.$watch('selectedPage.header.enabled', function() {
      if ($scope.selectedPage.header.enabled === false) {
        $scope.selectedPage.header.label.enabled = false;
        $scope.selectedPage.header.back.enabled = false;
      }
      savePage();
    });

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

    // back text
    $scope.showBack = function() {
      $scope.selectedPage.header.back.enabled = true;
      savePage();
    };
    $scope.hideBack = function() {
      $scope.selectedPage.header.back.enabled = false;
      savePage();
    };
    $scope.$watch('selectedPage.header.back.text.cn', function() {
      savePage();
    });
    $scope.$watch('selectedPage.header.back.text.en', function() {
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