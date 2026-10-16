import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();

  // Desktop check
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto('http://localhost:3000/');
  await desktop.waitForTimeout(2000);
  await desktop.screenshot({ path: 'screenshot-home-redesign.png' });

  // Gallery check
  await desktop.goto('http://localhost:3000/gallery');
  await desktop.waitForTimeout(2000);
  await desktop.screenshot({ path: 'screenshot-gallery-redesign.png' });

  // Gallery detail check
  await desktop.goto('http://localhost:3000/gallery/modern-multi-storey-residence');
  await desktop.waitForTimeout(2000);
  await desktop.screenshot({ path: 'screenshot-detail-redesign.png' });

  // Mobile check
  const mobile = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await mobile.goto('http://localhost:3000/');
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({ path: 'screenshot-mobile-redesign.png' });

  await browser.close();
})();
