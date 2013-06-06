'use strict';
define(function(require, exports) {

  angular.module('definerPageService', [])
  .factory("PageService", function() {
    var pages = [], selected,
        util = nodejs.require("pageutil");
    return {
      get: function(id) {
        return {name: "门店1", phone: 50, email: 50, weibo: 50, weixin: 50, note: "备注"}
      },
      list: function() {
        $(pages).each(function(i, page) {
          pages.pop();
        });

        util.fill(pages);

        selected = pages[0];

        return pages;
      },
      save: function(page) {
        util.write(page);
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