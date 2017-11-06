require('babel-core/register');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('../../server/support-debug');

module.exports = require('./start-dev.js');
