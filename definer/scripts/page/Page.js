'use strict';
define(function(require, exports) {

  require("./services/PageService");
  require("./directives/list");
  require("./directives/preview");
  require("./directives/properties");

  angular.module('definerPage', ['definerPageService', 'definerPageList', 'definerPagePreview', 'definerPageProperties'])
  .controller('PageController', ['$scope', 'ApplicationService', function ($scope, ApplicationService) {
    ApplicationService.init();
    $scope.selectedApp = ApplicationService.getSelected();
  }]);
});