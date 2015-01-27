'use strict';

var pkg = require('./package');
console.log(pkg.name + ' v' + pkg.version);

module.exports = require('./lib');
