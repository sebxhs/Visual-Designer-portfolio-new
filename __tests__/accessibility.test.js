const { loadPage, allPageDocuments } = require('./helpers');

describe('Accessibility', () => {
  const pages = allPageDocuments();

  describe.each(pages)('$page', ({ page, document }) => {
    test('has a skip-to-content link as the first body child', () => {
      const skip = document.querySelector('body > a.skip-link');
      expect(skip).not.toBeNull();
      expect(skip.getAttribute('href')).toBe('#main');
      expect(skip.textContent.toLowerCase()).toContain('skip');
    });

    test('main element has an id matching the skip link target', () => {
      const main = document.querySelector('main');
      expect(main).not.toBeNull();
      expect(main.getAttribute('id')).toBe('main');
    });

    test('nav has aria-label', () => {
      const nav = document.querySelector('nav');
      expect(nav).not.toBeNull();
      expect(nav.getAttribute('aria-label')).toBeTruthy();
    });

    test('brand link has an aria-label', () => {
      const brand = document.querySelector('a.brand');
      expect(brand).not.toBeNull();
      expect(brand.getAttribute('aria-label')).toBeTruthy();
    });

    test('images (if any) have alt attributes', () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        expect(img.hasAttribute('alt')).toBe(true);
      });
    });

    test('exactly one nav link has aria-current="page"', () => {
      const currentLinks = document.querySelectorAll(
        '.nav-links a[aria-current="page"]'
      );
      expect(currentLinks.length).toBe(1);
    });

    test('heading hierarchy does not skip levels', () => {
      const headings = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      );
      let lastLevel = 0;
      for (const h of headings) {
        const level = parseInt(h.tagName[1], 10);
        if (lastLevel > 0) {
          expect(level).toBeLessThanOrEqual(lastLevel + 1);
        }
        lastLevel = level;
      }
    });
  });
});
