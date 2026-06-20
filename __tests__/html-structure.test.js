const { ALL_PAGES, loadPage, allPageDocuments } = require('./helpers');

describe('HTML document structure', () => {
  const pages = allPageDocuments();

  describe.each(pages)('$page', ({ page, document }) => {
    test('has a valid doctype (html lang attribute)', () => {
      expect(document.documentElement.getAttribute('lang')).toBe('en');
    });

    test('has a <head> with charset meta', () => {
      const charset = document.querySelector('meta[charset]');
      expect(charset).not.toBeNull();
      expect(charset.getAttribute('charset').toLowerCase()).toBe('utf-8');
    });

    test('has a viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).not.toBeNull();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('has a meta description', () => {
      const desc = document.querySelector('meta[name="description"]');
      expect(desc).not.toBeNull();
      const content = desc.getAttribute('content');
      expect(content.length).toBeGreaterThan(20);
    });

    test('has a non-empty <title>', () => {
      const title = document.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent.trim().length).toBeGreaterThan(0);
    });

    test('title contains "Sebastian Quiroz"', () => {
      const title = document.querySelector('title').textContent;
      expect(title).toContain('Sebastian Quiroz');
    });

    test('has exactly one <main> element', () => {
      const mains = document.querySelectorAll('main');
      expect(mains.length).toBe(1);
    });

    test('has exactly one <header>', () => {
      const headers = document.querySelectorAll('header');
      expect(headers.length).toBe(1);
    });

    test('has exactly one <footer>', () => {
      const footers = document.querySelectorAll('footer');
      expect(footers.length).toBe(1);
    });

    test('has at least one <h1>', () => {
      const h1s = document.querySelectorAll('h1');
      expect(h1s.length).toBeGreaterThanOrEqual(1);
    });

    test('links the stylesheet', () => {
      const link = document.querySelector('link[rel="stylesheet"]');
      expect(link).not.toBeNull();
      expect(link.getAttribute('href')).toContain('styles.css');
    });
  });
});
