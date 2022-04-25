// import fs from 'fs-extra';
// import path from 'path';
const fs = require('fs');
const path = require('path');
async function main() {
  await clean();
}
async function clean() {
  const dirs = [
    '../.cache',
    '../.tmp',
    '../build',
    '../coverage',
    '../coverage',
    '../node_modules',
  ];
  dirs.forEach((dir) => {
    let p = path.resolve(__dirname, dir);
    if (fs.existsSync(p)) {
      fs.rmdirSync(p, { recursive: true });
    }
  });
}
if (typeof require !== 'undefined' && require.main === module) {
  main();
}
