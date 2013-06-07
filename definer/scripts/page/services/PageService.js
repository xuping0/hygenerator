'use strict';
define(function(require, exports) {

  angular.module('definerPageService', [])
  .factory("PageService", function() {
    var pages = [], selected, selectedIdx,
        util = nodejs.require("pageutil");
    return {
      create: function() {
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
        util.write(page);
        pages.push(page);
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
        selectedIdx = idx;
        selected = pages[idx];
        return selected;
      },
      remove: function(page) {
        util.remove(page);
        pages.splice(selectedIdx, 1);
      }
    }
  });
});