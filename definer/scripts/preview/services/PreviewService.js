'use strict';
define(function(require, exports) {

  angular.module('definerPreviewService', [])
  .factory("PreviewService", function() {
    var preview, util = nodejs.require("previewutil");
    return {
      init: function(appId) {
        this.create(appId);
        return preview;
      },
      create: function(appId) {
        var time = (new Date()).getTime();
        preview = {
            "app": appId,
            "lang": {"id": "zh-cn", "label": "简体中文"},
            "path": "0",
            "created_time": time,
            "modified_time": time
        };
        util.create(preview);
      },
      load: function() {
        preview = util.load(preview);
        return preview;
      },
      save: function(page) {
        var time = (new Date()).getTime();
        if (page) {
          preview.path = page.path;
        }
        preview.modified_time = time;
        util.write(preview);
      }
    }
  });
});