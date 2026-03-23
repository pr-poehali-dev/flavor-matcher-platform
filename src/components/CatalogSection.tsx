import { useState, useMemo } from 'react';
import { aromas, categoryLabel, solubilityLabel, groups, applications } from '@/data/aromas';
import type { Aroma } from '@/data/aromas';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface CatalogSectionProps {
  compareList: number[];
  onToggleCompare: (id: number) => void;
  onSelectAroma: (aroma: Aroma) => void;
}

const catColors: Record<string, string> = {
  organic: 'tag-organic',
  synthetic: 'tag-synthetic',
  'nature-identical': 'tag-nature',
};

export default function CatalogSection({ compareList, onToggleCompare, onSelectAroma }: CatalogSectionProps) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('Все');
  const [filterGroup, setFilterGroup] = useState('Все');
  const [filterApp, setFilterApp] = useState('Все');
  const [filterSol, setFilterSol] = useState('Все');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'intensity'>('name');
  const [priceMax, setPriceMax] = useState(200000);
  const [view, setView] = useState<'grid' | 'table'>('grid');

  const catOptions = ['Все', 'organic', 'synthetic', 'nature-identical'];
  const solOptions = ['Все', 'water', 'oil', 'both'];

  const filtered = useMemo(() => {
    return aromas
      .filter((a) => {
        const matchSearch =
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.odorProfile.some((o) => o.toLowerCase().includes(search.toLowerCase()));
        const matchCat = filterCat === 'Все' || a.category === filterCat;
        const matchGroup = filterGroup === 'Все' || a.group === filterGroup;
        const matchApp = filterApp === 'Все' || a.applications.includes(filterApp);
        const matchSol = filterSol === 'Все' || a.solubility === filterSol;
        const matchPrice = a.pricePerKg <= priceMax;
        return matchSearch && matchCat && matchGroup && matchApp && matchSol && matchPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price') return a.pricePerKg - b.pricePerKg;
        if (sortBy === 'intensity') return b.intensity - a.intensity;
        return a.name.localeCompare(b.name, 'ru');
      });
  }, [search, filterCat, filterGroup, filterApp, filterSol, priceMax, sortBy]);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8 animate-fade-in-up">
        <div>
          <div className="section-label mb-2">База данных</div>
          <h2 className="text-3xl font-semibold text-[hsl(var(--navy))]">Каталог ароматизаторов</h2>
          <p className="text-muted-foreground mt-1 text-sm">{filtered.length} позиций из {aromas.length}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-sm border transition-colors ${view === 'grid' ? 'bg-[hsl(var(--navy))] text-[hsl(var(--gold))] border-[hsl(var(--navy))]' : 'border-border text-muted-foreground hover:border-[hsl(var(--navy))]'}`}
          >
            <Icon name="LayoutGrid" size={16} />
          </button>
          <button
            onClick={() => setView('table')}
            className={`p-2 rounded-sm border transition-colors ${view === 'table' ? 'bg-[hsl(var(--navy))] text-[hsl(var(--gold))] border-[hsl(var(--navy))]' : 'border-border text-muted-foreground hover:border-[hsl(var(--navy))]'}`}
          >
            <Icon name="TableProperties" size={16} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-sm p-5 mb-6 animate-fade-in-up delay-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию или профилю аромата..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--navy))] bg-[hsl(var(--surface))]"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3 py-2 text-sm border border-border rounded-sm bg-[hsl(var(--surface))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--navy))] appearance-none cursor-pointer"
            >
              <option value="name">Сортировка: по названию</option>
              <option value="price">Сортировка: по цене</option>
              <option value="intensity">Сортировка: по интенсивности</option>
            </select>
            <Icon name="ChevronDown" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* Price */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Цена до: <span className="font-mono-ibm font-medium text-foreground">{priceMax.toLocaleString('ru')} ₽/кг</span>
            </label>
            <input
              type="range"
              min={500}
              max={200000}
              step={500}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[hsl(var(--navy))]"
            />
          </div>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="section-label text-[10px] self-center mr-1">Категория:</span>
          {catOptions.map((c) => (
            <button key={c} onClick={() => setFilterCat(c)} className={`filter-chip ${filterCat === c ? 'active' : ''}`}>
              {c === 'Все' ? 'Все' : categoryLabel[c]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="section-label text-[10px] self-center mr-1">Группа:</span>
          {groups.map((g) => (
            <button key={g} onClick={() => setFilterGroup(g)} className={`filter-chip ${filterGroup === g ? 'active' : ''}`}>
              {g}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="section-label text-[10px] self-center mr-1">Растворимость:</span>
          {solOptions.map((s) => (
            <button key={s} onClick={() => setFilterSol(s)} className={`filter-chip ${filterSol === s ? 'active' : ''}`}>
              {s === 'Все' ? 'Все' : solubilityLabel[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((aroma, i) => (
            <div
              key={aroma.id}
              className="bg-white border border-border rounded-sm card-hover animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {/* Card header */}
              <div className="p-4 border-b border-border gold-line">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-[hsl(var(--navy))] text-base leading-tight">{aroma.name}</h3>
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleCompare(aroma.id); }}
                    className={`shrink-0 p-1.5 rounded-sm border transition-colors ${
                      compareList.includes(aroma.id)
                        ? 'bg-[hsl(var(--navy))] border-[hsl(var(--navy))] text-[hsl(var(--gold))]'
                        : 'border-border text-muted-foreground hover:border-[hsl(var(--navy))]'
                    }`}
                    title="Добавить к сравнению"
                  >
                    <Icon name="GitCompare" size={12} />
                  </button>
                </div>
                <span className={`inline-block px-2 py-0.5 text-xs rounded-sm font-medium ${catColors[aroma.category]}`}>
                  {categoryLabel[aroma.category]}
                </span>
              </div>

              {/* Card body */}
              <div className="p-4" onClick={() => onSelectAroma(aroma)}>
                <div className="flex flex-wrap gap-1 mb-3">
                  {aroma.odorProfile.slice(0, 3).map((p) => (
                    <span key={p} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-sm">{p}</span>
                  ))}
                </div>

                {/* Stats */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Интенсивность</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 10 }).map((_, j) => (
                          <div
                            key={j}
                            className={`w-2 h-1.5 rounded-sm ${j < aroma.intensity ? 'bg-[hsl(var(--navy))]' : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                      <span className="data-cell text-xs text-muted-foreground">{aroma.intensity}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Стабильность</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 10 }).map((_, j) => (
                          <div
                            key={j}
                            className={`w-2 h-1.5 rounded-sm ${j < aroma.stability ? 'bg-[hsl(45_70%_55%)]' : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                      <span className="data-cell text-xs text-muted-foreground">{aroma.stability}/10</span>
                    </div>
                  </div>
                </div>

                {/* Data row */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Дозировка</div>
                    <div className="data-cell text-xs text-foreground">{aroma.dosage}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Цена/кг</div>
                    <div className="data-cell text-xs font-medium text-[hsl(var(--navy))]">{aroma.pricePerKg.toLocaleString('ru')} ₽</div>
                  </div>
                </div>

                <button className="mt-3 w-full text-xs text-[hsl(var(--navy))] font-medium hover:text-[hsl(var(--gold))] transition-colors flex items-center justify-center gap-1">
                  Подробнее <Icon name="ChevronRight" size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="bg-white border border-border rounded-sm overflow-x-auto animate-fade-in-up">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[hsl(var(--navy))] text-white">
                <th className="text-left px-4 py-3 font-medium text-xs tracking-wide">Название</th>
                <th className="text-left px-4 py-3 font-medium text-xs tracking-wide">Категория</th>
                <th className="text-left px-4 py-3 font-medium text-xs tracking-wide">Группа</th>
                <th className="text-left px-4 py-3 font-medium text-xs tracking-wide">Интенс.</th>
                <th className="text-left px-4 py-3 font-medium text-xs tracking-wide">Стабил.</th>
                <th className="text-left px-4 py-3 font-medium text-xs tracking-wide">Раств.</th>
                <th className="text-left px-4 py-3 font-medium text-xs tracking-wide">Дозировка</th>
                <th className="text-left px-4 py-3 font-medium text-xs tracking-wide text-[hsl(var(--gold))]">Цена/кг</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((aroma, i) => (
                <tr
                  key={aroma.id}
                  className={`border-b border-border hover:bg-[hsl(var(--surface))] transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-[hsl(220_20%_98.5%)]'}`}
                  onClick={() => onSelectAroma(aroma)}
                >
                  <td className="px-4 py-3 font-medium text-[hsl(var(--navy))]">{aroma.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs rounded-sm font-medium ${catColors[aroma.category]}`}>
                      {categoryLabel[aroma.category]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{aroma.group}</td>
                  <td className="px-4 py-3 data-cell">{aroma.intensity}/10</td>
                  <td className="px-4 py-3 data-cell">{aroma.stability}/10</td>
                  <td className="px-4 py-3 text-muted-foreground">{solubilityLabel[aroma.solubility]}</td>
                  <td className="px-4 py-3 data-cell">{aroma.dosage}</td>
                  <td className="px-4 py-3 data-cell font-semibold text-[hsl(var(--navy))]">{aroma.pricePerKg.toLocaleString('ru')} ₽</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleCompare(aroma.id); }}
                      className={`p-1.5 rounded-sm border transition-colors ${
                        compareList.includes(aroma.id)
                          ? 'bg-[hsl(var(--navy))] border-[hsl(var(--navy))] text-[hsl(var(--gold))]'
                          : 'border-border text-muted-foreground hover:border-[hsl(var(--navy))]'
                      }`}
                    >
                      <Icon name="GitCompare" size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-30" />
              <p>Ароматизаторы не найдены. Измените параметры фильтрации.</p>
            </div>
          )}
        </div>
      )}

      {filtered.length === 0 && view === 'grid' && (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-30" />
          <p>Ароматизаторы не найдены. Измените параметры фильтрации.</p>
        </div>
      )}
    </section>
  );
}
