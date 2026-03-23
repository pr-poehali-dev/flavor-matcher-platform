import { aromas, categoryLabel, solubilityLabel } from '@/data/aromas';
import Icon from '@/components/ui/icon';

const catColors: Record<string, string> = {
  organic: 'tag-organic',
  synthetic: 'tag-synthetic',
  'nature-identical': 'tag-nature',
};

interface CompareSectionProps {
  compareList: number[];
  onRemove: (id: number) => void;
  onNavigateCatalog: () => void;
}

export default function CompareSection({ compareList, onRemove, onNavigateCatalog }: CompareSectionProps) {
  const selected = compareList.map((id) => aromas.find((a) => a.id === id)!).filter(Boolean);

  const maxIntensity = Math.max(...selected.map((a) => a.intensity), 1);
  const maxStability = Math.max(...selected.map((a) => a.stability), 1);
  const maxPrice = Math.max(...selected.map((a) => a.pricePerKg), 1);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8 animate-fade-in-up">
        <div>
          <div className="section-label mb-2">Аналитика</div>
          <h2 className="text-3xl font-semibold text-[hsl(var(--navy))]">Сравнение ароматизаторов</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {selected.length > 0 ? `${selected.length} позиций для сравнения` : 'Добавьте ароматизаторы из каталога'}
          </p>
        </div>
        {selected.length > 0 && (
          <button
            onClick={onNavigateCatalog}
            className="text-sm text-[hsl(var(--navy))] font-medium flex items-center gap-1 hover:text-[hsl(var(--gold))] transition-colors"
          >
            <Icon name="Plus" size={14} />
            Добавить из каталога
          </button>
        )}
      </div>

      {selected.length === 0 && (
        <div className="text-center py-20 bg-white border border-dashed border-border rounded-sm animate-fade-in-up">
          <Icon name="GitCompare" size={40} className="mx-auto mb-4 text-muted-foreground opacity-30" />
          <h3 className="font-medium text-[hsl(var(--navy))] mb-2">Список сравнения пуст</h3>
          <p className="text-sm text-muted-foreground mb-5">Добавьте 2–4 ароматизатора из каталога, нажав на иконку сравнения</p>
          <button
            onClick={onNavigateCatalog}
            className="px-5 py-2.5 bg-[hsl(var(--navy))] text-[hsl(var(--gold))] font-medium rounded-sm hover:bg-[hsl(var(--navy-light))] transition-colors"
          >
            Перейти в каталог
          </button>
        </div>
      )}

      {selected.length > 0 && (
        <div className="animate-fade-in-up delay-100">
          {/* Selected chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selected.map((a) => (
              <div key={a.id} className="flex items-center gap-2 px-3 py-1.5 bg-[hsl(var(--navy))] text-white rounded-sm text-sm">
                <span>{a.name}</span>
                <button onClick={() => onRemove(a.id)} className="text-white/50 hover:text-[hsl(var(--gold))] transition-colors">
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="bg-white border border-border rounded-sm overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-4 text-xs text-muted-foreground font-medium uppercase tracking-wide w-44">Параметр</th>
                  {selected.map((a) => (
                    <th key={a.id} className="px-5 py-4 text-center">
                      <div className="font-semibold text-[hsl(var(--navy))]">{a.name}</div>
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-sm font-medium mt-1 ${catColors[a.category]}`}>
                        {categoryLabel[a.category]}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Group */}
                <tr className="border-b border-border bg-[hsl(var(--surface))]">
                  <td className="px-5 py-3 text-xs text-muted-foreground">Группа</td>
                  {selected.map((a) => <td key={a.id} className="px-5 py-3 text-center text-sm">{a.group}</td>)}
                </tr>

                {/* Intensity */}
                <tr className="border-b border-border">
                  <td className="px-5 py-3 text-xs text-muted-foreground">Интенсивность</td>
                  {selected.map((a) => (
                    <td key={a.id} className="px-5 py-3 text-center">
                      <div className="data-cell text-base font-bold text-[hsl(var(--navy))] mb-1">{a.intensity}/10</div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[hsl(var(--navy))] rounded-full transition-all"
                          style={{ width: `${(a.intensity / maxIntensity) * 100}%` }}
                        />
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Stability */}
                <tr className="border-b border-border bg-[hsl(var(--surface))]">
                  <td className="px-5 py-3 text-xs text-muted-foreground">Стабильность</td>
                  {selected.map((a) => (
                    <td key={a.id} className="px-5 py-3 text-center">
                      <div className="data-cell text-base font-bold text-[hsl(45_70%_45%)] mb-1">{a.stability}/10</div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[hsl(45_70%_55%)] rounded-full transition-all"
                          style={{ width: `${(a.stability / maxStability) * 100}%` }}
                        />
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Solubility */}
                <tr className="border-b border-border">
                  <td className="px-5 py-3 text-xs text-muted-foreground">Растворимость</td>
                  {selected.map((a) => <td key={a.id} className="px-5 py-3 text-center text-sm">{solubilityLabel[a.solubility]}</td>)}
                </tr>

                {/* Dosage */}
                <tr className="border-b border-border bg-[hsl(var(--surface))]">
                  <td className="px-5 py-3 text-xs text-muted-foreground">Дозировка</td>
                  {selected.map((a) => <td key={a.id} className="px-5 py-3 text-center data-cell">{a.dosage}</td>)}
                </tr>

                {/* Shelf life */}
                <tr className="border-b border-border">
                  <td className="px-5 py-3 text-xs text-muted-foreground">Срок хранения</td>
                  {selected.map((a) => <td key={a.id} className="px-5 py-3 text-center data-cell">{a.shelfLife}</td>)}
                </tr>

                {/* Certifications */}
                <tr className="border-b border-border bg-[hsl(var(--surface))]">
                  <td className="px-5 py-3 text-xs text-muted-foreground">Сертификации</td>
                  {selected.map((a) => (
                    <td key={a.id} className="px-5 py-3 text-center">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {a.certifications.map((c) => (
                          <span key={c} className="px-1.5 py-0.5 bg-[hsl(var(--navy)/0.08)] text-[hsl(var(--navy))] text-xs rounded-sm font-medium">{c}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* CAS */}
                <tr className="border-b border-border">
                  <td className="px-5 py-3 text-xs text-muted-foreground">CAS №</td>
                  {selected.map((a) => <td key={a.id} className="px-5 py-3 text-center data-cell text-xs">{a.cas}</td>)}
                </tr>

                {/* Price */}
                <tr>
                  <td className="px-5 py-3 text-xs text-muted-foreground font-medium">Цена/кг</td>
                  {selected.map((a) => (
                    <td key={a.id} className="px-5 py-3 text-center">
                      <div className="data-cell text-lg font-bold text-[hsl(var(--navy))]">{a.pricePerKg.toLocaleString('ru')} ₽</div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-[hsl(var(--gold))] rounded-full"
                          style={{ width: `${(a.pricePerKg / maxPrice) * 100}%` }}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Aroma profiles */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {selected.map((a) => (
              <div key={a.id} className="bg-white border border-border rounded-sm p-4">
                <h4 className="font-semibold text-[hsl(var(--navy))] text-sm mb-3 gold-line pl-3">{a.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{a.description}</p>
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5">Применение</div>
                  <div className="flex flex-wrap gap-1">
                    {a.applications.map((ap) => (
                      <span key={ap} className="px-1.5 py-0.5 bg-muted text-muted-foreground text-xs rounded-sm">{ap}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
