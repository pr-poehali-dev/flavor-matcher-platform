import type { Aroma } from '@/data/aromas';
import { categoryLabel, solubilityLabel } from '@/data/aromas';
import Icon from '@/components/ui/icon';

const catColors: Record<string, string> = {
  organic: 'tag-organic',
  synthetic: 'tag-synthetic',
  'nature-identical': 'tag-nature',
};

interface AromaModalProps {
  aroma: Aroma;
  onClose: () => void;
  onToggleCompare: (id: number) => void;
  inCompare: boolean;
}

export default function AromaModal({ aroma, onClose, onToggleCompare, inCompare }: AromaModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[hsl(var(--navy)/0.6)] backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-sm border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[hsl(var(--navy))] p-5 flex items-start justify-between">
          <div>
            <div className="section-label text-[hsl(var(--gold)/0.7)] mb-1">{aroma.group}</div>
            <h2 className="text-xl font-bold text-white">{aroma.name}</h2>
            <span className={`inline-block px-2 py-0.5 text-xs rounded-sm font-medium mt-2 ${catColors[aroma.category]}`}>
              {categoryLabel[aroma.category]}
            </span>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors mt-1">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-[hsl(var(--gold))] pl-3">
            {aroma.description}
          </p>

          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Интенсивность', value: `${aroma.intensity}/10` },
              { label: 'Стабильность', value: `${aroma.stability}/10` },
              { label: 'Дозировка', value: aroma.dosage },
              { label: 'Цена/кг', value: `${aroma.pricePerKg.toLocaleString('ru')} ₽` },
            ].map((m) => (
              <div key={m.label} className="bg-[hsl(var(--surface))] rounded-sm p-3 text-center">
                <div className="data-cell text-base font-bold text-[hsl(var(--navy))]">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Technical data */}
          <div className="bg-[hsl(var(--surface))] rounded-sm p-4">
            <div className="section-label text-[10px] mb-3">Технические данные</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {[
                ['CAS №', aroma.cas],
                ['Растворимость', solubilityLabel[aroma.solubility]],
                ['Цвет/форма', aroma.color],
                ['Срок хранения', aroma.shelfLife],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-1.5 border-b border-border last:border-0 col-span-1">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="data-cell text-xs text-foreground font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Odor profile */}
          <div>
            <div className="section-label text-[10px] mb-2">Органолептический профиль</div>
            <div className="flex flex-wrap gap-2">
              {aroma.odorProfile.map((p) => (
                <span key={p} className="px-2.5 py-1 bg-[hsl(var(--navy)/0.06)] text-[hsl(var(--navy))] text-xs rounded-sm font-medium">{p}</span>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <div className="section-label text-[10px] mb-2">Области применения</div>
            <div className="flex flex-wrap gap-2">
              {aroma.applications.map((a) => (
                <span key={a} className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-sm">{a}</span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="section-label text-[10px] mb-2">Сертификации</div>
            <div className="flex flex-wrap gap-2">
              {aroma.certifications.map((c) => (
                <span key={c} className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 text-xs rounded-sm font-medium flex items-center gap-1">
                  <Icon name="ShieldCheck" size={10} />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onToggleCompare(aroma.id)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-sm border transition-colors flex items-center justify-center gap-2 ${
                inCompare
                  ? 'bg-[hsl(var(--navy))] border-[hsl(var(--navy))] text-[hsl(var(--gold))]'
                  : 'border-border text-foreground hover:border-[hsl(var(--navy))]'
              }`}
            >
              <Icon name="GitCompare" size={14} />
              {inCompare ? 'В сравнении' : 'Сравнить'}
            </button>
            <button className="flex-1 py-2.5 bg-[hsl(var(--navy))] text-[hsl(var(--gold))] font-semibold rounded-sm text-sm hover:bg-[hsl(var(--navy-light))] transition-colors flex items-center justify-center gap-2">
              <Icon name="Send" size={14} />
              Запросить КП
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
