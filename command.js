var fs = require('fs');
var rq = require('request');

module.exports = {
  pwd: function() {
    done(process.env.PWD);
  },
  date: function() {
    done(Date());
  },
  ls: function() {
    var files = fs.readdirSync('.');
    var directorios = '';
    files.forEach(function(file) {
      directorios += file.toString() + '\t';
    });
    done(directorios);
  },
  echo: function(argumento) {
    done(argumento);
  },
  cat: function(filePath) {
    var content = fs.readFileSync(filePath);
    done(content);
  },
  head: function(filePath) {
    var content = fs.readFileSync(filePath);
    var lines = content.toString('utf8').split('\n');
    lines = lines.slice(0, 5);
    done(lines.join('\n'));
  },
  tail: function(filePath) {
    var content = fs.readFileSync(filePath);
    var lines = content.toString('utf8').split('\n');
    lines = lines.slice(lines.length - 5);
    done(lines.join('\n'));
  },
  sort: function(filePath) {
    var content = fs.readFileSync(filePath);
    var lines = content.toString('utf8').split('\n');
    done(lines.sort().join('\n'));
  },
  wc: function(filePath) {
    var content = fs.readFileSync(filePath);
    var lines = content.toString('utf8').split('\n');
    done('Cantidad de líneas: ' + lines.length);
  },
  uniq: function(filePath) {
    var newArray = [];
    var content = fs.readFileSync(filePath);
    var lines = content.toString('utf8').split('\n');
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] !== lines[i - 1]) {
        newArray.push(lines[i]);
      }
    }
    done(newArray.join('\n'));
  },
  curl: function(url) {
    rq(url, function(error, response, body) {
      done(body);
    });
  },
  findHelper: function(path) {
    // console.log(path);
    var lines = '';
    var files = fs.readdirSync(path);
    files.forEach(function(file) {
      if (!fs.statSync(path + '/' + file).isDirectory()) {
        lines += path + '/' + file + '\n';
      } else {
        lines +=
          path +
          '/' +
          file +
          '\n' +
          module.exports.findHelper(path + '/' + file);
      }
    });
    return lines;
  },
  find: function(path) {
    done(module.exports.findHelper(path));
  }
};

var done = function(response) {
  process.stdout.write(response);
  process.stdout.write('\nprompt > ');
};
