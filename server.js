var markdown = require('markdown-it')();
var Prism = require('prismjs');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

process.env.NWO = process.env.NWO || 'thejameskyle/the-super-tiny-compiler';
process.env.BRANCH = process.env.BRANCH || 'master';

// First, let's create the server,
var app = express();
// add a `req.body` property to requests containing
// the body as text,
app.use(bodyParser.text());
// and serve any files in the `public` directory from the /assets path.
app.use('/assets', express.static(path.join(__dirname, 'public')));


// Next, let's create the URLs to read the code used:
var ROUTES_MAP = {
  '/'               : 'README.md',
  '/intro'          : '0-introduction.md',
  '/tokenizer'      : '1-tokenizer.js',
  '/parser'         : '2-parser.js',
  '/traverser'      : '3-traverser.js',
  '/transformer'    : '4-transformer.js',
  '/code-generator' : '5-code-generator.js',
  '/compiler'       : '6-compiler.js',
  '/test'           : '7-test.html',
  '/server'         : 'server.js',
  '/client'         : 'public/client.js',
  '/test-js'        : 'public/test.js',
};

var routes = Object.keys(ROUTES_MAP).map(function(routePath) {
  return {
    routePath: routePath,
    routeName: ROUTES_MAP[routePath]
  };
});

// Next, let's create helpers to read files,
function readFile(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName)).toString();
}

// render Markdown,
function renderMarkdown(fileContents) {
  return markdown.render(fileContents);
}

// and highlight JavaScript code.
function renderJavaScript(fileName, fileContents) {
  return Prism.highlight(fileContents, Prism.languages.javascript);
}

// We'll be using EJS (http://ejs.co) to render the files.
var template = ejs.compile(readFile('./template.html.ejs'), {
  filename: path.join(__dirname, 'template.html.ejs')
});

function render(routeName) {
  return template(getContext(routeName));
}

function getContext(routeName) {
  // We'll read the file at the specified path,
  var fileName = routeName;
  var fileContents = readFile(fileName);
  
  // render it appropriately,
  var extName = path.extname(fileName);
  if (extName === '.md') fileContents = renderMarkdown(fileContents);
  if (extName === '.js') fileContents = renderJavaScript(fileName, fileContents);
  
  let isCode = extName === '.js';
  
  return {
    routes,
    fileName,
    fileContents,
    isCode
  }
}

// Next, let's tell Express about each file we're rendering.
routes.forEach(function(route) {
  app.get(route.routePath, function(req, res) {
    var html = render(route.routeName);
    res.send(html);
  });
});

// To convert the code,
app.post('/api/convert', function(req, res) {
  try {
    // First, try to convert the code and send it back.
    var code = require('./6-compiler')(req.body);
    res.send({
      ok: true,
      code: code,
    });
  } catch (err) {
    try {
      // If that fails, send the error back.
      res.send({
        ok: false,
        err: err.toString(),
        stack: err.stack,
      });
    } catch (e) {
      // If sending the error fails, send a generic error.
      res.send({
        ok: false,
        err: 'unknown error',
        stack: 'unknown error\n<no stack>',
      });
      // (if *that* fails, you're on your own :))
    }
  }
});


var contentTemplate = ejs.compile(readFile('./content.ejs'), {
  filename: path.join(__dirname, 'content.ejs')
});

var titleTemplate = ejs.compile(readFile('./title.ejs'), {
  filename: path.join(__dirname, 'title.ejs')
});

app.get('/api/fetch', function(req, res) {
  var path = ROUTES_MAP[req.query.path]
  if (!path) {
    res.status('404').send({
      error: 'route not found'
    });
  }
  var context = getContext(path);
  res.send({
    title: titleTemplate(context),
    html: contentTemplate(context),
    context
  });
});

// Finally, start the server.
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
