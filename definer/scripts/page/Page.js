'use strict';
define(function(require, exports) {

  require("./services/PageService");
  require("./directives/list");
  require("./directives/preview");
  require("./directives/properties");

  angular.module('definerPage', ['definerPageService', 'definerPageList', 'definerPagePreview', 'definerPageProperties'])
  .controller('PageController', ['$scope', 'ApplicationService',  'PreviewService', function ($scope, ApplicationService, PreviewService) {
    ApplicationService.init();
    $scope.selectedApp = ApplicationService.getSelected();
    PreviewService.init($scope.selectedApp.id);
    $scope.previewSetting = PreviewService.load();
  }]);
});