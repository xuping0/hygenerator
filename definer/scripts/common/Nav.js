'use strict';
define(function(require, exports) {
  var navTemplate = require("./templates/nav.html");

  angular.module('definerNav', [])
  .controller('NavController', function ($scope) {
    $scope.menus = [{
      name: '页面管理',
      href: '/pages'
    }, {
      name: '素材管理',
      href: '/asserts'
    }];
  })
  .directive("definerNav", ['$location', function ($location) {
    return {
      restrict: 'E',
      replace: false,
      template: navTemplate,
      controller: "NavController",
      link: function ($scope, $element, $attrs) {
        $scope.getClass = function(path) {
          if (!path) { return ""; }
          var cur_path = $location.path().substr(0, path.length);
          if (cur_path == path) {
              if($location.path().substr(0).length > 1 && path.length == 1 )
                  return "";
              else
                  return "active";
          } else {
              return "";
          }
        }
      }
    };
  }]);

});