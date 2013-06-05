'use strict';
define(function(require, exports) {

  angular.module('definerPageModel', [])
  .factory("PageModel", function() {
    var pages = [], selected;
    return {
      get: function(id) {
        return {name: "门店1", phone: 50, email: 50, weibo: 50, weixin: 50, note: "备注"}
      },
      list: function() {
        var _pages = [
          {name: "首页"},
          {name: "会议介绍"}
        ];
        $(pages).each(function(i, page) {
          pages.pop();
        });
        $(_pages).each(function(i, page) {
          pages.push(page);
        });
        return pages;
      },
      getSelected: function() {
        return selected;
      },
      setSelected: function(idx) {
        selected = pages[idx];
        return selected;
      },
      create: function() {
        console.info(this.name);
      }
    }
  });
});