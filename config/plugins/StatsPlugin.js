/* eslint-disable class-methods-use-this */

import fs from 'fs';

let pluginOptions = {};
let inMemoryStats = {};

class StatsPlugin {
  constructor(options = {}) {
    const defaultOptions = {
      memoryOnly: false,
    };

    pluginOptions = { ...defaultOptions, ...options };
  }

  apply(compiler) {
    compiler.plugin('done', statsData => {
      const { memoryOnly, path } = pluginOptions;

      const data = statsData.toJson({
        modules: false,
      });

      if (!memoryOnly) {
        fs.writeFileSync(path, JSON.stringify(data));
      }

      inMemoryStats = statsData.toJson(data);
    });
  }

  static load = () => {
    const { memoryOnly, path } = pluginOptions;

    return memoryOnly ? inMemoryStats : JSON.parse(fs.readFileSync(path));
  };
}

export default StatsPlugin;
