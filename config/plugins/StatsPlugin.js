/* eslint-disable class-methods-use-this */

import fs from 'fs';

let inMemoryStats = null;

class StatsPlugin {
  pluginOptions = {};

  constructor(options = {}) {
    const defaultOptions = {
      publicUrl: false,
      memoryOnly: false,
    };

    this.pluginOptions = { ...defaultOptions, ...options };
  }

  apply(compiler) {
    compiler.plugin('done', statsData => {
      const { path, memoryOnly } = this.pluginOptions;

      const data = statsData.toJson({
        modules: false,
      });

      if (!memoryOnly) {
        fs.writeFileSync(path, JSON.stringify(data));
      }

      inMemoryStats = statsData.toJson(data);
    });
  }

  static load = (path, mode) =>
    mode === 'memoryOnly' ? inMemoryStats : JSON.parse(fs.readFileSync(path));
}

export default StatsPlugin;
