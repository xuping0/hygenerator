'use strict';
define(function(require) {
  require("./common/Common");
  require("./application/Application");
  require("./page/Page");

  var pageTemp = require("./page/templates/page.html");

  angular.module('definerApp', ['definerCommon', 'definerApplicationService', 'definerPage'])
  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      .when('/pages', {
        template: pageTemp,
        controller: 'PageController'
      })
      .otherwise({
        redirectTo: '/pages'
      });
  }])
  .run(function() {});

  angular.bootstrap(document, ["definerApp"]);

});