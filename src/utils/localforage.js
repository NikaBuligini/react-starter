import localforage from 'localforage';

localforage.config({
  driver: [localforage.WEBSQL, localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: 'react-starter',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'react_starter_app', // Should be alphanumeric, with underscores.
  description: 'Local storage database for react app',
});

export default localforage;
