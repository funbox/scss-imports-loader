# @funboxteam/scss-imports-loader

[![npm](https://img.shields.io/npm/v/@funboxteam/scss-imports-loader.svg)](https://www.npmjs.com/package/@funboxteam/scss-imports-loader)

Webpack loader that injects predefined `@import` rules into the processed files.

[По-русски](./README.ru.md)

## Rationale

When we write styles using SCSS we store some global variables and mixins in the separated files. Most of them are used
in every component, and therefore in order not to constantly duplicate imports to decided to find a way to list those
files once and make them to be injected everywhere.

It was possible to use [`additionalData`](https://webpack.js.org/loaders/sass-loader/#additionaldata) from sass-loader,
but the plugin way turned out to be more convenient.

## Getting Started

Install the loader in your project:

```bash
npm install --save-dev @funboxteam/scss-imports-loader
```

Add it into the project's Webpack config so that it is called before sass-loader, and set `options.path` to the list
of injected paths to files:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // ...
          'sass-loader',
          {
            loader: '@funboxteam/scss-imports-loader',
            options: {
              paths: [
                'app/styles/variables/colors',
                'app/styles/variables/breakpoints',
                'app/styles/variables/layout',
                'app/styles/variables/typography',
                'app/styles/mixins/respond-to',
                'app/styles/mixins/placeholder',
                'app/styles/mixins/text-cut',
                'app/styles/mixins/visually-hidden',
              ],
            },
          },
          // ...
        ],
      },
    ],
  },
};
```

## Implementation details

If you pass the same imports like above, then these strings will be added into the beginning of the every processed 
SCSS file during the build stage: 

```scss
@import 'app/styles/variables/colors';
@import 'app/styles/variables/breakpoints';
@import 'app/styles/variables/layout';
@import 'app/styles/variables/typography';
@import 'app/styles/mixins/respond-to';
@import 'app/styles/mixins/placeholder';
@import 'app/styles/mixins/text-cut';
@import 'app/styles/mixins/visually-hidden';
```

That means the paths in `options.path` have to be “available to resolve” by Webpack. 

In general, the imported files don't have to be SCSS files.
It's enough that the set of loaders listed in the Webpack config can handle them.

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)
