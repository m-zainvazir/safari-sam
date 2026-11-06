// Builds deploy/safari-sam-world/ = the folder to upload to a public GitHub Pages repo.
// Run from "Safari Sam":  node deploy/make-deploy.mjs
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, '..', 'prototypes');
const out = join(here, 'safari-sam-world');
const BASE = process.argv[2] || 'https://YOUR-NAME.github.io/safari-sam-world';

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(src, 'shared'), join(out, 'shared'), { recursive: true });   // tools/ is left out on purpose
for (const f of readdirSync(src).filter((f) => f.endsWith('.html'))) {
  let html = readFileSync(join(src, f), 'utf8');
  const NL = String.fromCharCode(10);
  const tags = ['<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">', '<meta name="robots" content="noindex, nofollow">']
    .filter((t) => !html.includes(t.slice(0, 18))).join(NL);   // add only what the page lacks
  html = /<head>/i.test(html) ? html.replace(/<head>/i, () => '<head>' + NL + tags) : tags + NL + html;
  writeFileSync(join(out, f), html);
}
writeFileSync(join(out, '.nojekyll'), '');

const pages = [
  ['Chooser (all three)', 'index.html'],
  ['Option A - Explorer Street', 'option-a-street.html'],
  ['Option B - Safari Island', 'option-b-island.html'],
  ['Option C - Top-to-Bottom World', 'option-c-updown.html']
];
const snip = (p) => `<iframe src="${BASE}/${p}" style="width:100%;height:100vh;border:0" allow="fullscreen" title="Safari Sam's Amazing World"></iframe>`;
writeFileSync(join(here, 'GHL-iframe-snippets.md'),
`# GHL iframe code (one GHL page per option)

Paste into a Custom JS/HTML element on a full-width section with no padding.
Base link used: ${BASE}
(Re-run \`node deploy/make-deploy.mjs https://<your-name>.github.io/<repo>\` to rewrite these with your real link.)

${pages.map(([t, p]) => `## ${t}\n\n\`\`\`html\n${snip(p)}\n\`\`\`\n`).join('\n')}`);
console.log('Built', out);
