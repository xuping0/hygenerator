/* Local JavaScript Here */
$(function() {
    var TIMEOUT = 50;
    $("#main").UITabBar();
    $("#back").click(function() {
        var $this = $(this), href = $this.attr("href");
        if (href) {
            setTimeout(function() {
                if (href.indexOf('http') < 0) {
                    window.location.href = href;
                } else {
                    window.open(href, '_blank', 'location=yes');
                }
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
                if (href.indexOf('http') < 0) {
                    window.location.href = href;
                } else {
                    window.open(href, '_blank', 'location=yes');
                }
            }, TIMEOUT);
        }
    });
    $("segmentedcontrol").delegate("uibutton", "click", function() {
        var $this = $(this), href = $this.attr("href");
        if (href) {
            setTimeout(function() {
                if (href.indexOf('http') < 0) {
                    window.location.href = href;
                } else {
                    window.open(href, '_blank', 'location=yes');
                }
            }, TIMEOUT);
        };
    });
    $("#links").delegate("tablecell", "click", function() {
        var $this = $(this), href = $this.attr("href");
        if (href) {
            setTimeout(function() {
                if (href.indexOf('http') < 0) {
                    window.location.href = href;
                } else {
                    window.open(href, '_blank', 'location=yes');
                }
            }, TIMEOUT);
        };
    });
});