import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Recipe {
  id: number;
  name: string;
  category: string;
  description: string;
  components: { name: string; dosage: string; role: string }[];
  application: string;
  difficulty: 'Базовый' | 'Средний' | 'Сложный';
  tags: string[];
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Классическая ваниль Мадагаскар',
    category: 'Ванильные',
    description: 'Насыщенная и глубокая ванильная рецептура с бальзамическими нотами. Имитирует натуральный экстракт бобов ванили.',
    components: [
      { name: 'Ванилин', dosage: '0.06%', role: 'Основа' },
      { name: 'Этилванилин', dosage: '0.01%', role: 'Усилитель' },
      { name: 'Гамма-ундекалактон', dosage: '0.008%', role: 'Кремовость' },
    ],
    application: 'Мороженое, шоколад, выпечка',
    difficulty: 'Базовый',
    tags: ['ваниль', 'тёплый', 'кремовый'],
  },
  {
    id: 2,
    name: 'Летние ягоды',
    category: 'Ягодные',
    description: 'Комплексная ягодная рецептура, сочетающая клубничные, малиновые и смородиновые ноты для напитков.',
    components: [
      { name: 'Экстракт клубники', dosage: '0.20%', role: 'Основа' },
      { name: 'Малиновый кетон', dosage: '0.008%', role: 'Малиновый акцент' },
      { name: 'Лимонная эссенция', dosage: '0.03%', role: 'Свежесть' },
    ],
    application: 'Напитки, йогурты, мороженое',
    difficulty: 'Средний',
    tags: ['клубника', 'малина', 'ягодный', 'фруктовый'],
  },
  {
    id: 3,
    name: 'Свежий цитрус',
    category: 'Цитрусовые',
    description: 'Яркая цитрусовая композиция с доминирующими лимонными нотами и апельсиновым подтоном.',
    components: [
      { name: 'Лимонная эссенция', dosage: '0.15%', role: 'Основа' },
      { name: 'Апельсиновое масло', dosage: '0.10%', role: 'Сладость' },
      { name: 'Ацетальдегид', dosage: '0.003%', role: 'Свежесть' },
    ],
    application: 'Напитки, кондитерские изделия',
    difficulty: 'Базовый',
    tags: ['лимон', 'апельсин', 'цитрус', 'свежий'],
  },
  {
    id: 4,
    name: 'Пряная корица',
    category: 'Пряные',
    description: 'Тёплая пряная рецептура на основе коричного альдегида с ванильным фоном для зимних продуктов.',
    components: [
      { name: 'Коричный альдегид', dosage: '0.04%', role: 'Основа' },
      { name: 'Ванилин', dosage: '0.03%', role: 'Тёплый фон' },
      { name: 'Гамма-ундекалактон', dosage: '0.005%', role: 'Кремовость' },
    ],
    application: 'Выпечка, напитки, конфеты',
    difficulty: 'Средний',
    tags: ['корица', 'пряный', 'тёплый', 'ваниль'],
  },
  {
    id: 5,
    name: 'Охлаждающая мята',
    category: 'Мятные',
    description: 'Интенсивная мятная рецептура с выраженным охлаждающим эффектом для жевательной резинки.',
    components: [
      { name: 'Ментол кристаллический', dosage: '0.06%', role: 'Основа' },
      { name: 'Лимонная эссенция', dosage: '0.02%', role: 'Освежающий акцент' },
    ],
    application: 'Жевательная резинка, конфеты',
    difficulty: 'Базовый',
    tags: ['мята', 'охлаждающий', 'свежий'],
  },
  {
    id: 6,
    name: 'Масло-карамель',
    category: 'Молочные',
    description: 'Сложная рецептура для имитации топлёного масла с карамельными нотами. Применяется в попкорне и снеках.',
    components: [
      { name: 'Диацетил', dosage: '0.003%', role: 'Масляная основа' },
      { name: 'Ванилин', dosage: '0.02%', role: 'Карамельный фон' },
      { name: 'Гамма-ундекалактон', dosage: '0.01%', role: 'Кремовость' },
    ],
    application: 'Попкорн, снеки, маргарин',
    difficulty: 'Сложный',
    tags: ['масло', 'сливочный', 'карамельный'],
  },

  // Фруктовые
  {
    id: 7,
    name: 'Тропический коктейль',
    category: 'Фруктовые',
    description: 'Яркая тропическая смесь с манго, ананасом и нотами маракуйи. Идеальна для летних напитков.',
    components: [
      { name: 'Экстракт манго', dosage: '0.30%', role: 'Основа' },
      { name: 'Этилбутират', dosage: '0.015%', role: 'Ананасовый акцент' },
      { name: 'Аллилгексаноат', dosage: '0.006%', role: 'Свежесть' },
    ],
    application: 'Напитки, йогурты, мороженое',
    difficulty: 'Средний',
    tags: ['манго', 'ананас', 'тропический', 'свежий'],
  },
  {
    id: 8,
    name: 'Персик-абрикос',
    category: 'Фруктовые',
    description: 'Нежная косточковая рецептура с персиковой основой и абрикосовым акцентом. Мягкий фруктовый профиль.',
    components: [
      { name: 'Гамма-ундекалактон', dosage: '0.020%', role: 'Персиковая основа' },
      { name: 'Экстракт абрикоса', dosage: '0.25%', role: 'Абрикосовый акцент' },
      { name: 'Дельта-декалактон', dosage: '0.010%', role: 'Кремовый фон' },
    ],
    application: 'Йогурты, молочные десерты, джемы',
    difficulty: 'Средний',
    tags: ['персик', 'абрикос', 'фруктовый', 'кремовый'],
  },
  {
    id: 9,
    name: 'Банановый сплит',
    category: 'Фруктовые',
    description: 'Классический банановый аромат с ванильным фоном. Воспроизводит аромат спелого банана.',
    components: [
      { name: 'Изоамилацетат', dosage: '0.03%', role: 'Банановая основа' },
      { name: 'Ванилин', dosage: '0.02%', role: 'Сладкий фон' },
      { name: 'Этилбутират', dosage: '0.008%', role: 'Фруктовый акцент' },
    ],
    application: 'Мороженое, конфеты, молочные десерты',
    difficulty: 'Базовый',
    tags: ['банан', 'ваниль', 'сладкий', 'фруктовый'],
  },

  // Молочные
  {
    id: 10,
    name: 'Свежие сливки',
    category: 'Молочные',
    description: 'Лёгкая сливочная рецептура с мягким молочным характером. Без выраженных масляных нот.',
    components: [
      { name: 'Экстракт сливок', dosage: '0.50%', role: 'Молочная основа' },
      { name: 'Ацетоин', dosage: '0.010%', role: 'Сливочный акцент' },
      { name: 'Лактон молочный', dosage: '0.015%', role: 'Нежность' },
    ],
    application: 'Мороженое, йогурты, молочные напитки',
    difficulty: 'Базовый',
    tags: ['сливки', 'молочный', 'нежный', 'мягкий'],
  },
  {
    id: 11,
    name: 'Зрелый чеддер',
    category: 'Молочные',
    description: 'Сложная рецептура зрелого сыра с пикантными и острыми нотами. Для сырных снеков и соусов.',
    components: [
      { name: 'Масляная кислота', dosage: '0.005%', role: 'Сырная основа' },
      { name: 'Пропионовая кислота', dosage: '0.004%', role: 'Острота' },
      { name: 'Диацетил', dosage: '0.002%', role: 'Молочный фон' },
    ],
    application: 'Снеки, соусы, сырные продукты',
    difficulty: 'Сложный',
    tags: ['сыр', 'пикантный', 'острый', 'молочный'],
  },

  // Ореховые
  {
    id: 12,
    name: 'Пралине фундук',
    category: 'Ореховые',
    description: 'Классическое пралине с обжаренным фундуком и карамельным фоном. Идеальна для шоколадных изделий.',
    components: [
      { name: 'Экстракт фундука', dosage: '0.25%', role: 'Ореховая основа' },
      { name: 'Пиразин 2-ацетил', dosage: '0.002%', role: 'Жареный акцент' },
      { name: 'Ванилин', dosage: '0.03%', role: 'Карамельный фон' },
    ],
    application: 'Шоколад, конфеты, кремы',
    difficulty: 'Средний',
    tags: ['фундук', 'ореховый', 'жареный', 'карамельный'],
  },
  {
    id: 13,
    name: 'Марципан',
    category: 'Ореховые',
    description: 'Традиционный марципановый аромат на основе горького миндаля. Богатый сладко-ореховый профиль.',
    components: [
      { name: 'Экстракт миндаля', dosage: '0.12%', role: 'Миндальная основа' },
      { name: 'Бензальдегид', dosage: '0.03%', role: 'Горький акцент' },
      { name: 'Этилванилин', dosage: '0.008%', role: 'Сладкий фон' },
    ],
    application: 'Выпечка, конфеты, торты',
    difficulty: 'Базовый',
    tags: ['миндаль', 'марципан', 'ореховый', 'сладкий'],
  },
];

