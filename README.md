# 🛡️ ФСО — Россия Онлайн (GTA 5)

Официальный портал Федеральной Службы Охраны для проекта «Россия Онлайн» (GTA 5).
Сайт построен на Next.js 16 + TypeScript + Prisma + Tailwind CSS 4 + shadcn/ui.

## 📋 Возможности

- **Многостраничный сайт** (8 разделов): Главная, УСН, УПП, Кодекс этики, Руководство, Приказы, Новости, Админ-панель
- **УСН** — 3 отдела (СБП, ООС, КК), единая система радиокодов, взаимозамещение, правовая основа
- **УПП** — Управление Подготовительного Подразделения, ОПП, требования, огневая подготовка
- **Кодекс этики** — обязанности, запреты, дресс-код, штрафы (Ст. 36)
- **Админ-панель** — управление новостями, приказами, составом руководства (CRUD)
- **Тёмно-синий + золотой** элегантный официальный дизайн
- **Адаптивный** (мобильные/планшеты/десктоп)
- **Поиск и фильтры** на всех страницах со списками

## 🚀 Локальный запуск

```bash
bun install            # установка зависимостей
bun run db:push        # создание SQLite БД (локально)
bun run seed           # заполнение начальными данными
bun run dev            # запуск dev-сервера на http://localhost:3000
```

**Админ-доступ:** `admin` / `fso2024`

## 🌐 Деплой на Vercel (бесплатно, рекомендую)

### Шаг 1: Создать аккаунты
1. [GitHub](https://github.com) — для хранения кода
2. [Vercel](https://vercel.com) — для хостинга (войти через GitHub)
3. [Neon](https://neon.tech) — для PostgreSQL базы данных (бесплатный тариф)

### Шаг 2: Создать базу данных на Neon
1. Зарегистрируйтесь на [neon.tech](https://neon.tech)
2. Создайте новый проект → получите `DATABASE_URL` вида:
   ```
   postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/dbname?sslmode=require
   ```
3. Сохраните эту строку — она понадобится для Vercel

### Шаг 3: Запушить проект на GitHub
```bash
git init
git add .
git commit -m "ФСО — Россия Онлайн: готовый сайт"
git branch -M main
git remote add origin https://github.com/ВАШ_ЛОГИН/fso-russia-online.git
git push -u origin main
```

### Шаг 4: Деплой на Vercel
1. Откройте [vercel.com/new](https://vercel.com/new)
2. Импортируйте репозиторий с GitHub
3. В разделе **Environment Variables** добавьте:
   - `DATABASE_URL` = ваша строка подключения Neon (из шага 2)
   - `SESSION_SECRET` = любой случайный длинный текст (для подписи cookie админа)
4. Нажмите **Deploy**
5. Через 1-2 минуты сайт будет доступен по адресу вида `https://fso-russia-online.vercel.app`

### Шаг 5: Заполнить базу данных
После первого деплоя нужно заполнить базу. Есть два способа:

**Способ A (через Vercel CLI):**
```bash
npm i -g vercel
vercel login
vercel link          # привязать проект
vercel env pull      # скачать переменные в .env.local
# отредактировать .env.local — вставить DATABASE_URL от Neon
bun run db:push:prod  # создать таблицы в PostgreSQL
bun run seed          # заполнить начальными данными
```

**Способ B (вручную через Neon Console):**
1. Откройте Neon-консоль → SQL Editor
2. Скопируйте таблицы из `prisma/schema.prisma`
3. Вставьте seed-данные из `scripts/seed.ts`

### Шаг 6: Обновления
Любой `git push` на GitHub автоматически запускает пересборку на Vercel (1-2 минуты).

---

## 📦 Альтернативные хостинги

### Railway (проще, с встроенной БД)
1. [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Add PostgreSQL plugin (получите `DATABASE_URL` автоматически)
3. Railway автоматически запустит `bun run build` и `bun run start`

### GitHub Pages (только статика, без админки)
Если нужна только витрина (без админ-панели и backend):
1. Включить `output: export` в `next.config.ts`
2. Заменить API-вызовы на статические данные
3. `next build` → загрузить `out/` в GitHub Pages
4. ❌ Админ-панель и CRUD работать не будут

### Свой VPS (полный контроль)
- Любой VPS с Node.js 20+ (например, [VDSina](https://vdsina.ru), от ~200₽/мес)
- `git clone` + `bun install` + `bun run build` + `bun run start`
- Использовать SQLite или установить PostgreSQL

---

## 🗂 Структура проекта

```
/
├── prisma/
│   ├── schema.prisma          # PostgreSQL schema (для Vercel)
│   └── schema.sqlite.prisma   # SQLite schema (для локалки)
├── public/images/             # Эмблемы, инфографики, фоны
├── scripts/seed.ts           # Начальные данные (13 руководителей, 13 приказов, 10 новостей)
├── src/
│   ├── app/
│   │   ├── page.tsx           # Главная
│   │   ├── usn/               # УСН (7 табов)
│   │   ├── upp/               # УПП (7 табов)
│   │   ├── ethics/            # Кодекс этики (6 табов)
│   │   ├── leaders/           # Руководство
│   │   ├── orders/            # Приказы
│   │   ├── news/              # Новости
│   │   ├── admin/             # Админ-панель
│   │   └── api/               # API routes (auth, news, orders, leaders)
│   ├── components/
│   │   ├── site/              # Публичные компоненты
│   │   └── admin/             # Компоненты админки
│   └── lib/                   # Утилиты (auth, db, constants)
└── README.md
```

## 🛠 Технологии

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + shadcn/ui (New York style)
- **Prisma ORM** + PostgreSQL (Neon) / SQLite (dev)
- **Zustand** для состояния админа
- **PT Sans** + **Playfair Display** шрифты (кириллица)
- **Lucide** иконки
- **HMAC-signed cookies** для сессии админа

## 🔐 Безопасность

- Пароли админа хранятся в виде SHA-256 hash + salt
- Сессии подписаны HMAC (32-байтовый ключ)
- Cookie `httpOnly`, `sameSite=lax`, срок 7 дней
- Все API-эндпоинты защищены проверкой сессии

## 📝 Лицензия

Проект создан для RP-проекта «Россия Онлайн» (GTA 5).
Не является официальным государственным ресурсом РФ.
