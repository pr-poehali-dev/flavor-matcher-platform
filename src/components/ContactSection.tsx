import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '', type: 'Запрос КП' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const contacts = [
    { icon: 'Phone', label: 'Телефон', value: '+7 (495) 123-45-67' },
    { icon: 'Mail', label: 'Email', value: 'info@aromaselect.ru' },
    { icon: 'MapPin', label: 'Адрес', value: 'Москва, ул. Промышленная, 12' },
    { icon: 'Clock', label: 'Режим работы', value: 'Пн–Пт, 9:00–18:00' },
  ];

  const advantages = [
    { icon: 'Award', title: 'Гарантия качества', desc: 'Все партии проходят лабораторный контроль по ГОСТ и международным стандартам' },
    { icon: 'Truck', title: 'Доставка по России', desc: 'Собственная логистика с сохранением условий хранения' },
    { icon: 'HeadphonesIcon', title: 'Техническая поддержка', desc: 'Эксперты-технологи помогут подобрать оптимальное решение' },
    { icon: 'BarChart3', title: 'Гибкое ценообразование', desc: 'Система скидок при объёмных закупках' },
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in-up">
        <div className="section-label mb-2">Сотрудничество</div>
        <h2 className="text-3xl font-semibold text-[hsl(var(--navy))]">Контакты и обратная связь</h2>
        <p className="text-muted-foreground mt-1 text-sm">Готовы помочь с подбором ароматизаторов под ваши задачи</p>
      </div>

      {/* Advantages */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-up delay-100">
        {advantages.map((adv, i) => (
          <div key={i} className="bg-white border border-border rounded-sm p-4">
            <div className="w-8 h-8 bg-[hsl(var(--gold)/0.15)] rounded-sm flex items-center justify-center mb-3">
              <Icon name={adv.icon} size={16} className="text-[hsl(var(--gold))]" fallback="Star" />
            </div>
            <h4 className="font-semibold text-[hsl(var(--navy))] text-sm mb-1">{adv.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{adv.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 animate-fade-in-up delay-200">
          <div className="bg-white border border-border rounded-sm p-6">
            <h3 className="font-semibold text-[hsl(var(--navy))] mb-5 flex items-center gap-2">
              <Icon name="Send" size={16} className="text-[hsl(var(--gold))]" />
              Отправить запрос
            </h3>

            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={28} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-[hsl(var(--navy))] mb-2">Запрос отправлен!</h4>
                <p className="text-sm text-muted-foreground">Наш специалист свяжется с вами в течение 2 рабочих часов.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-5 px-5 py-2 text-sm border border-border rounded-sm hover:border-[hsl(var(--navy))] transition-colors text-foreground"
                >
                  Отправить ещё запрос
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Имя *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Петров"
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--navy))] bg-[hsl(var(--surface))]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Компания *</label>
                    <input
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="ООО «МолПрод»"
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--navy))] bg-[hsl(var(--surface))]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ivan@company.ru"
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--navy))] bg-[hsl(var(--surface))]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Телефон</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--navy))] bg-[hsl(var(--surface))]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Тип запроса</label>
                  <div className="flex flex-wrap gap-2">
                    {['Запрос КП', 'Образцы', 'Техническая консультация', 'Партнёрство'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t })}
                        className={`filter-chip ${form.type === t ? 'active' : ''}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Сообщение</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Опишите ваши задачи и требования к ароматизаторам..."
                    rows={4}
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--navy))] bg-[hsl(var(--surface))] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[hsl(var(--navy))] text-[hsl(var(--gold))] font-semibold rounded-sm hover:bg-[hsl(var(--navy-light))] transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={16} />
                  Отправить запрос
                </button>
                <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с политикой обработки данных</p>
              </form>
            )}
          </div>
        </div>

        {/* Contacts sidebar */}
        <div className="space-y-4 animate-fade-in-up delay-300">
          <div className="bg-white border border-border rounded-sm p-5">
            <h3 className="font-semibold text-[hsl(var(--navy))] mb-4 flex items-center gap-2">
              <Icon name="Building2" size={16} className="text-[hsl(var(--gold))]" />
              Реквизиты
            </h3>
            <div className="space-y-3">
              {contacts.map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[hsl(var(--navy)/0.06)] rounded-sm flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={14} className="text-[hsl(var(--navy))]" fallback="Info" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{c.label}</div>
                    <div className="font-medium text-sm text-[hsl(var(--navy))]">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[hsl(var(--navy))] rounded-sm p-5">
            <div className="section-label text-[hsl(var(--gold)/0.7)] mb-3">Скорость ответа</div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Коммерческий запрос</span>
                  <span className="text-[hsl(var(--gold))] font-medium">2 часа</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full"><div className="h-full w-4/5 bg-[hsl(var(--gold))] rounded-full" /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Техническая консультация</span>
                  <span className="text-[hsl(var(--gold))] font-medium">1 день</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full"><div className="h-full w-3/5 bg-[hsl(var(--gold))] rounded-full" /></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/70">Образцы продукции</span>
                  <span className="text-[hsl(var(--gold))] font-medium">3 дня</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full"><div className="h-full w-2/5 bg-[hsl(var(--gold))] rounded-full" /></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-sm p-5">
            <h3 className="font-semibold text-[hsl(var(--navy))] mb-3 text-sm">О компании</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Поставщик пищевых ароматизаторов с 2010 года. Работаем с производителями кондитерских изделий, напитков и молочной продукции. Собственная лаборатория аккредитована по ISO/IEC 17025.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[['14+', 'лет опыта'], ['300+', 'клиентов'], ['500+', 'позиций']].map(([v, l], i) => (
                <div key={i} className="text-center">
                  <div className="data-cell text-xl font-bold text-[hsl(var(--navy))]">{v}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
