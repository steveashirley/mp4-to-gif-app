const { copyFileSync, existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');

const srcDir = resolve(__dirname, '../node_modules/@ffmpeg/core/dist/esm');
const destDir = resolve(__dirname, '../public');

if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

const files = ['ffmpeg-core.js', 'ffmpeg-core.wasm'];
for (const file of files) {
  copyFileSync(resolve(srcDir, file), resolve(destDir, file));
  console.log(`Copied ${file} to public/`);
}
