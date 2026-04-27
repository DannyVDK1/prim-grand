/**
 * База фильтров для сайта ПРИМ ГРАНД.
 *
 * Структура задумана для прямой замены на ваш Excel с Фарпоста.
 * Достаточно сконвертировать .xlsx в JSON (онлайн-конвертер
 * или Python/Node-скрипт), и подставить в FILTERS_DB.
 *
 * Поля каждой записи:
 *   code      - каталожный номер (артикул производителя)
 *   type      - тип фильтра: oil | air | fuel | hydraulic | cabin
 *   brand     - марка машины: HINO, ISUZU, KOMATSU и т.д.
 *   models    - массив моделей (или ['*'] для «все»)
 *   title     - короткое описание/название
 *   stock     - количество на складе (для индикации наличия)
 *   manufacturer - производитель фильтра (Donaldson, Mann, Sakura...)
 */

const FILTERS_DB = [
  // HINO
  { code: '15208-Z9007', type: 'oil', brand: 'HINO', models: ['Ranger', '500'], title: 'Масляный фильтр', stock: 18, manufacturer: 'Sakura' },
  { code: '17801-3380',  type: 'air', brand: 'HINO', models: ['Ranger', '700'], title: 'Воздушный фильтр (первичный)', stock: 12, manufacturer: 'Donaldson' },
  { code: '23303-78090', type: 'fuel', brand: 'HINO', models: ['Ranger', '500', '700'], title: 'Топливный фильтр-сепаратор', stock: 7, manufacturer: 'Sakura' },
  { code: '88568-1450',  type: 'cabin', brand: 'HINO', models: ['500', '700'], title: 'Салонный фильтр (угольный)', stock: 22, manufacturer: 'OEM' },

  // ISUZU
  { code: '8-94391049-1', type: 'oil', brand: 'ISUZU', models: ['ELF', 'GIGA', 'FORWARD'], title: 'Масляный фильтр', stock: 24, manufacturer: 'Sakura' },
  { code: '8-94456-741-0', type: 'air', brand: 'ISUZU', models: ['ELF', 'FORWARD'], title: 'Воздушный фильтр', stock: 9, manufacturer: 'Mann' },
  { code: '8-97191263-0', type: 'fuel', brand: 'ISUZU', models: ['ELF', 'FORWARD', 'GIGA'], title: 'Топливный фильтр', stock: 14, manufacturer: 'Sakura' },
  { code: '1-87810-179-0', type: 'hydraulic', brand: 'ISUZU', models: ['GIGA'], title: 'Гидравлический фильтр', stock: 4, manufacturer: 'Donaldson' },

  // MITSUBISHI FUSO
  { code: 'ME215002', type: 'oil', brand: 'MITSUBISHI FUSO', models: ['Canter', 'Fighter', 'Super Great'], title: 'Масляный фильтр', stock: 16, manufacturer: 'Sakura' },
  { code: 'ME017242', type: 'air', brand: 'MITSUBISHI FUSO', models: ['Canter', 'Fighter'], title: 'Воздушный фильтр', stock: 6, manufacturer: 'Donaldson' },
  { code: 'ME132525', type: 'fuel', brand: 'MITSUBISHI FUSO', models: ['Fighter', 'Super Great'], title: 'Топливный фильтр-сепаратор', stock: 11, manufacturer: 'Sakura' },

  // KOMATSU
  { code: '600-211-1340', type: 'air', brand: 'KOMATSU', models: ['PC200', 'PC300', 'WA320'], title: 'Воздушный фильтр (первичный)', stock: 8, manufacturer: 'Donaldson' },
  { code: '600-181-9260', type: 'air', brand: 'KOMATSU', models: ['PC200', 'PC300'], title: 'Воздушный фильтр (вторичный)', stock: 7, manufacturer: 'Donaldson' },
  { code: '6754-79-8140', type: 'oil', brand: 'KOMATSU', models: ['PC200', 'PC270'], title: 'Масляный фильтр', stock: 13, manufacturer: 'Komatsu OEM' },
  { code: '600-319-3750', type: 'fuel', brand: 'KOMATSU', models: ['PC200', 'PC300'], title: 'Топливный фильтр', stock: 10, manufacturer: 'Komatsu OEM' },
  { code: '07063-01383', type: 'hydraulic', brand: 'KOMATSU', models: ['PC200', 'PC300', 'WA320'], title: 'Гидравлический фильтр', stock: 5, manufacturer: 'Komatsu OEM' },

  // HITACHI
  { code: '4630525', type: 'air', brand: 'HITACHI', models: ['ZX200', 'ZX330'], title: 'Воздушный фильтр', stock: 6, manufacturer: 'Donaldson' },
  { code: '4630526', type: 'air', brand: 'HITACHI', models: ['ZX200', 'ZX330'], title: 'Воздушный фильтр вторичный', stock: 5, manufacturer: 'Donaldson' },
  { code: '4448336', type: 'oil', brand: 'HITACHI', models: ['ZX200', 'ZX270'], title: 'Масляный фильтр', stock: 9, manufacturer: 'Hitachi OEM' },
  { code: '4615306', type: 'hydraulic', brand: 'HITACHI', models: ['ZX200', 'ZX330'], title: 'Гидравлический фильтр', stock: 3, manufacturer: 'Hitachi OEM' },

  // CATERPILLAR
  { code: '1R-0750', type: 'fuel', brand: 'CATERPILLAR', models: ['320D', '330D', '950H'], title: 'Топливный фильтр', stock: 12, manufacturer: 'CAT OEM' },
  { code: '1R-1808', type: 'oil', brand: 'CATERPILLAR', models: ['320D', '330D'], title: 'Масляный фильтр', stock: 8, manufacturer: 'CAT OEM' },
  { code: '6I-2509', type: 'air', brand: 'CATERPILLAR', models: ['320D', '330D'], title: 'Воздушный фильтр', stock: 4, manufacturer: 'Donaldson' },

  // VOLVO
  { code: '21707132', type: 'oil', brand: 'VOLVO', models: ['FH', 'FM', 'FMX'], title: 'Масляный фильтр', stock: 15, manufacturer: 'Mann' },
  { code: '21620152', type: 'fuel', brand: 'VOLVO', models: ['FH', 'FM'], title: 'Топливный фильтр', stock: 11, manufacturer: 'Mann' },
  { code: '21115483', type: 'air', brand: 'VOLVO', models: ['FH', 'FM', 'FMX'], title: 'Воздушный фильтр', stock: 7, manufacturer: 'Mann' },

  // HOWO / SHACMAN
  { code: 'VG1540080110', type: 'oil', brand: 'HOWO', models: ['A7', 'T5G'], title: 'Масляный фильтр', stock: 20, manufacturer: 'Sinotruk OEM' },
  { code: 'WG9725190600', type: 'air', brand: 'HOWO', models: ['A7', 'T5G'], title: 'Воздушный фильтр', stock: 14, manufacturer: 'Sinotruk OEM' },
  { code: 'WG9112550005', type: 'fuel', brand: 'HOWO', models: ['A7'], title: 'Топливный фильтр', stock: 9, manufacturer: 'Sinotruk OEM' },

  { code: 'DZ9112550101', type: 'fuel', brand: 'SHACMAN', models: ['F3000', 'X3000'], title: 'Топливный фильтр-сепаратор', stock: 13, manufacturer: 'Shacman OEM' },
  { code: 'DZ9112190104', type: 'air', brand: 'SHACMAN', models: ['F3000', 'X3000'], title: 'Воздушный фильтр', stock: 10, manufacturer: 'Donaldson' },

  // KAMAZ
  { code: '740.1012040-10', type: 'oil', brand: 'KAMAZ', models: ['5320', '6520', '65117'], title: 'Масляный фильтр', stock: 18, manufacturer: 'KAMAZ OEM' },
  { code: '7406.1109560', type: 'air', brand: 'KAMAZ', models: ['5320', '6520'], title: 'Воздушный фильтр', stock: 12, manufacturer: 'Mann' },

  // JCB
  { code: '32-925994', type: 'oil', brand: 'JCB', models: ['3CX', '4CX'], title: 'Масляный фильтр', stock: 7, manufacturer: 'JCB OEM' },
  { code: '32-925682', type: 'fuel', brand: 'JCB', models: ['3CX', '4CX'], title: 'Топливный фильтр', stock: 5, manufacturer: 'JCB OEM' },
  { code: '32-925337', type: 'hydraulic', brand: 'JCB', models: ['3CX', '4CX'], title: 'Гидравлический фильтр', stock: 4, manufacturer: 'JCB OEM' },
];

