import React, { useState } from 'react';
import { Sparkles, Check, Plus, ChefHat, Heart, Utensils } from 'lucide-react';
import { Product, SelectedCustomization, ToppingOption, SauceOption } from '../types';
import { AVAILABLE_TOPPINGS, AVAILABLE_SAUCES } from '../data/toppingsAndSauces';
import { formatCOP } from '../utils/orderUtils';

interface BuildYourOrderProps {
  onAddCustomComboToCart: (product: Product, quantity: number, customization: SelectedCustomization) => void;
}

interface CustomBase {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface CustomProtein {
  id: string;
  name: string;
  price: number;
  description: string;
}

const BASES: CustomBase[] = [
  { id: 'base-arepa', name: 'Artisanal White Corn Arepa', price: 8000, description: 'Freshly griddled Tolimense corn arepa with butter & sea salt' },
  { id: 'base-coconut-rice', name: 'Caribbean Coconut Rice', price: 9000, description: 'Fragrant jasmine rice with coconut milk reduction & sweet raisins' },
  { id: 'base-patacon', name: 'Giant Crispy Patacón', price: 8500, description: 'Hand-pressed green plantain twice fried until golden & crunchy' },
  { id: 'base-yuca', name: 'Steamed Yuca with Garlic Mojo', price: 8000, description: 'Tender cassava root drenched in Havana citrus-garlic glaze' },
];

const PROTEINS: CustomProtein[] = [
  { id: 'prot-ropa-vieja', name: 'Cuban Ropa Vieja Beef', price: 14000, description: 'Shredded flank steak slow-simmered in rich sofrito, olives, and wine' },
  { id: 'prot-lechon', name: 'Tolimense Roasted Lechón Pork', price: 15000, description: 'Crispy crackling pork belly marinated in bitter orange and cumin' },
  { id: 'prot-coconut-chicken', name: 'Caribbean Coconut Chicken', price: 13000, description: 'Free-range chicken breast in golden turmeric & coconut milk reduction' },
  { id: 'prot-picadillo', name: 'Cuban Havana Picadillo', price: 12000, description: 'Seasoned minced beef sautéed with raisins, green olives, and sweet peppers' },
];

export const BuildYourOrder: React.FC<BuildYourOrderProps> = ({ onAddCustomComboToCart }) => {
  const [selectedBase, setSelectedBase] = useState<CustomBase>(BASES[0]);
  const [selectedProtein, setSelectedProtein] = useState<CustomProtein>(PROTEINS[0]);
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<SauceOption[]>([AVAILABLE_SAUCES[2]]); // Cuban Mojo default
  const [specialNote, setSpecialNote] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  // Toggle Topping
  const toggleTopping = (top: ToppingOption) => {
    if (selectedToppings.some(t => t.id === top.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== top.id));
    } else {
      setSelectedToppings([...selectedToppings, top]);
    }
  };