const difficultyColors: Record<string, string> = {
  'Базовый': 'bg-green-50 text-green-700 border border-green-200',
  'Средний': 'bg-amber-50 text-amber-700 border border-amber-200',
  'Сложный': 'bg-red-50 text-red-700 border border-red-200',
};

export default function RecipesSection() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [expanded, setExpanded] = useState<number | null>(null);

  const categories = ['Все', ...Array.from(new Set(recipes.map((r) => r.category)))];
  const filtered = activeCategory === 'Все' ? recipes : recipes.filter((r) => r.category === activeCategory);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in-up">
        <div className="section-label mb-2">База знаний</div>
        <h2 className="text-3xl font-semibold text-[hsl(var(--navy))]">Библиотека рецептур</h2>
        <p className="text-muted-foreground mt-1 text-sm">Готовые рецептуры и комбинации ароматизаторов</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up delay-100">
        {categories.map((c) => (
          <button key={c} onClick={() => setActiveCategory(c)} className={`filter-chip ${activeCategory === c ? 'active' : ''}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((recipe, i) => (
          <div
            key={recipe.id}
            className="bg-white border border-border rounded-sm overflow-hidden animate-fade-in-up card-hover"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Header */}
            <div
              className="p-5 cursor-pointer"
              onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="section-label text-[10px]">{recipe.category}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-sm font-medium ${difficultyColors[recipe.difficulty]}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[hsl(var(--navy))] text-base leading-tight">{recipe.name}</h3>
                </div>
                <Icon
                  name={expanded === recipe.id ? 'ChevronUp' : 'ChevronDown'}
                  size={18}
                  className="text-muted-foreground shrink-0 mt-0.5"
                />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{recipe.description}</p>

              <div className="flex flex-wrap gap-1 mt-3">
                {recipe.tags.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-sm">{t}</span>
                ))}
              </div>
            </div>

            {/* Expanded */}
            {expanded === recipe.id && (
              <div className="border-t border-border bg-[hsl(var(--surface))] p-5 animate-fade-in-up">
                <div className="mb-4">
                  <div className="section-label text-[10px] mb-3">Состав рецептуры</div>
                  <div className="space-y-2">
                    {recipe.components.map((comp, j) => (
                      <div key={j} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]" />
                          <span className="font-medium text-[hsl(var(--navy))] text-sm">{comp.name}</span>
                          <span className="text-xs text-muted-foreground">({comp.role})</span>
                        </div>
                        <span className="data-cell text-sm font-semibold text-[hsl(var(--navy))]">{comp.dosage}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Package" size={14} className="text-[hsl(var(--gold))]" />
                  <span>Применение: {recipe.application}</span>
                </div>
                <button className="mt-4 w-full py-2 border border-[hsl(var(--navy)/0.3)] text-[hsl(var(--navy))] text-sm font-medium rounded-sm hover:bg-[hsl(var(--navy))] hover:text-[hsl(var(--gold))] transition-colors">
                  Запросить техническую документацию
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}