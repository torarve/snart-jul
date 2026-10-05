import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:1234',
    browserName: 'chromium',
    deviceScaleFactor: 1,
    colorScheme: 'light',
    locale: 'nb-NO',
    timezoneId: 'Europe/Oslo',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { viewport: { width: 1440, height: 1000 } },
    },
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 }, isMobile: true },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:1234',
    reuseExistingServer: !process.env.CI,
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixels: 0,
    },
  },
});