var fs = require("fs");
var doT = require("dot");
var fs = require('fs'), configs = [];

function removeAll(path) {
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            removeAll(path + '/' + item);
        } else {
            fs.unlinkSync(path + '/' + item);
        }
    });
}

function walk(path) {
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            walk(path + '/' + item);
        } else {
            configs.push(path + '/' + item);
        }
    });
}

function generateHTML(item, output, name, html) {
    
    var paths = item.split("/");

    paths = paths.splice(1);
    paths = paths.splice(0, paths.length - 1);

    var newdir = output + '/' + paths.join("/");
    if (!fs.existsSync(newdir)) {
        fs.mkdirSync(newdir);
    }

    fs.writeFileSync(newdir + '/' + name + '.html', html);
}

function generate(configs, templates, output) {
    configs.forEach(function(item) {
        var config = JSON.parse(fs.readFileSync(item).toString());
        var template = fs.readFileSync(templates + '/' + config.template + '.html').toString();
        var tempFn = doT.template(template);

        generateHTML(item, output, config.name, tempFn(config.data));
    });
}

removeAll("../output");
walk('web');
generate(configs, "templates/", "../output");


