'use strict';

const packageInfo = require('./package.json');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({ name: packageInfo.name });

module.exports = logger;
