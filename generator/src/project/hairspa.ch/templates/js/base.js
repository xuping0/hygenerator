/* Local JavaScript Here */
$(function() {
    var TIMEOUT = 100;
    $("#main").UITabBar();
    $("#back").click(function() {
        var $this = $(this), href = $this.attr("href");
        if (href) {
            setTimeout(function() {
                window.location.href = href;
            }, TIMEOUT);
        } else {
            window.location.href = "index.html";
        }
    });
    $("#map").click(function() {
        window.location.href = "map.html";
    });
    $("#email").click(function() {
        window.location.href = "mailto:cs@hairspa.ch";
    });
    $("#tel").click(function() {
        window.location.href = "tel:0786636969";
    });
    $("tabbar").delegate("uibutton", "click", function() {
        var $this = $(this), href = $this.attr("href");
        if (href) {
            setTimeout(function() {
                window.location.href = href;
            }, TIMEOUT);
        }
    });
    $("segmentedcontrol").delegate("uibutton", "click", function() {
        var $this = $(this), href = $this.attr("href");
        if (href) {
            setTimeout(function() {
                window.location.href = href;
            }, TIMEOUT)
        };
    });
    $("#addressers").delegate("tablecell", "click", function() {
        var $this = $(this), href = $this.attr("href");
        if (href) {
            setTimeout(function() {
                window.location.href = href;
            }, TIMEOUT)
        };
    });
});