/* Универсальные позиции от Donaldson и др. */
const UNIVERSAL_FILTERS = [
  { code: 'P550440', type: 'fuel', brand: 'УНИВЕРСАЛЬНЫЙ', models: ['*'], title: 'Топливный фильтр-сепаратор Donaldson', stock: 25, manufacturer: 'Donaldson' },
  { code: 'P553771', type: 'oil', brand: 'УНИВЕРСАЛЬНЫЙ', models: ['*'], title: 'Масляный фильтр Donaldson', stock: 30, manufacturer: 'Donaldson' },
];

window.FILTERS_DB = [...FILTERS_DB, ...UNIVERSAL_FILTERS];

/* Карта брендов и моделей для фильтров поиска */
window.VEHICLE_DATA = {
  'HINO': ['Ranger', '500', '700'],
  'ISUZU': ['ELF', 'FORWARD', 'GIGA'],
  'MITSUBISHI FUSO': ['Canter', 'Fighter', 'Super Great'],
  'KOMATSU': ['PC200', 'PC270', 'PC300', 'WA320'],
  'HITACHI': ['ZX200', 'ZX270', 'ZX330'],
  'CATERPILLAR': ['320D', '330D', '950H'],
  'VOLVO': ['FH', 'FM', 'FMX'],
  'HOWO': ['A7', 'T5G'],
  'SHACMAN': ['F3000', 'X3000'],
  'KAMAZ': ['5320', '6520', '65117'],
  'JCB': ['3CX', '4CX'],
};

window.FILTER_TYPE_NAMES = {
  oil: 'Масляный',
  air: 'Воздушный',
  fuel: 'Топливный',
  hydraulic: 'Гидравлический',
  cabin: 'Салонный',
};
