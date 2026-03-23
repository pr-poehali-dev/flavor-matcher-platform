import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const stats = [
  { value: '500+', label: 'Ароматизаторов', icon: 'FlaskConical' },
  { value: '12', label: 'Групп аромата', icon: 'Layers' },
  { value: 'ISO 17025', label: 'Аккредитация', icon: 'Award' },
  { value: '14 лет', label: 'На рынке', icon: 'Clock' },
];

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="relative bg-[hsl(var(--navy))] overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid opacity-30" />

      {/* Decorative lines */}
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-[hsl(var(--gold)/0.3)] to-transparent" />
      <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[hsl(var(--gold)/0.3)] rounded-sm mb-6 animate-fade-in-up">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] animate-pulse" />
              <span className="section-label text-[hsl(var(--gold)/0.8)] text-[10px]">Профессиональная платформа</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5 animate-fade-in-up delay-100">
              Точный подбор<br />
              <span className="text-[hsl(var(--gold))]">пищевых ароматизаторов</span>
            </h1>

            <p className="text-white/60 text-lg mb-8 max-w-lg leading-relaxed animate-fade-in-up delay-200">
              База данных ароматизаторов с полными техническими характеристиками, инструментом подбора и сравнительным анализом для пищевых технологов.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300">
              <button
                onClick={() => onNavigate('selector')}
                className="px-6 py-3 bg-[hsl(var(--gold))] text-[hsl(var(--navy))] font-semibold rounded-sm hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center gap-2"
              >
                <Icon name="Zap" size={16} />
                Подобрать ароматизатор
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="px-6 py-3 border border-white/20 text-white rounded-sm hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <Icon name="LayoutGrid" size={16} />
                Открыть каталог
              </button>
            </div>
          </div>

          {/* Right: feature cards */}
          <div className="hidden lg:grid grid-cols-2 gap-3 animate-fade-in-up delay-200">
            {[
              { icon: 'Search', title: 'Умный подбор', desc: 'По органолептике, совместимости и бюджету' },
              { icon: 'GitCompare', title: 'Сравнение', desc: 'Сторона к стороне по всем параметрам' },
              { icon: 'BookOpen', title: 'Рецептуры', desc: 'Готовые комбинации для ваших продуктов' },
              { icon: 'ShieldCheck', title: 'Сертификаты', desc: 'ГОСТ, FEMA, Halal, Kosher и другие' },
            ].map((f, i) => (
              <div
                key={i}
                className={`bg-white/5 border border-white/10 rounded-sm p-4 hover:border-[hsl(var(--gold)/0.4)] transition-colors ${i === 1 ? 'mt-6' : ''} ${i === 3 ? 'mt-6' : ''}`}
              >
                <div className="w-8 h-8 bg-[hsl(var(--gold)/0.15)] rounded-sm flex items-center justify-center mb-3">
                  <Icon name={f.icon} size={16} className="text-[hsl(var(--gold))]" fallback="Star" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{f.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up delay-400">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[hsl(var(--gold)/0.12)] rounded-sm flex items-center justify-center shrink-0">
                <Icon name={s.icon} size={16} className="text-[hsl(var(--gold))]" fallback="Star" />
              </div>
              <div>
                <div className="data-cell text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
