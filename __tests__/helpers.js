const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');

const ALL_PAGES = [
  'index.html',
  'about.html',
  'work.html',
  'contact.html',
  'projects/genmap.html',
  'projects/learnhall.html',
  'projects/ftbl.html',
  'projects/superb-exteriors.html',
];

function loadPage(relativePath) {
  const filePath = path.join(ROOT, relativePath);
  const html = fs.readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html);
  return dom.window.document;
}

function allPageDocuments() {
  return ALL_PAGES.map((p) => ({ page: p, document: loadPage(p) }));
}

module.exports = { ROOT, ALL_PAGES, loadPage, allPageDocuments };
