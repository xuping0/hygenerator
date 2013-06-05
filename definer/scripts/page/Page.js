'use strict';
define(function(require, exports) {

  require("./resources/Page");
  require("./directives/list");
  require("./directives/preview");
  require("./directives/properties");

  angular.module('definerPage', ['definerPageModel', 'definerPageList', 'definerPagePreview', 'definerPageProperties'])
  .controller('PageController', function ($scope) {
  });
});