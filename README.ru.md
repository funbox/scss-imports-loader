# @funboxteam/scss-imports-loader

[![npm](https://img.shields.io/npm/v/@funboxteam/scss-imports-loader.svg)](https://www.npmjs.com/package/@funboxteam/scss-imports-loader)

Лоадер для Вебпака, добавляющий в обрабатываемые файлы `@import`-правила с необходимыми путями.

## Мотивация

При написании стилей на SCSS мы храним различные глобальные переменные и миксины в отдельных файлах. Так или иначе,
большинство из них используется в каждом компоненте, а потому, чтобы не дублировать постоянно импорты, мы решили
найти какой-то способ описать файлы один раз и сделать так, чтобы они подключились везде.

Можно было бы использовать [`additionalData`](https://webpack.js.org/loaders/sass-loader/#additionaldata) у sass-loader,
но вариант с плагином оказался более удобным.

## Установка

Установить лоадер в проекте:

```bash
npm install --save-dev @funboxteam/scss-imports-loader
```

Подключить в конфиге Вебпака так, чтобы он вызывался перед sass-loader, и передать в `options.path` список необходимых 
файлов:

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

## Реализация

Если описать конфиг так, как в примере выше, то во время сборки в начало каждого обрабатываемого SCSS-файла будет 
добавлен следующий набор строк:

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

А потому пути в `options.paths` нужно указывать такими, чтобы их смог разрезолвить Вебпак во время сборки. 

В общем случае импортируемые файлы не обязательно должны быть SCSS-файлами. 
Достаточно того, чтобы их смог обработать тот набор лоадеров, что перечислен в конфиге Вебпака.

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)
