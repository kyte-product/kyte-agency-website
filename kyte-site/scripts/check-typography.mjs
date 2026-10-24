import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
const failures = [];
async function scan(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (item.name === 'graveyard') continue;
    const file = path.join(dir, item.name);
    if (item.isDirectory()) { await scan(file); continue; }
    if (!file.endsWith('.css')) continue;
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(/(?<![\w-])(?:line-height|--[\w-]*line-height)\s*:\s*([^;}]+)/g)) {
      const value = match[1].trim();
      if (!['1.2', '1.3', '1.4', '1.5', '1.6', 'inherit'].includes(value) && !/^var\(--(?:brand-)?(?:heading|lead|body)-line-height\)$/.test(value)) {
        failures.push(`${file}: unapproved ${match[0]}`);
      }
    }
    for (const match of source.matchAll(/(?:font-size|--(?:heading|type|font)[\w-]*)\s*:\s*([^;}]+)/g)) {
      if (/\b(?:clamp|min|max)\(|[\d.](?:vw|vh|vmin|vmax|cqw|cqh)\b/.test(match[1])) {
        failures.push(`${file}: ${match[0]}`);
      }
    }
  }
}
await scan('src');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log('Typography guard passed: active CSS uses fixed type sizes, breakpoint tokens and the approved line-height scale.');
