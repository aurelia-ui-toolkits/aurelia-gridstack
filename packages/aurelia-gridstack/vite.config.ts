import { defineConfig } from 'vite';
import aurelia from '@aurelia/vite-plugin';
import babel, { defineRolldownBabelPreset } from '@rolldown/plugin-babel';

const externalPackages = [
  '@aurelia',
  'aurelia',
  'gridstack',
  'tslib',
];

function isExternal(id: string): boolean {
  return externalPackages.some(pkg => id === pkg || id.startsWith(`${pkg}/`));
}

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
  root: 'src',
  plugins: [
    aurelia({ include: '**/*.{ts,js,html}' }),
    babel({ presets: [decoratorPreset] }),
  ],
  build: {
    outDir: '../dist',
    target: 'es2022',
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: 'index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});
