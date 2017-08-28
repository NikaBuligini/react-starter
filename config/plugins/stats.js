const path = require('path');
const fs = require('fs');

const statsPath = path.resolve('dist', 'stats.json');

let inMemoryStats = {};

module.exports = {
  load(memoryOnly) {
    return memoryOnly ? inMemoryStats : JSON.parse(fs.readFileSync(statsPath));
  },

  save(statsData, memoryOnly) {
    const data = statsData.toJson({
      modules: false,
    });

    if (!memoryOnly) {
      fs.writeFileSync(statsPath, JSON.stringify(data));
    }

    inMemoryStats = statsData.toJson(data);
  },
};
