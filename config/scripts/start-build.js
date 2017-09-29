require('babel-core/register');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = require('./build.js');
