import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ".")
    }
  },
  // @testing-library/dom's transitive deps are CJS (aria-query, lz-string,
  // dom-accessibility-api, pretty-format). In browser mode the only CJS
  // interop is for Vite-pre-bundled deps, so they must be pre-bundled with
  // needsInterop or their named/default imports break in the Storybook
  // vitest project.
  optimizeDeps: {
    include: ["aria-query", "lz-string", "dom-accessibility-api", "pretty-format"],
    needsInterop: ["aria-query", "lz-string", "dom-accessibility-api", "pretty-format"],
  },
  test: {
    projects: [{
      extends: true,
      test: {
        name: 'unit',
        environment: "jsdom",
        globals: true,
        setupFiles: ["./__tests__/setup.ts"],
        include: ["**/*.test.{ts,tsx}"],
        exclude: ["node_modules/**", ".next/**", ".opencode/**", "e2e/**"],
        testTimeout: 10000
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});
