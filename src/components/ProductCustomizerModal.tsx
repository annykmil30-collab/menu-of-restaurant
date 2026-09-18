import React, { useState } from 'react';
import { X, Plus, Minus, Check, AlertCircle, Sparkles, ChefHat } from 'lucide-react';
import { Product, SelectedCustomization, ToppingOption, SauceOption } from '../types';
import { AVAILABLE_TOPPINGS, AVAILABLE_SAUCES } from '../data/toppingsAndSauces';
import { formatCOP } from '../utils/orderUtils';

interface ProductCustomizerModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, customization: SelectedCustomization) => void;
  initialQuantity?: number;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  product,
  onClose,
  onAddToCart,
  initialQuantity = 1,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<SauceOption[]>([]);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [specialPreparationNote, setSpecialPreparationNote] = useState('');
  const [allergyNotice, setAllergyNotice] = useState('');

  // Toggle Topping
  const handleToggleTopping = (topping: ToppingOption) => {
    if (selectedToppings.some(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  // Toggle Sauce
  const handleToggleSauce = (sauce: SauceOption) => {
    if (selectedSauces.some(s => s.id === sauce.id)) {
      setSelectedSauces(selectedSauces.filter(s => s.id !== sauce.id));
    } else {
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  // Toggle Ingredient Removal
  const handleToggleRemove = (ing: string) => {
    if (removedIngredients.includes(ing)) {
      setRemovedIngredients(removedIngredients.filter(item => item !== ing));
    } else {
      setRemovedIngredients([...removedIngredients, ing]);
    }
  };

  // Calculations
  const toppingsCost = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const saucesCost = selectedSauces.reduce((acc, s) => acc + s.price, 0);
  const unitCost = product.price + toppingsCost + saucesCost;
  const totalCost = unitCost * quantity;

  const handleConfirm = () => {
    onAddToCart(product, quantity, {
      selectedToppings,
      selectedSauces,
      removedIngredients,
      specialPreparationNote,
      allergyNotice,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DCCF] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E8DCCF] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#E8DCCF]">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-display font-bold text-lg text-[#2C2420]">
                  Customize: {product.name}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F4F3] text-[#2D7D7A] font-semibold">
                  {formatCOP(product.price)} base
                </span>
              </div>
              <p className="text-xs text-[#7A6B62] line-clamp-1">
                Personalize toppings, artisanal sauces, and culinary adjustments
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F2EAE0] text-[#6B5D55] transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Allergen Warning Banner */}
          <div className="p-3.5 rounded-xl bg-[#FFF5F2] border border-[#F6CBC5] flex gap-2.5 text-xs text-[#9E3929]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C45946]" />
            <div>
              <strong className="font-semibold block mb-0.5">Kitchen Allergy Notice:</strong>
              Please inform our staff of any allergies below. While our kitchen strictly respects special handling requests, our facility prepares items with dairy, eggs, nuts, and shellfish, and we cannot guarantee an absolute allergen-free environment.
            </div>
          </div>

          {/* Section 1: Additional Toppings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-serif-display font-bold text-base text-[#2C2420] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D9822B]" />
                Additional Toppings
              </label>
              <span className="text-xs text-[#7A6B62]">Select multiple if desired</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_TOPPINGS.map((topping) => {
                const isSelected = selectedToppings.some(t => t.id === topping.id);
                return (
                  <button
                    key={topping.id}
                    type="button"
                    onClick={() => handleToggleTopping(topping)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EBF7F2] border-[#78A389] text-[#1E5C3D] shadow-xs'
                        : 'bg-white border-[#E5DACE] text-[#4A3E37] hover:border-[#C46D4E]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isSelected ? 'bg-[#2E9B66] border-[#2E9B66] text-white' : 'border-[#C8BBB0] bg-[#FAF7F2]'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-medium text-xs sm:text-sm">{topping.name}</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#C46D4E]">
                      +{formatCOP(topping.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Additional Sauces Menu */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-serif-display font-bold text-base text-[#2C2420] flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-[#68B8B5]" />
                Additional Sauces Menu
              </label>
              <span className="text-xs text-[#7A6B62]">Handcrafted Caribbean glazes</span>
            </div>

            <div className="space-y-2">
              {AVAILABLE_SAUCES.map((sauce) => {
                const isSelected = selectedSauces.some(s => s.id === sauce.id);
                return (
                  <button
                    key={sauce.id}
                    type="button"
                    onClick={() => handleToggleSauce(sauce)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8F4F3] border-[#68B8B5] text-[#1D5E5B] shadow-xs'
                        : 'bg-white border-[#E5DACE] text-[#4A3E37] hover:border-[#68B8B5]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center border transition-colors ${
                        isSelected ? 'bg-[#2D7D7A] border-[#2D7D7A] text-white' : 'border-[#C8BBB0] bg-[#FAF7F2]'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="font-semibold text-xs sm:text-sm block">{sauce.name}</span>
                        <span className="text-[11px] text-[#7A6B62]">{sauce.flavorProfile}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#2D7D7A] shrink-0 ml-2">
                      +{formatCOP(sauce.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Ingredient Removal (Hold Ingredients) */}
          {product.ingredients.length > 0 && (
            <div>
              <label className="font-serif-display font-bold text-base text-[#2C2420] block mb-2">
                Hold Ingredients (Remove from dish)
              </label>
              <p className="text-xs text-[#7A6B62] mb-3">
                Click any ingredient you prefer our chefs to omit:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => {
                  const isRemoved = removedIngredients.includes(ing);
                  return (
                    <button
                      key={ing}
                      type="button"
                      onClick={() => handleToggleRemove(ing)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        isRemoved
                          ? 'bg-[#FDF0EE] text-[#B83E2C] border-[#F6CBC5] line-through'
                          : 'bg-white text-[#554740] border-[#E0D4C5] hover:border-[#C46D4E]'
                      }`}
                    >
                      {isRemoved ? `No ${ing}` : `Hold ${ing}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 4: Special Requests, Allergies & Suggestions */}
          <div className="space-y-3 pt-2 border-t border-[#E8DCCF]">
            <label 
              htmlFor="special-requests-input"
              className="font-serif-display font-bold text-sm text-[#2C2420] block"
            >
              Special Requests, Allergies & Suggestions
            </label>
            <textarea
              id="special-requests-input"
              value={specialPreparationNote}
              onChange={(e) => setSpecialPreparationNote(e.target.value)}
              placeholder="e.g., “No onions”, “Extra sauce on the side”, “I am allergic to peanuts”, “Please make it less spicy”, “Do not add cilantro”..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CABE] bg-white text-xs sm:text-sm text-[#2C2420] placeholder-[#9C8A80] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Footer with Quantities and Add Button */}
        <div className="p-4 sm:p-5 border-t border-[#E8DCCF] bg-white flex flex-wrap items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#7A6B62] hidden sm:inline">Quantity:</span>
            <div className="flex items-center border border-[#D9CABE] rounded-xl overflow-hidden bg-[#FAF7F2]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-[#EFE5D8] text-[#4A3E37] transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3.5 py-1 text-sm font-bold text-[#2C2420] min-w-[32px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-[#EFE5D8] text-[#4A3E37] transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Total and Add to Order Button */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right">
              <span className="text-[11px] text-[#7A6B62] block">Item Total</span>
              <span className="text-base sm:text-lg font-bold text-[#C46D4E]">
                {formatCOP(totalCost)}
              </span>
            </div>
            
            <button
              id="confirm-customization-btn"
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2.5 rounded-xl bg-[#C46D4E] hover:bg-[#A8573A] text-white font-semibold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