  // Toggle Sauce
  const toggleSauce = (sauce: SauceOption) => {
    if (selectedSauces.some(s => s.id === sauce.id)) {
      setSelectedSauces(selectedSauces.filter(s => s.id !== sauce.id));
    } else {
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  // Price calculations
  const toppingsTotal = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const saucesTotal = selectedSauces.reduce((acc, s) => acc + s.price, 0);
  const comboPrice = selectedBase.price + selectedProtein.price + toppingsTotal + saucesTotal;

  const handleAddToCart = () => {
    const customProduct: Product = {
      id: `custom-platter-${Date.now()}`,
      name: `Custom Fusion Platter: ${selectedProtein.name} over ${selectedBase.name}`,
      category: 'Lunch',
      price: selectedBase.price + selectedProtein.price,
      shortDescription: `Custom crafted Colombian-Cuban fusion platter with ${selectedBase.name} and ${selectedProtein.name}.`,
      detailedDescription: `Personalized feast assembled with ${selectedBase.name}, loaded with ${selectedProtein.name}, topped with ${selectedToppings.map(t => t.name).join(', ') || 'signature herbs'}, and dressed with ${selectedSauces.map(s => s.name).join(', ') || 'house mojo'}.`,
      ingredients: [selectedBase.name, selectedProtein.name, ...selectedToppings.map(t => t.name), ...selectedSauces.map(s => s.name)],
      imageUrl: '/images/cuban_arepa_fusion_1789757004820.jpg',
      estimatedServingSize: '450g custom platter',
      calories: 650 + (selectedToppings.length * 45),
      nutritionalInfo: {
        calories: 650 + (selectedToppings.length * 45),
        protein: '42g',
        carbohydrates: '58g',
        fat: '26g',
        fiber: '6g',
        sodium: '790mg',
        servingSize: '450g',
        allergens: ['Varies by toppings'],
      },
      allergens: [],
      dietaryBadges: ['Custom Creation', 'Build Your Own'],
      customizable: true,
    };

    onAddCustomComboToCart(customProduct, 1, {
      selectedToppings,
      selectedSauces,
      removedIngredients: [],
      specialPreparationNote: specialNote || 'Custom Platter assembly as chosen in builder.',
      allergyNotice: '',
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section id="build-order" className="py-12 sm:py-16 bg-[#F7F2EA] border-y border-[#E6DACD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#68B8B5]/15 text-[#2D7D7A] font-semibold text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Gastronomy</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2C2420] tracking-tight mb-3">
            Build Your Own Colombian-Cuban Feast
          </h2>
          <p className="text-sm sm:text-base text-[#6B5D55]">
            Design your personalized fusion platter in 4 simple steps: choose your authentic base, tender slow-cooked protein, fresh toppings, and Caribbean sauces.
          </p>
        </div>

        {/* Builder Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Builder Steps (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Base */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E3D8CC] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif-display font-bold text-base sm:text-lg text-[#2C2420] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#C46D4E] text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                  Choose Your Base
                </span>
                <span className="text-xs text-[#8C7A70]">Required (Select 1)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASES.map((base) => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <button
                      key={base.id}
                      type="button"
                      onClick={() => setSelectedBase(base)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FDF2ED] border-[#C46D4E] shadow-xs'
                          : 'bg-[#FAF7F2] border-[#E8DCCF] hover:border-[#C46D4E]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-[#2C2420]">{base.name}</span>
                        <span className="text-xs font-semibold text-[#C46D4E]">{formatCOP(base.price)}</span>
                      </div>
                      <p className="text-xs text-[#7A6B62] mt-1">{base.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Protein */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E3D8CC] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif-display font-bold text-base sm:text-lg text-[#2C2420] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#C46D4E] text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
                  Choose Your Slow-Cooked Protein
                </span>
                <span className="text-xs text-[#8C7A70]">Required (Select 1)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROTEINS.map((protein) => {
                  const isSelected = selectedProtein.id === protein.id;
                  return (
                    <button
                      key={protein.id}
                      type="button"
                      onClick={() => setSelectedProtein(protein)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FDF2ED] border-[#C46D4E] shadow-xs'
                          : 'bg-[#FAF7F2] border-[#E8DCCF] hover:border-[#C46D4E]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-[#2C2420]">{protein.name}</span>
                        <span className="text-xs font-semibold text-[#C46D4E]">{formatCOP(protein.price)}</span>
                      </div>
                      <p className="text-xs text-[#7A6B62] mt-1">{protein.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Toppings */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E3D8CC] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif-display font-bold text-base sm:text-lg text-[#2C2420] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#68B8B5] text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                  Select Extra Toppings
                </span>
                <span className="text-xs text-[#8C7A70]">Optional (Pick as many as you like)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {AVAILABLE_TOPPINGS.map((top) => {
                  const isSelected = selectedToppings.some(t => t.id === top.id);
                  return (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => toggleTopping(top)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#EBF7F2] border-[#78A389] text-[#1D5C3D]'
                          : 'bg-[#FAF7F2] border-[#E8DCCF] text-[#4A3E37] hover:border-[#C46D4E]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-[#2E9B66] border-[#2E9B66] text-white' : 'border-[#C8BBB0]'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium truncate">{top.name}</span>
                      </div>
                      <span className="font-semibold text-[#C46D4E]">+{formatCOP(top.price)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Sauces & Notes */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E3D8CC] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif-display font-bold text-base sm:text-lg text-[#2C2420] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#68B8B5] text-white text-xs flex items-center justify-center font-sans font-bold">4</span>
                  Artisanal Caribbean Sauces
                </span>
                <span className="text-xs text-[#8C7A70]">Choose 1 or more</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {AVAILABLE_SAUCES.map((sauce) => {
                  const isSelected = selectedSauces.some(s => s.id === sauce.id);
                  return (
                    <button
                      key={sauce.id}
                      type="button"
                      onClick={() => toggleSauce(sauce)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E8F4F3] border-[#68B8B5] text-[#1D5E5B]'
                          : 'bg-[#FAF7F2] border-[#E8DCCF] text-[#4A3E37] hover:border-[#68B8B5]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-[#2C2420] flex items-center gap-1.5">
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                            isSelected ? 'bg-[#2D7D7A] border-[#2D7D7A] text-white' : 'border-[#C8BBB0]'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{sauce.name}</span>
                        </div>
                        <p className="text-[11px] text-[#7A6B62] pl-5 mt-0.5">{sauce.flavorProfile}</p>
                      </div>
                      <span className="font-semibold text-[#2D7D7A] shrink-0 ml-2">+{formatCOP(sauce.price)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Special preparation note */}
              <div>
                <label className="block text-xs font-semibold text-[#4A3E37] mb-1.5">
                  Special Kitchen Instructions:
                </label>
                <input
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. sauce on the side, extra crispy patacón, no cilantro..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Platter Live Summary & Order Button (Right 4 Cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl border border-[#E3D8CC] p-5 sm:p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E8DCCF] pb-3">
                <ChefHat className="w-5 h-5 text-[#C46D4E]" />
                <h3 className="font-serif-display font-bold text-lg text-[#2C2420]">
                  Your Custom Creation
                </h3>
              </div>

              {/* Live Preview List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#F0E6DA]">
                  <span className="text-[#6B5D55]">Base:</span>
                  <span className="font-semibold text-[#2C2420] text-right">{selectedBase.name} ({formatCOP(selectedBase.price)})</span>
                </div>

                <div className="flex justify-between pb-2 border-b border-[#F0E6DA]">
                  <span className="text-[#6B5D55]">Protein:</span>
                  <span className="font-semibold text-[#2C2420] text-right">{selectedProtein.name} ({formatCOP(selectedProtein.price)})</span>
                </div>

                {selectedToppings.length > 0 && (
                  <div className="pb-2 border-b border-[#F0E6DA]">
                    <div className="flex justify-between mb-1">
                      <span className="text-[#6B5D55]">Toppings ({selectedToppings.length}):</span>
                      <span className="font-semibold text-[#C46D4E]">+{formatCOP(toppingsTotal)}</span>
                    </div>
                    <p className="text-[11px] text-[#8C7A70] leading-tight">
                      {selectedToppings.map(t => t.name).join(', ')}
                    </p>
                  </div>
                )}

                {selectedSauces.length > 0 && (
                  <div className="pb-2 border-b border-[#F0E6DA]">
                    <div className="flex justify-between mb-1">
                      <span className="text-[#6B5D55]">Sauces ({selectedSauces.length}):</span>
                      <span className="font-semibold text-[#2D7D7A]">+{formatCOP(saucesTotal)}</span>
                    </div>
                    <p className="text-[11px] text-[#8C7A70] leading-tight">
                      {selectedSauces.map(s => s.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-2 flex justify-between items-baseline">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7A70]">Total Platter:</span>
                <span className="text-xl font-bold text-[#C46D4E]">
                  {formatCOP(comboPrice)}
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 ${
                  justAdded
                    ? 'bg-[#2E9B66] text-white'
                    : 'bg-[#C46D4E] hover:bg-[#A8573A] text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Platter Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add Custom Platter to Order</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
