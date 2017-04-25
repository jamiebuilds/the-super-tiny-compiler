var markdown = require('markdown-it')();
var Prism = require('prismjs');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

var app = express();

var ROUTES_MAP = {
  '/'               : 'README.md',
  '/intro'          : '0-introduction.md',
  '/tokenizer'      : '1-tokenizer.js',
  '/parser'         : '2-parser.js',
  '/traverser'      : '3-traverser.js',
  '/transformer'    : '4-transformer.js',
  '/code-generator' : '5-code-generator.js',
  '/compiler'       : '6-compiler.js'
};

var routes = Object.keys(ROUTES_MAP).map(function(routePath) {
  return {
    routePath: routePath,
    routeName: ROUTES_MAP[routePath]
  };
});

function readFile(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName)).toString();
}

function renderMarkdown(fileContents) {
  return markdown.render(fileContents);
}

function renderJavaScript(fileName, fileContents) {
  return Prism.highlight(fileContents, Prism.languages.javascript);
}

var template = ejs.compile(readFile('./template.html.ejs'));

function render(routeName) {
  var fileName = routeName;
  var fileContents = readFile(fileName);
  
  var extName = path.extname(fileName);
  if (extName === '.md') fileContents = renderMarkdown(fileContents);
  if (extName === '.js') fileContents = renderJavaScript(fileName, fileContents);
  
  let isCode = extName !== '.md';
  
  return template({
    routes: routes,
    fileName: fileName,
    fileContents: fileContents,
    isCode: isCode,
  });
}

routes.forEach(function(route) {
  var html = render(route.routeName);
  
  app.get(route.routePath, function(req, res) {
    res.send(html);
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
