// GitHub Pages has no SPA rewrites: deep links fall through to 404.html and
// return HTTP 404, so search engines won't index them. Emit a real
// <route>/index.html per page with its own title, description and canonical URL.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const SITE = 'https://hybrio.github.io';
const routes = {
  about: {
    title: 'About | Alexander Maehl',
    description:
      'About Alexander Maehl, a senior software engineer in Auckland with experience across PHP, TypeScript, cloud infrastructure and production AI features.',
  },
  projects: {
    title: 'Projects | Alexander Maehl',
    description:
      'Open source projects by Alexander Maehl, including Boids, EmbeddingMap and JuliaParallelGraphing.',
  },
};

const html = readFileSync('dist/index.html', 'utf8');
writeFileSync('dist/404.html', html);

const setAttr = (src, selector, value) => {
  const re = new RegExp(`(<[^>]*${selector}[^>]*(?:content|href)=")[^"]*(")`);
  if (!re.test(src)) throw new Error(`build-routes: ${selector} not found`);
  return src.replace(re, `$1${value}$2`);
};

for (const [route, { title, description }] of Object.entries(routes)) {
  const url = `${SITE}/${route}/`;
  let page = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  page = setAttr(page, 'name="description"', description);
  page = setAttr(page, 'property="og:title"', title);
  page = setAttr(page, 'property="og:description"', description);
  page = setAttr(page, 'property="og:url"', url);
  page = setAttr(page, 'rel="canonical"', url);
  mkdirSync(`dist/${route}`, { recursive: true });
  writeFileSync(`dist/${route}/index.html`, page);
}
