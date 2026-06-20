const { loadPage } = require('./helpers');

describe('index.html (Homepage)', () => {
  const doc = loadPage('index.html');

  test('has a hero section', () => {
    expect(doc.querySelector('.hero')).not.toBeNull();
  });

  test('hero contains a primary CTA linking to work.html', () => {
    const cta = doc.querySelector('.hero .button');
    expect(cta).not.toBeNull();
    expect(cta.getAttribute('href')).toBe('work.html');
  });

  test('hero contains a secondary CTA linking to contact.html', () => {
    const secondary = doc.querySelector('.hero .button.secondary');
    expect(secondary).not.toBeNull();
    expect(secondary.getAttribute('href')).toBe('contact.html');
  });

  test('displays four featured project cards', () => {
    const cards = doc.querySelectorAll('.project-card');
    expect(cards.length).toBe(4);
  });

  test('each project card links to its case study page', () => {
    const links = doc.querySelectorAll('.project-card .text-link');
    expect(links.length).toBe(4);
    links.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^projects\/.+\.html$/);
    });
  });

  test('displays four service cards', () => {
    const services = doc.querySelectorAll('.service-card');
    expect(services.length).toBe(4);
  });

  test('service cards are numbered 01 through 04', () => {
    const numbers = doc.querySelectorAll('.service-card .number');
    const values = Array.from(numbers).map((n) => n.textContent.trim());
    expect(values).toEqual(['01', '02', '03', '04']);
  });

  test('has a CTA section with contact link', () => {
    const cta = doc.querySelector('.cta');
    expect(cta).not.toBeNull();
    const ctaLink = cta.querySelector('.button');
    expect(ctaLink.getAttribute('href')).toBe('contact.html');
  });
});

describe('about.html', () => {
  const doc = loadPage('about.html');

  test('has a page hero section', () => {
    expect(doc.querySelector('.page-hero')).not.toBeNull();
  });

  test('has an approach section with three cards', () => {
    const cards = doc.querySelectorAll('.grid.three .service-card');
    expect(cards.length).toBe(3);
  });

  test('approach cards are numbered 01 through 03', () => {
    const numbers = doc.querySelectorAll(
      '.grid.three .service-card .number'
    );
    const values = Array.from(numbers).map((n) => n.textContent.trim());
    expect(values).toEqual(['01', '02', '03']);
  });

  test('has a skills section with Design and Tools panels', () => {
    const panels = doc.querySelectorAll('.skills .panel');
    expect(panels.length).toBe(2);
    const titles = Array.from(panels).map((p) =>
      p.querySelector('h3').textContent.trim()
    );
    expect(titles).toContain('Design');
    expect(titles).toContain('Tools');
  });

  test('each skills panel has at least 5 items', () => {
    const panels = doc.querySelectorAll('.skills .panel');
    panels.forEach((panel) => {
      const items = panel.querySelectorAll('.list li');
      expect(items.length).toBeGreaterThanOrEqual(5);
    });
  });
});

describe('work.html', () => {
  const doc = loadPage('work.html');

  test('has a page hero', () => {
    expect(doc.querySelector('.page-hero')).not.toBeNull();
  });

  test('lists four work items', () => {
    const items = doc.querySelectorAll('.work-item');
    expect(items.length).toBe(4);
  });

  test('each work item has a project visual and a case study link', () => {
    const items = doc.querySelectorAll('.work-item');
    items.forEach((item) => {
      expect(item.querySelector('.project-visual')).not.toBeNull();
      const link = item.querySelector('.text-link');
      expect(link).not.toBeNull();
      expect(link.getAttribute('href')).toMatch(/^projects\/.+\.html$/);
    });
  });

  test('each work item has an h2 project title', () => {
    const items = doc.querySelectorAll('.work-item');
    items.forEach((item) => {
      const h2 = item.querySelector('h2');
      expect(h2).not.toBeNull();
      expect(h2.textContent.trim().length).toBeGreaterThan(0);
    });
  });
});

describe('contact.html', () => {
  const doc = loadPage('contact.html');

  test('has a page hero', () => {
    expect(doc.querySelector('.page-hero')).not.toBeNull();
  });

  test('has a services list', () => {
    const items = doc.querySelectorAll('aside .list li');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  test('has contact links for Email, LinkedIn, and Portfolio', () => {
    const links = doc.querySelectorAll('.contact-link');
    expect(links.length).toBe(3);
    const labels = Array.from(links).map((l) =>
      l.querySelector('strong').textContent.trim()
    );
    expect(labels).toEqual(
      expect.arrayContaining(['Email', 'LinkedIn', 'Portfolio'])
    );
  });

  test('email link has a mailto href', () => {
    const emailLink = Array.from(
      doc.querySelectorAll('.contact-link')
    ).find(
      (l) => l.querySelector('strong').textContent.trim() === 'Email'
    );
    expect(emailLink.getAttribute('href')).toMatch(/^mailto:/);
  });

  test('has a CTA section', () => {
    const cta = doc.querySelector('.cta');
    expect(cta).not.toBeNull();
    expect(cta.querySelector('.button')).not.toBeNull();
  });
});

describe('Project case study pages', () => {
  const projectPages = [
    { page: 'projects/learnhall.html', title: 'Learnhall' },
    { page: 'projects/genmap.html', title: 'Genmap' },
    { page: 'projects/ftbl.html', title: 'FTBL' },
    { page: 'projects/superb-exteriors.html', title: 'Superb Exteriors' },
  ];

  describe.each(projectPages)('$page', ({ page, title }) => {
    const doc = loadPage(page);

    test('has a page hero with the project name in h1', () => {
      const hero = doc.querySelector('.page-hero');
      expect(hero).not.toBeNull();
      const h1 = hero.querySelector('h1');
      expect(h1).not.toBeNull();
      expect(h1.textContent.trim()).toBe(title);
    });

    test('has a case layout with sidebar and content', () => {
      expect(doc.querySelector('.case-layout')).not.toBeNull();
      expect(doc.querySelector('.case-meta')).not.toBeNull();
      expect(doc.querySelector('.case-content')).not.toBeNull();
    });

    test('has at least three content panels', () => {
      const panels = doc.querySelectorAll('.case-content .panel');
      expect(panels.length).toBeGreaterThanOrEqual(3);
    });

    test('has a "Back to Work" link', () => {
      const backLink = doc.querySelector('.case-content .button.secondary');
      expect(backLink).not.toBeNull();
      expect(backLink.getAttribute('href')).toBe('../work.html');
      expect(backLink.textContent.trim()).toBe('Back to Work');
    });

    test('sidebar contains a project visual', () => {
      const visual = doc.querySelector('.case-meta .project-visual');
      expect(visual).not.toBeNull();
    });
  });
});
