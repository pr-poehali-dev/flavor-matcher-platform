import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'catalog', label: 'Каталог' },
  { id: 'selector', label: 'Подбор' },
  { id: 'compare', label: 'Сравнение' },
  { id: 'recipes', label: 'Рецептуры' },
  { id: 'docs', label: 'Документация' },
  { id: 'contact', label: 'Контакты' },
];

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[hsl(var(--navy))] border-b border-[hsl(var(--gold)/0.2)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('catalog')}
          >
            <div className="w-8 h-8 bg-[hsl(var(--gold))] rounded-sm flex items-center justify-center">
              <Icon name="FlaskConical" size={16} className="text-[hsl(var(--navy))]" />
            </div>
            <div>
              <span className="text-white font-semibold text-lg tracking-tight font-ibm">
                Aroma<span className="text-[hsl(var(--gold))]">Select</span>
              </span>
              <div className="section-label text-[9px] text-[hsl(var(--gold)/0.6)]">
                Платформа подбора ароматизаторов
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-underline text-sm font-medium transition-colors pb-0.5 ${
                  activeSection === item.id
                    ? 'text-[hsl(var(--gold))] active'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 text-sm font-medium border border-[hsl(var(--gold)/0.4)] text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold)/0.1)] transition-colors rounded-sm"
            >
              Запросить КП
            </button>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-[hsl(220_50%_14%)] border-t border-[hsl(var(--gold)/0.15)] px-6 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
              className={`block w-full text-left py-2.5 text-sm font-medium border-b border-white/5 last:border-0 ${
                activeSection === item.id ? 'text-[hsl(var(--gold))]' : 'text-white/70'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
