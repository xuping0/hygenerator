'use strict';
define(function(require, exports) {

  angular.module('definerPageService', [])
  .factory("PageService", function() {
    var appId = null,
        pages = [], selected, selectedIdx,
        util = nodejs.require("pageutil");
    return {
      create: function() {
        if (!appId) { return; }
        var time = (new Date()).getTime();
        var page = {
            "name": null,
            "created_time": time,
            "modified_time": time,
            "path": time + '.json',
            "locked": false,
            "header": {
              "enabled": true,
              "label": {
                "enabled": false,
                "text": {
                  "cn": "请编写Header固定文字",
                  "en": "Please type header text"
                }
              },
              "back": {
                "enabled": true,
                "text": {
                  "cn": "请编写返回键文字",
                  "en": "Please type back button text"
                }
              }
            },
            "tabs": [{
              "type":"basic",
              "label": {
                "cn": "会议介绍",
                "en": "Introduce"
              },
              "text": {
                "cn": ["我爱一支柴"],
                "en": ["I love one"],
              }
            }, {
              "type":"cascade",
              "label": {
                "cn": "会议地图",
                "en": "Map"
              },
              "text": {
                "cn": ["我爱一支柴1", "我爱一支柴2",],
                "en": ["I love one", "I love two"],
              }
            }]
        };
        util.write(appId, page);
        pages.push(page);
      },
      list: function() {
        if (!appId) { return; }
        $(pages).each(function(i, page) {
          pages.pop();
        });

        util.fill(appId, pages);

        if (pages.length == 0) {
          this.create();
        }

        selected = pages[0];

        return pages;
      },
      save: function(page) {
        if (!appId) { return; }
        if (!page) { return; }
        page.modified_time = (new Date()).getTime();
        util.write(appId, page);
      },
      getSelected: function() {
        if (!appId) { return; }
        return selected;
      },
      setSelected: function(idx) {
        if (!appId) { return; }
        selectedIdx = idx;
        selected = pages[idx];
        return selected;
      },
      setAppId: function(id) {
        appId = id;
      },
      remove: function(page) {
        if (!appId) { return; }
        util.remove(appId, page);
        pages.splice(selectedIdx, 1);
      }
    }
  });
});