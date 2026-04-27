# ПРИМ ГРАНД — Корпоративный сайт

Одностраничный сайт ООО «ПРИМ ГРАНД» — фильтры + аренда спецтехники, Владивосток.

## Деплой на Render.com

### 1. Загрузить на GitHub (private repo)
```bash
cd prim-grand
git init
git add .
git commit -m "Initial: PRIM GRAND website"
git branch -M main
git remote add origin https://github.com/ВАШ_АККАУНТ/prim-grand.git
git push -u origin main
```

### 2. Render.com
1. New → Static Site → подключить GitHub → выбрать prim-grand
2. Build Command: оставить пустым
3. Publish Directory: `.`
4. Create Static Site

### 3. Домен (reg.ru)
1. Render → Settings → Custom Domains → добавить домен
2. reg.ru → DNS → CNAME: `@` → `prim-grand.onrender.com`

## Обновление базы фильтров

Замените массив `FILTERS_DB` в `assets/js/data.js` данными из Excel.

Формат записи:
```js
{ code: '15208-Z9007', type: 'oil', brand: 'HINO', models: ['Ranger'], title: 'Масляный фильтр', stock: 18, manufacturer: 'Sakura' }
```

Типы: oil, air, fuel, hydraulic, cabin
