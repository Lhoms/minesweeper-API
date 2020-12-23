require('dotenv').config();
const redis = require('redis');
const { promisify } = require('util');

const host = process.env.REDISCLOUD_URL || process.env.REDISLOCAL_URL;
const client = redis.createClient(host, { no_ready_check: true });

module.exports = {
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  hgetAsync: promisify(client.hget).bind(client),
  hgetAllAsync: promisify(client.hgetall).bind(client),
  hsetAsync: promisify(client.hset).bind(client),
  hdelAsync: promisify(client.hdel).bind(client),
  delAsync: promisify(client.del).bind(client),
};
