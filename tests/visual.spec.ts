import { expect, test } from '@playwright/test';

test('page layout matches the accepted visual baseline', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    const NativeDate = Date;
    const fixedTime = NativeDate.parse('2026-11-15T12:00:00+01:00');

    class FrozenDate extends NativeDate {
      constructor(...args: ConstructorParameters<typeof Date>) {
        if (args.length === 0) {
          super(fixedTime);
        } else {
          super(...args);
        }
      }

      static now() {
        return fixedTime;
      }
    }

    globalThis.Date = FrozenDate;
  });

  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('/');
  await expect(page.locator('#title')).toContainText('Snart jul?');
  await expect(page.locator('#count-down')).toContainText('Det er');
  await expect(page.locator('#xmas-feeling')).toContainText('julefølelse');
  await expect(page.locator('.present-container img')).toHaveCount(2);
  await expect(page.locator('#title a')).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(page.locator('.hero > a')).toHaveCSS('color', 'rgb(255, 255, 255)');

  const chart = page.locator('#chart');
  await expect(chart).toBeVisible();
  await expect.poll(async () => chart.evaluate((canvas: HTMLCanvasElement) => canvas.width)).toBeGreaterThan(0);
  await expect.poll(async () => chart.evaluate((canvas: HTMLCanvasElement) => canvas.height)).toBeGreaterThan(0);

  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (image) => image.decode()));
  });
  await page.waitForTimeout(1200);
  expect(pageErrors).toEqual([]);

  await expect(page).toHaveScreenshot('page.png', {
    fullPage: true,
    // Chart.js 4 rasterizes mobile canvas tick labels slightly differently.
    maxDiffPixels: testInfo.project.name === 'mobile' ? 2000 : 0,
  });

  await chart.scrollIntoViewIfNeeded();
  const beforeHover = await chart.evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  const chartBounds = await chart.boundingBox();
  if (!chartBounds) {
    throw new Error('Chart canvas has no visible bounds');
  }
  await page.mouse.move(chartBounds.x + chartBounds.width / 2, chartBounds.y + chartBounds.height / 2);
  await expect.poll(async () => chart.evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL())).not.toBe(beforeHover);
});