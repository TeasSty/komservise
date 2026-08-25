import { chromium } from 'playwright-core';
const EDGE = process.env.EDGE;
const OUT = process.env.OUT;
const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const desk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desk.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await desk.waitForTimeout(800);
const metrics = await desk.evaluate(() => {
  const brand = document.querySelector('.hero-brand');
  const h1 = document.querySelector('.hero h1');
  const hero = document.querySelector('.hero');
  const header = document.querySelector('.site-header');
  const r = (el) => el ? (() => { const b = el.getBoundingClientRect(); return { top: b.top, bottom: b.bottom, height: b.height, width: b.width }; })() : null;
  return {
    headerH: header?.offsetHeight,
    heroH: hero?.offsetHeight,
    brand: r(brand),
    h1: r(h1),
    vh: window.innerHeight,
    brandText: brand?.textContent,
    h1Text: h1?.textContent,
    brandScrollWidth: brand?.scrollWidth,
    brandClientWidth: brand?.clientWidth,
  };
});
console.log('DESKTOP_METRICS', JSON.stringify(metrics, null, 2));
await desk.screenshot({ path: OUT + '/hero-desktop-fold.png' });
await desk.evaluate(() => window.scrollTo(0, Math.max(0, document.querySelector('.hero').getBoundingClientRect().bottom + window.scrollY - window.innerHeight)));
await desk.waitForTimeout(200);
await desk.screenshot({ path: OUT + '/hero-desktop-bottom.png' });

const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await mob.waitForTimeout(800);
const mmetrics = await mob.evaluate(() => {
  const brand = document.querySelector('.hero-brand');
  const h1 = document.querySelector('.hero h1');
  const btn = document.querySelector('.header-actions .btn-primary');
  const r = (el) => el ? (() => { const b = el.getBoundingClientRect(); return { top: b.top, bottom: b.bottom, height: b.height, width: b.width }; })() : null;
  return {
    headerH: document.querySelector('.site-header')?.offsetHeight,
    heroH: document.querySelector('.hero')?.offsetHeight,
    brand: r(brand),
    h1: r(h1),
    cta: r(document.querySelector('.hero-cta')),
    vh: window.innerHeight,
    brandScrollWidth: brand?.scrollWidth,
    brandClientWidth: brand?.clientWidth,
    btnText: btn?.textContent?.trim(),
    btnW: btn?.getBoundingClientRect().width,
  };
});
console.log('MOBILE_METRICS', JSON.stringify(mmetrics, null, 2));
await mob.screenshot({ path: OUT + '/hero-mobile-fold.png' });
await mob.evaluate(() => {
  const hero = document.querySelector('.hero');
  const y = hero.offsetTop + hero.offsetHeight - window.innerHeight;
  window.scrollTo(0, Math.max(0, y));
});
await mob.waitForTimeout(200);
await mob.screenshot({ path: OUT + '/hero-mobile-bottom.png' });
await browser.close();
