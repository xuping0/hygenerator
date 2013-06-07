'use strict';
define(function(require, exports) {

  angular.module('definerPageService', [])
  .factory("PageService", function() {
    var pages = [], selected,
        util = nodejs.require("pageutil");
    return {
      create: function() {
        var time = (new Date()).getTime();
        var page = {
            "name": null,
            "created_time": time,
            "modified_time": time,
            "path": time + '.json',
            "locked": false
        };
        util.write(page);
        pages.push(page);
      },
      get: function(page) {
        return {}
      },
      list: function() {
        $(pages).each(function(i, page) {
          pages.pop();
        });

        util.fill(pages);

        if (pages.length == 0) {
          this.create();
        }

        selected = pages[0];

        return pages;
      },
      save: function(page) {
        if (!page) { return; }
        page.modified_time = (new Date()).getTime();
        util.write(page);
      },
      getSelected: function() {
        return selected;
      },
      setSelected: function(idx) {
        selected = pages[idx];
        return selected;
      }
    }
  });
});