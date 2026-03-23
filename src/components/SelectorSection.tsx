import { useState, useMemo } from 'react';
import { aromas, categoryLabel, solubilityLabel } from '@/data/aromas';
import type { Aroma } from '@/data/aromas';
import Icon from '@/components/ui/icon';

const catColors: Record<string, string> = {
  organic: 'tag-organic',
  synthetic: 'tag-synthetic',
  'nature-identical': 'tag-nature',
};

const odorOptions = ['ваниль', 'цитрус', 'ягодный', 'мята', 'фруктовый', 'пряный', 'молочный', 'цветочный', 'сладкий', 'свежий', 'тёплый', 'кислый', 'банан', 'манго', 'тропический', 'ореховый', 'жареный', 'миндаль', 'сливки', 'сыр', 'карамельный'];
const appOptions = ['кондитерские изделия', 'напитки', 'молочные продукты', 'выпечка', 'мороженое', 'конфеты', 'шоколад'];

export default function SelectorSection({ onSelectAroma }: { onSelectAroma: (a: Aroma) => void }) {
  const [selectedOdors, setSelectedOdors] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [intensityMin, setIntensityMin] = useState(1);
  const [stabilityMin, setStabilityMin] = useState(1);
  const [budgetMax, setBudgetMax] = useState(200000);
  const [onlyCertified, setOnlyCertified] = useState(false);
  const [results, setResults] = useState<Aroma[] | null>(null);
  const [searched, setSearched] = useState(false);

  const toggleOdor = (o: string) =>
    setSelectedOdors((prev) => prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]);

  const toggleApp = (a: string) =>
    setSelectedApps((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  const handleSearch = () => {
    const res = aromas
      .filter((a) => {
        const matchOdor = selectedOdors.length === 0 || selectedOdors.some((o) => a.odorProfile.includes(o));
        const matchApp = selectedApps.length === 0 || selectedApps.some((ap) => a.applications.includes(ap));
        const matchInt = a.intensity >= intensityMin;
        const matchSta = a.stability >= stabilityMin;
        const matchBudget = a.pricePerKg <= budgetMax;
        const matchCert = !onlyCertified || a.certifications.length >= 3;
        return matchOdor && matchApp && matchInt && matchSta && matchBudget && matchCert;
      })
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        selectedOdors.forEach((o) => { if (a.odorProfile.includes(o)) scoreA++; if (b.odorProfile.includes(o)) scoreB++; });
        return scoreB - scoreA;
      });
    setResults(res);
    setSearched(true);
  };

  const reset = () => {
    setSelectedOdors([]);
    setSelectedApps([]);
    setIntensityMin(1);
    setStabilityMin(1);
    setBudgetMax(200000);
    setOnlyCertified(false);
    setResults(null);
    setSearched(false);
  };

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in-up">
        <div className="section-label mb-2">Интеллектуальный поиск</div>
        <h2 className="text-3xl font-semibold text-[hsl(var(--navy))]">Подбор ароматизатора</h2>
        <p className="text-muted-foreground mt-1 text-sm">Укажите параметры — система подберёт оптимальные варианты</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-1 space-y-5">
          {/* Odor profile */}
          <div className="bg-white border border-border rounded-sm p-5 animate-fade-in-up delay-100">
            <h3 className="font-semibold text-[hsl(var(--navy))] mb-3 flex items-center gap-2">
              <Icon name="Wind" size={16} className="text-[hsl(var(--gold))]" />
              Органолептический профиль
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Выберите желаемые ноты аромата</p>
            <div className="flex flex-wrap gap-2">
              {odorOptions.map((o) => (
                <button
                  key={o}
                  onClick={() => toggleOdor(o)}
                  className={`filter-chip ${selectedOdors.includes(o) ? 'active' : ''}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="bg-white border border-border rounded-sm p-5 animate-fade-in-up delay-200">
            <h3 className="font-semibold text-[hsl(var(--navy))] mb-3 flex items-center gap-2">
              <Icon name="Package" size={16} className="text-[hsl(var(--gold))]" />
              Тип продукта
            </h3>
            <div className="flex flex-wrap gap-2">
              {appOptions.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleApp(a)}
                  className={`filter-chip ${selectedApps.includes(a) ? 'active' : ''}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Technical params */}
          <div className="bg-white border border-border rounded-sm p-5 animate-fade-in-up delay-300">
            <h3 className="font-semibold text-[hsl(var(--navy))] mb-4 flex items-center gap-2">
              <Icon name="SlidersHorizontal" size={16} className="text-[hsl(var(--gold))]" />
              Технические параметры
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-muted-foreground">Мин. интенсивность</label>
                  <span className="data-cell text-xs">{intensityMin}/10</span>
                </div>
                <input type="range" min={1} max={10} value={intensityMin} onChange={(e) => setIntensityMin(Number(e.target.value))} className="w-full accent-[hsl(var(--navy))]" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-muted-foreground">Мин. стабильность</label>
                  <span className="data-cell text-xs">{stabilityMin}/10</span>
                </div>
                <input type="range" min={1} max={10} value={stabilityMin} onChange={(e) => setStabilityMin(Number(e.target.value))} className="w-full accent-[hsl(var(--navy))]" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-muted-foreground">Бюджет до</label>
                  <span className="data-cell text-xs">{budgetMax.toLocaleString('ru')} ₽/кг</span>
                </div>
                <input type="range" min={500} max={200000} step={500} value={budgetMax} onChange={(e) => setBudgetMax(Number(e.target.value))} className="w-full accent-[hsl(var(--navy))]" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyCertified}
                  onChange={(e) => setOnlyCertified(e.target.checked)}
                  className="accent-[hsl(var(--navy))]"
                />
                <span className="text-sm text-foreground">Только с расширенной сертификацией</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 animate-fade-in-up delay-400">
            <button
              onClick={handleSearch}
              className="flex-1 px-5 py-3 bg-[hsl(var(--navy))] text-[hsl(var(--gold))] font-semibold rounded-sm hover:bg-[hsl(var(--navy-light))] transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Search" size={16} />
              Подобрать
            </button>
            {searched && (
              <button
                onClick={reset}
                className="px-4 py-3 border border-border text-muted-foreground rounded-sm hover:border-[hsl(var(--navy))] transition-colors"
              >
                <Icon name="RotateCcw" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right: Results */}
        <div className="lg:col-span-2">
          {!searched && (
            <div className="h-full flex items-center justify-center bg-white border border-dashed border-border rounded-sm p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="FlaskConical" size={28} className="text-muted-foreground" />
                </div>
                <h3 className="font-medium text-[hsl(var(--navy))] mb-2">Настройте параметры подбора</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Укажите органолептические свойства, тип продукта и технические требования — и нажмите «Подобрать»
                </p>
              </div>
            </div>
          )}

          {searched && results !== null && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Найдено: <span className="font-semibold text-foreground">{results.length}</span> ароматизаторов
                </span>
                {results.length > 0 && (
                  <span className="section-label">Рейтинг соответствия</span>
                )}
              </div>

              {results.length === 0 && (
                <div className="text-center py-16 bg-white border border-dashed border-border rounded-sm text-muted-foreground">
                  <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-30" />
                  <p>Ничего не найдено. Попробуйте смягчить требования.</p>
                </div>
              )}

              {results.map((aroma, i) => {
                const matchCount = selectedOdors.filter((o) => aroma.odorProfile.includes(o)).length;
                const matchPct = selectedOdors.length > 0 ? Math.round((matchCount / selectedOdors.length) * 100) : 100;
                return (
                  <div
                    key={aroma.id}
                    className="bg-white border border-border rounded-sm card-hover p-4 cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onClick={() => onSelectAroma(aroma)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[hsl(var(--navy)/0.06)] rounded-sm flex items-center justify-center shrink-0">
                        <span className="font-mono-ibm text-sm font-bold text-[hsl(var(--navy))]">#{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <h4 className="font-semibold text-[hsl(var(--navy))]">{aroma.name}</h4>
                            <span className={`inline-block px-2 py-0.5 text-xs rounded-sm font-medium mt-1 ${catColors[aroma.category]}`}>
                              {categoryLabel[aroma.category]}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="data-cell text-lg font-bold text-[hsl(var(--navy))]">
                              {matchPct}%
                            </div>
                            <div className="text-xs text-muted-foreground">совпадение</div>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-3">
                          <div className="bg-[hsl(var(--surface))] rounded-sm p-2 text-center">
                            <div className="data-cell text-xs font-semibold text-[hsl(var(--navy))]">{aroma.intensity}/10</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">Интенсивность</div>
                          </div>
                          <div className="bg-[hsl(var(--surface))] rounded-sm p-2 text-center">
                            <div className="data-cell text-xs font-semibold text-[hsl(var(--navy))]">{aroma.stability}/10</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">Стабильность</div>
                          </div>
                          <div className="bg-[hsl(var(--surface))] rounded-sm p-2 text-center">
                            <div className="data-cell text-xs font-semibold text-[hsl(var(--navy))]">{aroma.pricePerKg.toLocaleString('ru')} ₽</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">За кг</div>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {aroma.odorProfile.map((p) => (
                            <span
                              key={p}
                              className={`px-1.5 py-0.5 text-xs rounded-sm ${selectedOdors.includes(p) ? 'bg-[hsl(var(--navy))] text-[hsl(var(--gold))]' : 'bg-muted text-muted-foreground'}`}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}