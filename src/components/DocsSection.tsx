import Icon from '@/components/ui/icon';

const docs = [
  {
    title: 'Технические условия на ванилин',
    type: 'ТУ',
    format: 'PDF',
    size: '1.2 МБ',
    updated: 'Янв 2025',
    icon: 'FileText',
  },
  {
    title: 'Сертификат GOST для ментола',
    type: 'Сертификат',
    format: 'PDF',
    size: '0.8 МБ',
    updated: 'Фев 2025',
    icon: 'Award',
  },
  {
    title: 'Halal-сертификат на линейку ароматизаторов',
    type: 'Сертификат',
    format: 'PDF',
    size: '1.5 МБ',
    updated: 'Мар 2025',
    icon: 'ShieldCheck',
  },
  {
    title: 'Методы анализа органолептических свойств',
    type: 'Руководство',
    format: 'PDF',
    size: '3.4 МБ',
    updated: 'Дек 2024',
    icon: 'BookOpen',
  },
  {
    title: 'Таблица дозировок для молочных продуктов',
    type: 'Таблица',
    format: 'XLSX',
    size: '0.4 МБ',
    updated: 'Мар 2025',
    icon: 'Table',
  },
  {
    title: 'Спецификация на экстракт клубники',
    type: 'Спецификация',
    format: 'PDF',
    size: '0.9 МБ',
    updated: 'Янв 2025',
    icon: 'ClipboardList',
  },
  {
    title: 'Требования к хранению и транспортировке',
    type: 'Руководство',
    format: 'PDF',
    size: '2.1 МБ',
    updated: 'Ноя 2024',
    icon: 'Truck',
  },
  {
    title: 'Протоколы испытаний — партия Q1/2025',
    type: 'Протокол',
    format: 'PDF',
    size: '4.7 МБ',
    updated: 'Мар 2025',
    icon: 'FlaskConical',
  },
];

const typeColors: Record<string, string> = {
  'ТУ': 'bg-blue-50 text-blue-700 border border-blue-200',
  'Сертификат': 'bg-green-50 text-green-700 border border-green-200',
  'Руководство': 'bg-amber-50 text-amber-700 border border-amber-200',
  'Таблица': 'bg-purple-50 text-purple-700 border border-purple-200',
  'Спецификация': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
  'Протокол': 'bg-red-50 text-red-700 border border-red-200',
};

const specs = [
  { label: 'ГОСТ Р 52177-2003', desc: 'Ароматизаторы пищевые. Общие технические условия' },
  { label: 'FEMA GRAS', desc: 'Generally Recognized as Safe — реестр безопасных веществ' },
  { label: 'CoE Resolution', desc: 'Council of Europe — европейский реестр ароматизаторов' },
  { label: 'Regulation (EC) 1334/2008', desc: 'Европейский регламент по пищевым ароматизаторам' },
  { label: 'Halal HAS 23000', desc: 'Стандарт халяль для пищевой промышленности' },
  { label: 'Kosher OU', desc: 'Кошерная сертификация Orthodox Union' },
];

export default function DocsSection() {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in-up">
        <div className="section-label mb-2">Технические материалы</div>
        <h2 className="text-3xl font-semibold text-[hsl(var(--navy))]">Документация и сертификаты</h2>
        <p className="text-muted-foreground mt-1 text-sm">Актуальные спецификации, сертификаты и технические данные</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Docs list */}
        <div className="xl:col-span-2 animate-fade-in-up delay-100">
          <div className="bg-white border border-border rounded-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-[hsl(var(--surface))] flex items-center justify-between">
              <span className="text-sm font-medium text-[hsl(var(--navy))]">Документы</span>
              <span className="data-cell text-xs text-muted-foreground">{docs.length} файлов</span>
            </div>
            <div className="divide-y divide-border">
              {docs.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[hsl(var(--surface))] transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 bg-[hsl(var(--navy)/0.06)] rounded-sm flex items-center justify-center shrink-0">
                    <Icon name={doc.icon} size={16} className="text-[hsl(var(--navy))]" fallback="FileText" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground truncate group-hover:text-[hsl(var(--navy))] transition-colors">
                      {doc.title}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-1.5 py-0.5 text-xs rounded-sm font-medium ${typeColors[doc.type] || 'bg-muted text-muted-foreground'}`}>
                        {doc.type}
                      </span>
                      <span className="data-cell text-xs text-muted-foreground">{doc.format} · {doc.size}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground">{doc.updated}</div>
                    <button className="mt-1 text-xs text-[hsl(var(--navy))] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <Icon name="Download" size={11} />
                      Запросить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Standards */}
        <div className="space-y-4 animate-fade-in-up delay-200">
          <div className="bg-white border border-border rounded-sm p-5">
            <h3 className="font-semibold text-[hsl(var(--navy))] mb-4 flex items-center gap-2">
              <Icon name="ShieldCheck" size={16} className="text-[hsl(var(--gold))]" />
              Стандарты и нормативы
            </h3>
            <div className="space-y-3">
              {specs.map((s, i) => (
                <div key={i} className="flex gap-3">
                  <div className="shrink-0 w-2 h-2 rounded-full bg-[hsl(var(--gold))] mt-1.5" />
                  <div>
                    <div className="font-medium text-sm text-[hsl(var(--navy))]">{s.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[hsl(var(--navy))] rounded-sm p-5">
            <Icon name="FlaskConical" size={24} className="text-[hsl(var(--gold))] mb-3" />
            <h3 className="font-semibold text-white mb-2">Нужна специфическая документация?</h3>
            <p className="text-white/60 text-sm mb-4">
              Запросите спецификации, сертификаты анализа и протоколы испытаний для любого ароматизатора из каталога.
            </p>
            <button className="w-full py-2.5 bg-[hsl(var(--gold))] text-[hsl(var(--navy))] font-semibold rounded-sm text-sm hover:bg-[hsl(var(--gold-light))] transition-colors">
              Отправить запрос
            </button>
          </div>

          <div className="bg-white border border-border rounded-sm p-5">
            <h3 className="font-semibold text-[hsl(var(--navy))] mb-3 flex items-center gap-2">
              <Icon name="BarChart3" size={16} className="text-[hsl(var(--gold))]" />
              Лаборатория
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Аккредитация</span>
                <span className="font-medium text-[hsl(var(--navy))]">ISO/IEC 17025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ГХ-МС анализ</span>
                <span className="font-medium text-green-700">Доступен</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Органолептика</span>
                <span className="font-medium text-green-700">Доступна</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Срок анализа</span>
                <span className="font-medium text-[hsl(var(--navy))]">3–7 дней</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}