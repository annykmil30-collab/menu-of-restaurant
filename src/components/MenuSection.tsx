import React, { useState, useMemo } from 'react';
import { Search, Utensils, Coffee, Sun, Sparkles, Moon, Wine, Cake, AlertCircle, Info, Filter } from 'lucide-react';
import { MenuCategory, Product, SelectedCustomization } from '../types';
import { MENU_PRODUCTS } from '../data/menuData';
import { ProductCard } from './ProductCard';

interface MenuSectionProps {
  selectedCategory: MenuCategory | 'All';
  onCategoryChange: (category: MenuCategory | 'All') => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenCustomize: (product: Product, quantity: number) => void;
  onOpenNutrition: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedCategory,
  onCategoryChange,
  onAddToCart,
  onOpenCustomize,
  onOpenNutrition,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'All' | 'Gluten-Free' | 'Non-Alcoholic' | 'Signature'>('All');

  const categories: { id: MenuCategory | 'All'; label: string; icon: React.ReactNode; note?: string }[] = [
    { id: 'All', label: 'All Menu', icon: <Utensils className="w-4 h-4" /> },
    { id: 'Breakfast', label: 'Breakfast', icon: <Coffee className="w-4 h-4" />, note: '6:00 – 10:00 AM' },
    { id: 'Lunch', label: 'Lunch', icon: <Sun className="w-4 h-4" />, note: '11:30 AM – 2:00 PM' },
    { id: 'Afternoon Snacks', label: 'Afternoon Snacks', icon: <Sparkles className="w-4 h-4" />, note: '3:30 – 5:00 PM' },
    { id: 'Dinner', label: 'Dinner', icon: <Moon className="w-4 h-4" />, note: 'Special Events' },
    { id: 'Drinks', label: 'Drinks', icon: <Wine className="w-4 h-4" /> },
    { id: 'Desserts', label: 'Desserts', icon: <Cake className="w-4 h-4" /> },
  ];

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return MENU_PRODUCTS.filter((prod) => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;

      // Search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        prod.name.toLowerCase().includes(query) ||
        prod.shortDescription.toLowerCase().includes(query) ||
        prod.ingredients.some(ing => ing.toLowerCase().includes(query)) ||
        prod.category.toLowerCase().includes(query);

      // Dietary filter
      let matchesDiet = true;
      if (dietaryFilter === 'Gluten-Free') {
        matchesDiet = prod.dietaryBadges?.some(b => b.toLowerCase().includes('gluten-free')) || false;
      } else if (dietaryFilter === 'Non-Alcoholic') {
        matchesDiet = prod.isAlcoholic === false || (!prod.isAlcoholic && prod.category !== 'Drinks');
      } else if (dietaryFilter === 'Signature') {
        matchesDiet = prod.dietaryBadges?.some(b => b.toLowerCase().includes('signature') || b.toLowerCase().includes('chef')) || false;
      }

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  return (
    <section id="menu" className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#68B8B5] block mb-2">
            Authentic Colombian-Cuban Fusion
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2420] tracking-tight mb-4">
            Our Culinary Repertoire
          </h2>
          <p className="text-sm sm:text-base text-[#6B5D55] leading-relaxed">
            From golden crispy arepas and slow-simmered Cuban ropa vieja to refreshing tropical nectars and traditional desserts. Explore every dish crafted with love in Ibagué.
          </p>
        </div>

        {/* Search Bar & Dietary Quick Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients (e.g. arepa, lechón, mojito, coconut)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#D9CABE] text-xs sm:text-sm text-[#2C2420] placeholder-[#8C7A70] focus:outline-hidden focus:ring-2 focus:ring-[#C46D4E] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A70] hover:text-[#2C2420]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Dietary Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[#7A6B62] font-semibold text-xs flex items-center gap-1 mr-1 shrink-0">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {(['All', 'Signature', 'Gluten-Free', 'Non-Alcoholic'] as const).map((filterName) => (
              <button
                key={filterName}
                onClick={() => setDietaryFilter(filterName)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                  dietaryFilter === filterName
                    ? 'bg-[#2C2420] text-white shadow-xs'
                    : 'bg-white border border-[#DDD3C7] text-[#554740] hover:border-[#C46D4E]'
                }`}
              >
                {filterName}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#C46D4E] text-white shadow-sm scale-102'
                    : 'bg-white text-[#4A3E37] border border-[#E3D8CC] hover:bg-[#F7EFE6] hover:border-[#C46D4E]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {cat.note && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF4ED] text-[#8C7A70]'
                  }`}>
                    {cat.note}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Special Mandatory Dinner Service Notice Banner */}
        {selectedCategory === 'Dinner' && (
          <div className="mb-8 p-4 rounded-2xl bg-[#F4EFE6] border border-[#D9CABE] flex items-start gap-3 shadow-xs animate-in fade-in">
            <Info className="w-5 h-5 text-[#8C6D58] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#4D3F37] leading-relaxed">
              <strong className="font-semibold block text-[#2C2420] mb-0.5">
                Dinner Service Status Notice:
              </strong>
              Dinner dishes are displayed for customer browsing, catering, and evening special event previews. Please note that the restaurant’s currently provided regular operating hours do not include a standard dinner service period unless the restaurant administrator explicitly activates it for private banquets or evening weekend sessions.
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={onAddToCart}
                onOpenCustomize={onOpenCustomize}
                onOpenNutrition={onOpenNutrition}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DCCF] p-8">
            <AlertCircle className="w-10 h-10 text-[#C46D4E] mx-auto mb-3" />
            <h3 className="font-serif-display text-xl font-bold text-[#2C2420] mb-1">
              No dishes found
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5D55] mb-4">
              We couldn’t find any items matching “{searchQuery}” in {selectedCategory}. Try resetting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('All');
                onCategoryChange('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#2C2420] text-white text-xs font-semibold hover:bg-[#453933] cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
