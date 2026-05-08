## Email-template

## Оглавление

#### 1. [Основное](#основное)

#### 2. [Техническая документация шаблона](#техническая-документация-шаблона)

#### 3. [Выгрузка на продакшн](#выгрузка-на-продакшн)

#### 4. [Перенос фронта с github на gitlab](#перенос-фронта-с-github-на-gitlab)

## Основное

**Верстка** - [Ссылка на шаблон]()

**Макет** - [Cсылка на макет в Фигме](https://www.figma.com/file/4nWT2y4l26w78f988bGQLP/ua74.ru---%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD?type=design&node-id=19-2&mode=design&t=ncLEqIc344OP5mZb-0)

#### Краткое описание:

1.

**Верстку выполнил** - Гнездилова Виктория

**Фронт выполнил** - ...

**Проектный менеджер** -

**Бэкенд разработчик** - ...

## Техническая документация шаблона

# Фронтенд Шаблон

Шаблон предназначен для верстки сайтов и веб-приложений с
использованием [Vite](https://vitejs.dev/) и [Vue 3](https://v3.vuejs.org/).

В основе шаблона используются следующие
технологии: [Pug](https://pugjs.org/api/getting-started.html), [Sass](https://sass-lang.com/), [TypeScript](https://www.typescriptlang.org/).

## Требования

- [Node.js](https://nodejs.org/en/) >= 18.13.0
- [Bunjs](https://bun.sh/) >= 1.0.0
- [NPM](https://www.npmjs.com/) >= 9.0.0

## Выгрузка на продакшн

1. Заполнить данные продакшена в файле `project.config.ts`, в объекте `FTP_PRODUCTION_OPTIONS`
2. Запустить команду:
	```
	bun run deploy-production
	```

## Перенос фронта с github на gitlab

1. В gitlab репозитории создать папку `/local/client-app/`
2. Перенести все содержимое github репозитория
3. Удалить папки/файлы .github, .git
5. В [handbook](https://gitlab.in-progress.ru/frontend/frontend-rules/-/wikis/helpfull/hdbk) добавить, ссылку на gitlab фронт
6. Github репозиторий [архивировать](https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories#archiving-a-repository), либо кого то попросить
7. В github репозитории добавить в `README.md`, что репозиторий перенесен
```
# ВНИМАНИЕ!!! ПЕРЕЕХАЛ НА [GITLAB](ссылка) ‼ ‼
```

## Доступные команды

Установка зависимостей

Bun:

```
curl -fsSL https://bun.sh/install | bash
```
```
source ./.bashrc
```
```
bun install --frozen-lockfile
```
```
bun run
```

Запуск в режиме разработчика

```
bun run dev
```

Собрать проект

```
bun run build
```

Собрать проект и html

```
bun run build-initial
```

Собрать проект и запустить локальный сервер для просмотра продакшн версии

```
bun run preview
```

Деплой проекта на html.xpager.ru

```
bun run deploy
```

Деплой проекта на продакшн

```
bun run deploy-production
```

### Эмулятор safari

```
npm install -g playwright
```
```
npx playwright install chromium webkit
```
```
npx playwright install-deps chromium webkit
```
```
npx playwright wk localhost:8080
```

## Структура папок и файлов

```
├── .vscode/                            # настройки VSCode
├── config/                             # настройки сборки
│   ├── helpers/                        # хелперы для сборщика
│   ├── plugins/                        # плагины для сборщика
│       ├── pug/                        # плагин для сборки pug файлов
│       └── deploy/                     # плагин для деплоя проекта
│   └── postcss/                        # postcss
│       └── functions/                  # css функции
├── dist/                               # собранный проект
├── src/                                # исходники
│   ├── assets/                         # ресурсы проекта (картинки, шрифты, иконки, ...)
│   │   ├── img/                        # папка для хранения картинок
│   │   └── icons/                      # папка для хранения иконок (svg)
│   ├── components/                     # VUE компоненты
│   │   ├── sliders/                    # компоненты слайдеров (Swiper)
│   │   ├── selects/                    # компоненты селектов (пример)
│   │   └── utils/                      # полезные компоненты
│   │       ├── form/                   # компоненты форм (checkbox, input, ...)
│   │       ├── modals/                 # компоненты модальных окон
│   │       ├── templates/              # компоненты шаблонов
│   │       ├── transitions/            # компоненты переходов
│   │       └── ui/                     # компоненты UI (табы, аккордеоны, ...)
│   ├── public/                         # папка для хранения статических файлов (favicon, opengraph, шрифты, ...)
│   │   ├── favicons/                   # фавиконки
│   │   ├── fonts/                      # шрифты
│   │   └── img/                        # папка для хранения статичных картинок
│   ├── scripts/                        # скрипты
│   │   ├── api/                        # модули для работы с API
│   │   ├── consts/                     # константы, постоянные данные
│   │   ├── declarations/               # декларации TS
│   │   ├── directives/                 # директивы Vue
│   │   ├── composables/                # комозиции (бывшие миксины)
│   │   ├── plugins/                    # плагины проекта
│   │   │   ├── app/                    # плагины приложения (подключемые к Vue)
│   │   │   └── vanila/                 # плагины для работы с ванильным JS
│   │   ├── router/                     # роутер Vue
│   │   ├── store/                      # хранилище Vue
│   │   ├── utils/                      # утилиты
│   │   ├── ap.ts                       # точка входа для Vue
│   │   └── main.js                     # главный скрипт
│   ├── styles/                         # стили сайта
│   │   ├── main.scss                   # главный файл стилей
│   │   ├── base/                       # базовые стили
│   │   │   ├── nested/                 # миксины, переменные и функции
│   │   │   ├── animations.sass         # анимации, используемые скриптом animations.ts
│   │   │   ├── base.sass               # базовые стили (html, body, ...)
│   │   │   ├── keyframes.sass          # общие keyframes
│   │   │   ├── null.sass               # сброс стилей браузера
│   │   │   ├── text.sass               # базовые стили текста
│   │   │   ├── preview-styles.sass     # стили для превью страницы
│   │   │   └── variables.sass          # переменные
│   │   ├── blocks/                     # стили общих блоков
│   │   │   ├── ui/                     # стили UI (кнопки, ссылки, модальные окна ...)
│   │   │   ├── form.sass               # стили форм
│   │   │   ├── error-block.sass        # стили блока ошибки
│   │   │   └── standard-block.sass     # стили контентного блока
│   │   ├── emails/                     # стили почтовых писем
│   │   ├── libs/                       # стили различных библиотек (плагинов)
│   │   ├── modals/                     # стили модалок
│   │   ├── pages/                      # стили страниц
│   │   └── sections/                   # стили секций
│   ├── templates/                      # Разметка
│   │   ├── base/                       # базовые шаблоны
│   │   │   ├── _head.pug               # шаблон страницы
│   │   │   ├── _mixins.pug             # миксины
│   │   │   └── _scripts.pug            # подключение скриптов
│   │   ├── blocks/                     # шаблоны общих блоков
│   │   ├── emails/                     # почтовые шаблоны
│   │   ├── pages/                      # шаблоны страниц
│   │   ├── popups/                     # шаблоны попапов
│   │   └── sections/                   # шаблоны секциий
│   ├── views/                          # страницы
│   │   ├── emails/                     # почтовые шаблоны
│   └── index.html                      # главный индексовый файл проекта
├── .editorconfig                       # файл с настройками форматирования кода
├── .env                                # файл с переменными окружения
├── .eslint.config.js                   # файл с настройками eslint
├── .gitignore                          # файл с настройками git (исключает ненужные папки)
├── .npmrc                              # файл с настройками npm
├── .env.d.ts                           # файл с типами переменных окружения
├── package.json                        # файл с установленными пакетами
├── project.config.ts                   # файл с настройками проекта
├── README.md                           # документация сборки
├── tsconfig.json                       # файл с настройками typescript
├── tsconfig.node.json                  # файл с настройками typescript для node
└── vite.config.ts                      # файл с настройками vite
```
