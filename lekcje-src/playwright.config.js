import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 60000,
  workers: 4,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4180/lekcje/',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined },
  },
  webServer: {
    command: 'python3 -m http.server 4180 --directory ..',
    url: 'http://127.0.0.1:4180/lekcje/index.html',
    reuseExistingServer: true,
    stdout: 'ignore',
    stderr: 'ignore',
  },
});
