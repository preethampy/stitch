const redis = require('ioredis')

const client = new redis({host: 'redis'});

module.exports = client;