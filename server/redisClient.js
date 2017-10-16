/* eslint-disable no-console */
// @flow

import redis from 'redis';

// default host 127.0.0.1, port 6379
const client = redis.createClient();

// client.on('connect', () => {
//   console.log('connected to redis');
// });

client.on('error', err => {
  console.error(`Error ${err}`);
});

export function set(key: string, value: string, expires: number) {
  client.set(key, value, 'EX', expires);
}

export function get(key: string, callback: Function) {
  client.get(key, callback);
}

export function exists(key: string, callback: Function) {
  client.exists(key, callback);
}
