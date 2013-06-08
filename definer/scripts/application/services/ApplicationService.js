'use strict';
define(function(require, exports) {

  angular.module('definerApplicationService', [])
  .factory("ApplicationService", function() {
    var apps = [], selected, selectedIdx,
        util = nodejs.require("applicationutil");
    return {
      init: function() {
        util.init();
        this.list();
      },
      create: function() {
        var time = (new Date()).getTime();
        var app = {
            "name": "Application1",
            "lang": [{
              "id": "zh-cn",
              "label": "简体中文"
            }, {
              "id": "en",
              "label": "英文"
            }],
            "created_time": time,
            "modified_time": time,
            "id": time
        };
        util.write(app);
        apps.push(app);
      },
      list: function() {
        $(apps).each(function(i, app) {
          apps.pop();
        });

        util.fill(apps);

        if (apps.length == 0) {
          this.create();
        }

        selected = apps[0];

        return apps;
      },
      save: function(app) {
        if (!app) { return; }
        app.modified_time = (new Date()).getTime();
        util.write(app);
      },
      getSelected: function() {
        return selected;
      },
      setSelected: function(idx) {
        selectedIdx = idx;
        selected = apps[idx];
        return selected;
      },
      remove: function(app) {
        util.remove(app);
        apps.splice(selectedIdx, 1);
      }
    }
  });
});