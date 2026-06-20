const fs = require('fs');
const path = require('path');
const { ROOT } = require('./helpers');

describe('CSS stylesheet', () => {
  const cssPath = path.join(ROOT, 'assets', 'css', 'styles.css');
  const css = fs.readFileSync(cssPath, 'utf-8');

  test('file exists and is non-empty', () => {
    expect(css.length).toBeGreaterThan(0);
  });

  test('defines CSS custom properties (design tokens)', () => {
    expect(css).toContain(':root');
    expect(css).toContain('--bg:');
    expect(css).toContain('--ink:');
    expect(css).toContain('--accent:');
    expect(css).toContain('--muted:');
    expect(css).toContain('--line:');
  });

  test('uses box-sizing: border-box reset', () => {
    expect(css).toMatch(/\*\s*\{[^}]*box-sizing:\s*border-box/);
  });

  test('includes responsive breakpoints', () => {
    const mediaQueries = css.match(/@media\s*\([^)]+\)/g) || [];
    expect(mediaQueries.length).toBeGreaterThanOrEqual(2);
  });

  test('has styles for all project visual variants', () => {
    expect(css).toContain('.visual-learnhall');
    expect(css).toContain('.visual-genmap');
    expect(css).toContain('.visual-superb');
    expect(css).toContain('.visual-ftbl');
  });

  test('includes skip-link styles for accessibility', () => {
    expect(css).toContain('.skip-link');
    expect(css).toContain('.skip-link:focus');
  });

  test('includes focus-visible styles for interactive elements', () => {
    expect(css).toContain('focus-visible');
  });

  test('header uses sticky positioning', () => {
    expect(css).toMatch(/\.site-header\s*\{[^}]*position:\s*sticky/);
  });
});
