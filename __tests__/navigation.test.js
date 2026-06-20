const fs = require('fs');
const path = require('path');
const { ROOT, loadPage, allPageDocuments } = require('./helpers');

describe('Navigation', () => {
  const pages = allPageDocuments();
  const NAV_ITEMS = ['Home', 'About', 'Work', 'Contact'];
  const NAV_HREFS_ROOT = [
    'index.html',
    'about.html',
    'work.html',
    'contact.html',
  ];
  const NAV_HREFS_PROJECT = [
    '../index.html',
    '../about.html',
    '../work.html',
    '../contact.html',
  ];

  describe.each(pages)('$page', ({ page, document }) => {
    const isProject = page.startsWith('projects/');

    test('contains all four nav links', () => {
      const links = document.querySelectorAll('.nav-links a');
      const texts = Array.from(links).map((a) => a.textContent.trim());
      NAV_ITEMS.forEach((item) => {
        expect(texts).toContain(item);
      });
    });

    test('nav link hrefs point to correct pages', () => {
      const links = document.querySelectorAll('.nav-links a');
      const hrefs = Array.from(links).map((a) => a.getAttribute('href'));
      const expected = isProject ? NAV_HREFS_PROJECT : NAV_HREFS_ROOT;
      expect(hrefs).toEqual(expected);
    });

    test('brand link points to homepage', () => {
      const brand = document.querySelector('a.brand');
      const href = brand.getAttribute('href');
      if (isProject) {
        expect(href).toBe('../index.html');
      } else {
        expect(href).toBe('index.html');
      }
    });
  });

  test('footer is consistent across all pages', () => {
    const footerTexts = pages.map(({ document }) => {
      const footer = document.querySelector('.site-footer');
      return footer.textContent.replace(/\s+/g, ' ').trim();
    });
    const unique = new Set(footerTexts);
    expect(unique.size).toBe(1);
  });
});

describe('Internal link integrity', () => {
  const pages = allPageDocuments();

  describe.each(pages)('$page', ({ page, document }) => {
    test('all internal href targets exist as files', () => {
      const links = document.querySelectorAll('a[href]');
      const pageDir = path.dirname(path.join(ROOT, page));

      Array.from(links).forEach((a) => {
        const href = a.getAttribute('href');
        if (
          href.startsWith('http') ||
          href.startsWith('mailto:') ||
          href.startsWith('#')
        ) {
          return;
        }
        const target = path.resolve(pageDir, href);
        expect(fs.existsSync(target)).toBe(true);
      });
    });
  });
});
