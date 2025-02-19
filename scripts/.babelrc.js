const withTests = {
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        useBuiltIns: 'usage',
        corejs: '3',
        targets: { node: '16' },
      },
    ],
  ],
  plugins: [
    '@storybook/babel-plugin-require-context-hook',
    'babel-plugin-dynamic-import-node',
    '@babel/plugin-transform-runtime',
  ],
};

// type BabelMode = 'cjs' | 'esm';

const modules = process.env.BABEL_MODE === 'cjs' ? 'auto' : false;

// FIXME: optional chaining introduced in chrome 80, not supported by wepback4
// https://github.com/webpack/webpack/issues/10227#issuecomment-642734920
const targets = process.env.BABEL_MODE === 'esm' ? { chrome: '100' } : { node: '16' };

module.exports = {
  compact: false,
  ignore: [
    '../code/lib/codemod/src/transforms/__testfixtures__',
    '../code/lib/postinstall/src/__testfixtures__',
    '../code/**/typings.d.ts',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
        useBuiltIns: 'usage',
        corejs: '3',
        targets,
        modules,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
    'babel-plugin-macros',
    ['@emotion', { sourceMap: true, autoLabel: 'always' }],
  ],
  env: {
    test: withTests,
  },
  overrides: [
    {
      test: '../code/examples/vue-kitchen-sink',
      presets: ['@vue/babel-preset-jsx'],
      env: {
        test: withTests,
      },
    },
    {
      test: './examples/preact-kitchen-sink',
      presets: [
        [
          '@babel/preset-env',
          {
            shippedProposals: true,
            useBuiltIns: 'usage',
            corejs: '3',
            targets,
            modules,
          },
        ],
        ['@babel/preset-typescript'],
        [
          '@babel/preset-react',
          {
            importSource: 'preact',
            runtime: 'automatic',
          },
        ],
        '@babel/preset-flow',
      ],
      env: { test: withTests },
    },
    {
      test: './lib',
      presets: [
        [
          '@babel/preset-env',
          {
            shippedProposals: true,
            useBuiltIns: 'usage',
            corejs: '3',
            modules,
            targets,
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        'babel-plugin-macros',
        ['@emotion', { sourceMap: true, autoLabel: 'always' }],
        'babel-plugin-add-react-displayname',
      ],
      env: {
        test: withTests,
      },
    },
    {
      test: [
        '../code/lib/node-logger',
        '../code/lib/core',
        '../code/lib/core-common',
        '../code/lib/core-server',
        '../code/lib/builder-webpack5',
        '../code/lib/codemod',
        '../code/addons/storyshots',
        '../code/**/src/server/**',
        '../code/**/src/bin/**',
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            shippedProposals: true,
            useBuiltIns: 'usage',
            targets: {
              node: '16',
            },
            modules,
            corejs: '3',
          },
        ],
      ],
      plugins: [
        '@emotion',
        'babel-plugin-macros',
        '@babel/plugin-transform-arrow-functions',
        '@babel/plugin-transform-shorthand-properties',
        '@babel/plugin-transform-block-scoping',
        '@babel/plugin-transform-destructuring',
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-export-default-from',
      ],
      env: {
        test: withTests,
      },
    },
    {
      test: ['**/virtualModuleEntry.template.js'],
      presets: [
        [
          '@babel/preset-env',
          {
            shippedProposals: true,
            useBuiltIns: 'usage',
            targets: {
              node: '16',
            },
            corejs: '3',
            modules: false,
          },
        ],
      ],
    },
  ],
};
