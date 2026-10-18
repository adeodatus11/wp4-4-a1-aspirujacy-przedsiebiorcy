import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';

const dir = fileURLToPath(new URL('../content/lessons/', import.meta.url));

export async function loadLessons() {
  const files = readdirSync(dir).filter(f => /^\d+.*\.js$/.test(f)).sort();
  const lessons = [];
  for (const file of files) {
    const module = await import(pathToFileURL(join(dir, file)).href);
    lessons.push({ file, ...module.default });
  }
  return lessons.sort((a, b) => a.order - b.order);
}
