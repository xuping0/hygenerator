var fs = require("fs");
var doT = require("dot");
var fs = require('fs'), configs = [];

var GLOABAL = {
    TEMPLATES: "templates",
    SOURCE: "web",
    OUTPUT: "../output"
};

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

function generateHTML(file, template, data) {
    fs.writeFileSync(file, doT.template(template)(data));
}

function generateBasicHTML(path, config) {
    // create the folder is not exsit
    var paths = path.split("/");

    paths = paths.splice(1);
    paths = paths.splice(0, paths.length - 1);

    var newdir = GLOABAL.OUTPUT + '/' + paths.join("/");
    if (!fs.existsSync(newdir)) {
        fs.mkdirSync(newdir);
    }

    // get the template and the data
    var template = fs.readFileSync(GLOABAL.TEMPLATES + '/' + config.template + '.html').toString();

    // gennerate the html with the speicfic data
    generateHTML(newdir + '/' + config.name + '.html', template, config.data);
}

function generateCascadeHTML(path, config) {
    // generate the id for each item
    var idx = 0;
    config.data.forEach(function(item) {
        item.id = ++idx;
    });
    // generate the list page
    generateBasicHTML(path, {
        template: config.template.list,
        name: config.name,
        data: {
            name: config.name,
            items: config.data
        }
    });
    // generate the detail page
    config.data.forEach(function(item) {
        generateBasicHTML(path, {
            template: config.template.detail,
            name: config.name + item.id,
            data: item
        });
    });
}

function generate() {
    configs.forEach(function(path) {
        var config = JSON.parse(fs.readFileSync(path).toString());
        if (typeof config.template === "string") {
            generateBasicHTML(path, config);
        } else if (typeof config.template === "object") {
            if (config.template.list && config.template.detail) {
                generateCascadeHTML(path, config);
            }
        }
        
    });
}

removeAll(GLOABAL.OUTPUT);
walk(GLOABAL.SOURCE);
generate();


