// Monta as versões do site em outros idiomas a partir do index.html (PT-BR).
// Cada idioma tem um arquivo em i18n/ com pares [texto em PT-BR, tradução].
// Uso: node build.js   (falha se algum texto do par não existir mais no index.html)
const fs = require('fs');
const path = require('path');

const root = __dirname;
const src = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const langs = [
  { code: 'pt-PT', dir: 'pt', file: 'pt-PT.json', check: false },
  { code: 'es', dir: 'es', file: 'es.json', check: true },
  { code: 'en', dir: 'en', file: 'en.json', check: true },
];

// textos visíveis do original, para avisar o que ficou sem tradução
const visible = src.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '')
  .match(/>([^<>]*[A-Za-zÀ-ú][^<>]*)</g)
  .map(s => s.slice(1, -1).trim())
  .filter(s => s.length > 3);
const keep = new Set(['Jonathan Robert', 'Lebes', 'Duloren', 'Bana Bana', 'Jacuzzi', 'V4 Company', 'Google Ads', 'Meta Ads',
  'Performance Max', 'Merchant Center', 'Looker Studio', 'Power BI', 'RD Station', 'ChatGPT / Claude', 'Claude Code', 'Python',
  'Supabase', 'GitHub Actions', 'Google', 'Make', 'Display', 'LinkedIn', 'Growth Lead · Softcommerce', 'Lebes: ROAS 8x → 14x',
  'Google Analytics (GA4)', 'jonathanrobertsilveira@gmail.com']);

let failed = false;
for (const l of langs) {
  const pairs = JSON.parse(fs.readFileSync(path.join(root, 'i18n', l.file), 'utf8'));
  let out = src;
  for (const [from, to] of pairs.sort((a, b) => b[0].length - a[0].length)) {
    if (!out.includes(from)) { console.error(`[${l.code}] não achei: ${from}`); failed = true; continue; }
    out = out.split(from).join(to);
  }
  out = out
    .replace('<html lang="pt-BR">', `<html lang="${l.code}">`)
    .replace(/(src|href)="(img|cv|cases)\//g, '$1="../$2/')
    .replace(/ aria-current="page"/, '')
    .replace(`hreflang="${l.code}" href="/${l.dir}/"`, `hreflang="${l.code}" href="/${l.dir}/" aria-current="page"`)
    .replace('content="https://jonathanrobertsilveira-wq.github.io/"', `content="https://jonathanrobertsilveira-wq.github.io/${l.dir}/"`);
  if (l.check) {
    const left = [...new Set(visible.filter(t => !keep.has(t) && out.includes('>' + t + '<')))];
    if (left.length) console.warn(`[${l.code}] ainda em PT-BR:\n  ` + left.join('\n  '));
  }
  fs.mkdirSync(path.join(root, l.dir), { recursive: true });
  fs.writeFileSync(path.join(root, l.dir, 'index.html'), out);
  console.log(`[${l.code}] ${l.dir}/index.html`);
}
process.exit(failed ? 1 : 0);
