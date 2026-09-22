import { defineConfig } from 'vite';
import aurelia from '@aurelia/vite-plugin';
import babel, { defineRolldownBabelPreset } from '@rolldown/plugin-babel';
import path from 'node:path';

const aureliaResourceInclude = [
  path.posix.join(path.resolve(import.meta.dirname, 'src').replaceAll('\\', '/'), '**/*.{ts,js,html}'),
  path.posix.join(path.resolve(import.meta.dirname, '../aurelia-gridstack/src').replaceAll('\\', '/'), '**/*.{ts,js,html}'),
];

const decoratorPreset = defineRolldownBabelPreset({
  preset: () => ({
    plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]],
  }),
  rolldown: {
    filter: {
      code: '@',
    },
  },
});

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/aurelia-gridstack/' : '/',
  resolve: {
    alias: [
      { find: /^aurelia-gridstack$/, replacement: path.resolve(import.meta.dirname, '../aurelia-gridstack/src/index.ts') },
    ],
  },
  server: {
    open: true,
    port: 9000,
  },
  plugins: [
    aurelia({ useDev: true, include: aureliaResourceInclude }),
    babel({ presets: [decoratorPreset] }),
  ],
});
