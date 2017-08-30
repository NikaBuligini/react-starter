import path from 'path';
import fs from 'fs';

const statsPath = path.resolve('dist', 'stats.json');

let inMemoryStats = {};

export function load(memoryOnly) {
  return memoryOnly ? inMemoryStats : JSON.parse(fs.readFileSync(statsPath));
}

export function save(statsData, memoryOnly) {
  const data = statsData.toJson({
    modules: false,
  });

  if (!memoryOnly) {
    fs.writeFileSync(statsPath, JSON.stringify(data));
  }

  inMemoryStats = statsData.toJson(data);
}
