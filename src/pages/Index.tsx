import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import SelectorSection from '@/components/SelectorSection';
import CompareSection from '@/components/CompareSection';
import RecipesSection from '@/components/RecipesSection';
import DocsSection from '@/components/DocsSection';
import ContactSection from '@/components/ContactSection';
import AromaModal from '@/components/AromaModal';
import type { Aroma } from '@/data/aromas';
import Icon from '@/components/ui/icon';

type Section = 'catalog' | 'selector' | 'compare' | 'recipes' | 'docs' | 'contact';

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('catalog');
  const [compareList, setCompareList] = useState<number[]>([]);
  const [selectedAroma, setSelectedAroma] = useState<Aroma | null>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section as Section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCompare = (id: number) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const removeCompare = (id: number) => {
    setCompareList((prev) => prev.filter((x) => x !== id));
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--surface))] font-ibm">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {activeSection === 'catalog' && <HeroSection onNavigate={handleNavigate} />}

      {compareList.length > 0 && activeSection !== 'compare' && (
        <div className="sticky top-16 z-40 bg-[hsl(var(--gold))] border-b border-[hsl(var(--gold-light))] px-6 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="GitCompare" size={14} className="text-[hsl(var(--navy))]" />
              <span className="text-sm font-medium text-[hsl(var(--navy))]">
                В сравнении: {compareList.length}/4
              </span>
            </div>
            <button
              onClick={() => handleNavigate('compare')}
              className="text-sm font-semibold text-[hsl(var(--navy))] flex items-center gap-1 hover:underline"
            >
              Сравнить <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      )}

      <main>
        {activeSection === 'catalog' && (
          <CatalogSection
            compareList={compareList}
            onToggleCompare={toggleCompare}
            onSelectAroma={setSelectedAroma}
          />
        )}
        {activeSection === 'selector' && (
          <SelectorSection onSelectAroma={setSelectedAroma} />
        )}
        {activeSection === 'compare' && (
          <CompareSection
            compareList={compareList}
            onRemove={removeCompare}
            onNavigateCatalog={() => handleNavigate('catalog')}
          />
        )}
        {activeSection === 'recipes' && <RecipesSection />}
        {activeSection === 'docs' && <DocsSection />}
        {activeSection === 'contact' && <ContactSection />}
      </main>

      <footer className="bg-[hsl(var(--navy))] border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[hsl(var(--gold))] rounded-sm flex items-center justify-center">
                <Icon name="FlaskConical" size={14} className="text-[hsl(var(--navy))]" />
              </div>
              <span className="text-white font-semibold">Aroma<span className="text-[hsl(var(--gold))]">Select</span></span>
            </div>
            <div className="flex gap-6">
              {['catalog', 'selector', 'recipes', 'docs', 'contact'].map((s) => (
                <button
                  key={s}
                  onClick={() => handleNavigate(s)}
                  className="text-white/40 hover:text-white/70 text-xs transition-colors"
                >
                  {s === 'catalog' ? 'Каталог' :
                   s === 'selector' ? 'Подбор' :
                   s === 'recipes' ? 'Рецептуры' :
                   s === 'docs' ? 'Документация' : 'Контакты'}
                </button>
              ))}
            </div>
            <div className="text-white/30 text-xs">© 2025 AromaSelect</div>
          </div>
        </div>
      </footer>

      {selectedAroma && (
        <AromaModal
          aroma={selectedAroma}
          onClose={() => setSelectedAroma(null)}
          onToggleCompare={toggleCompare}
          inCompare={compareList.includes(selectedAroma.id)}
        />
      )}
    </div>
  );
}
