import fs from 'node:fs';
import path from 'node:path';

// 笔记在构建时从 content/notes/*.md 读进来，站点不依赖任何 CMS 或数据库
const NOTES_DIR = path.join(process.cwd(), 'content', 'notes');

function parseFile(file) {
  const raw = fs.readFileSync(path.join(NOTES_DIR, file), 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const at = line.indexOf(':');
    if (at > 0) meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }

  return {
    slug: file.replace(/\.md$/, ''),
    title: meta.title || file,
    date: meta.date || '',
    minutes: Number(meta.minutes || 5),
    status: meta.status || 'draft',
    summary: meta.summary || '',
    body: match[2].trim(),
  };
}

let cache = null;

export function getPosts() {
  if (cache) return cache;
  if (!fs.existsSync(NOTES_DIR)) {
    cache = [];
    return cache;
  }
  cache = fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map(parseFile)
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export function getPost(slug) {
  return getPosts().find((p) => p.slug === slug) || null;
}

export function getPostsMeta() {
  return getPosts().map(({ body, ...rest }) => rest);
}
