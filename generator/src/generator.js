var fs = require("fs");
var doT = require("dot");
var fs = require('fs');

var GLOABAL = {
    PROJECT: "project",
    OUTPUT: "../output"
};

function removeAll(path) {
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item) {
        var filepath = path + '/' + item;
        if (fs.statSync(filepath).isDirectory()) {
            removeAll(filepath);
            fs.rmdirSync(filepath);
        } else {
            fs.unlinkSync(filepath);
        }
    });
}

function initProjects(path, output) {
    var dirList = fs.readdirSync(path), findPages, projects = [];

    findPages = function(folder, pages) {
        var dirList = fs.readdirSync(folder);
        dirList.forEach(function(item) {
            if (fs.statSync(folder + '/' + item).isDirectory()) {
                findPages(folder + '/' + item);
            } else {
                pages.push(folder + '/' + item);
            }
        });
    };
    
    dirList.forEach(function(item) {
        var projectPath = path + '/' + item;
        if (fs.statSync(projectPath).isDirectory()) {
            var project = {
                name: item,
                templates: projectPath + '/templates',
                pages: [],
                output: output + '/' + item,
                global: JSON.parse(fs.readFileSync(projectPath + '/common.json').toString())
            };
            findPages(projectPath +  '/pages', project.pages);
            projects.push(project);
        }
    });
    return projects;
}


function generateHTML(file, template, data) {
    fs.writeFileSync(file, doT.template(template)(data));
}

function generateBasicHTML(path, pageConfig, projectConfig) {
    // create the folder is not exsit
    var paths = path.split('/');

    paths = paths.splice(3);
    paths = paths.splice(0, paths.length - 1);

    var newdir = projectConfig.output + '/' + paths.join('/');

    if (!fs.existsSync(newdir)) {
        fs.mkdirSync(newdir);
    }

    // get the template and the data
    var template = fs.readFileSync(projectConfig.templates + '/' + pageConfig.template + '.html').toString();

    // gennerate the html with the speicfic data
    pageConfig.data.global = projectConfig.global;
    generateHTML(newdir + '/' + pageConfig.name + '.html', template, pageConfig.data);
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

function generateProject(project) {
    // create the project folder in the output
    if (!fs.existsSync(project.output)) {
        fs.mkdirSync(project.output);
    }
    
    // create the html base on the template and the page
    project.pages.forEach(function(page) {
        var pageConfig = JSON.parse(fs.readFileSync(page).toString());

        if (typeof pageConfig.template === "string") {
            generateBasicHTML(page, pageConfig, project);
        } else if (typeof config.template === "object") {
            if (pageConfig.template.list && pageConfig.template.detail) {
                generateCascadeHTML(pageConfig, project);
            }
        }
    });
}

function generate(projects) {
    projects.forEach(function(project) {
        generateProject(project);
    });
}

removeAll(GLOABAL.OUTPUT);
generate(initProjects(GLOABAL.PROJECT, GLOABAL.OUTPUT));


