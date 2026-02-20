import { test, expect } from '@playwright/test';

test.describe('Site Regression Tests', () => {
  test('crawls the site to verify all links work and pages produce content', async ({
    page,
    request,
    baseURL,
  }) => {
    // Increase test timeout to allow time to crawl all pages
    test.setTimeout(120 * 1000);

    const visited = new Set<string>();
    const queue = ['/copilot-cli-handbook'];
    const externalLinksToVerify = new Set<string>();

    while (queue.length > 0) {
      // Get the next URL from the queue
      const currentPath = queue.shift()!;
      if (visited.has(currentPath)) continue;

      visited.add(currentPath);

      // Navigate to the internal page
      const response = await page.goto(currentPath);

      // (a) Verify the page didn't throw a 404 or 500 error
      expect(response?.status(), `Failed to load ${currentPath}`).toBe(200);

      // (b) Verify the landing page is producing content
      // We know from your Astro layouts that content pages use <article class="handbook-content">
      const article = page.locator('article.handbook-content');
      await expect(article, `Missing article content on ${currentPath}`).toBeVisible();

      const h1 = article.locator('h1');
      await expect(h1, `Missing H1 header on ${currentPath}`).toBeVisible();

      const h1Text = await h1.textContent();
      expect(h1Text?.trim().length, `Empty H1 on ${currentPath}`).toBeGreaterThan(0);

      // Extract all links on the current page
      const links = await page.locator('a[href]').all();

      for (const link of links) {
        const href = await link.getAttribute('href');
        if (!href || href.startsWith('mailto:') || href.startsWith('#')) continue;

        const url = new URL(href, baseURL);

        // If it's an internal link, queue it for full page validation
        if (url.origin === new URL(baseURL!).origin) {
          const pathWithQuery = url.pathname + url.search;
          if (!visited.has(pathWithQuery) && !queue.includes(pathWithQuery)) {
            queue.push(pathWithQuery);
          }
        } else {
          // If it's an external link, collect it to verify it's not a dead link
          if (url.protocol === 'http:' || url.protocol === 'https:') {
            externalLinksToVerify.add(url.href);
          }
        }
      }
    }

    // (c) Verify external links are not dead
    for (const externalUrl of externalLinksToVerify) {
      // We use request.get to quickly check status without loading the full browser context
      const extResponse = await request.get(externalUrl, { ignoreHTTPSErrors: true });

      // Allow 200s, 300s, and 403s (some sites block headless automated requests returning 403)
      const isAlive = extResponse.ok() || [401, 403].includes(extResponse.status());

      expect(
        isAlive,
        `Dead external link found: ${externalUrl} returned status ${extResponse.status()}`
      ).toBeTruthy();
    }
  });
});
