import React from 'react';
import { X, Activity, AlertTriangle, Info, Check } from 'lucide-react';
import { Product } from '../types';

interface NutritionModalProps {
  product: Product | null;
  onClose: () => void;
}

export const NutritionModal: React.FC<NutritionModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const n = product.nutritionalInfo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DCCF] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E8DCCF] bg-white/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E88C7D]/15 text-[#C46D4E]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-lg text-[#2C2420]">
                Nutritional Information
              </h3>
              <p className="text-xs text-[#7A6B62] truncate max-w-[240px]">
                {product.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EFE6DB] text-[#6B5D55] transition-colors cursor-pointer"
            aria-label="Close nutritional modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Estimated Disclaimer Alert */}
          <div className="p-3.5 rounded-xl bg-[#FFF9E6] border border-[#F2DE9C] flex gap-3 text-xs text-[#7A5A12] leading-relaxed">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#D9822B]" />
            <div>
              <strong className="font-semibold text-[#573F0A] block mb-0.5">Estimated Nutritional Information</strong>
              Values displayed below represent standardized culinary calculations and are marked as estimated. Actual values may slightly vary depending on natural farm produce, seasonal harvests, custom toppings, or kitchen preparation.
            </div>
          </div>

          {/* Serving Size & Energy */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-xl border border-[#E8DCCF] text-center">
              <span className="block text-[11px] font-semibold text-[#8C7A70] uppercase tracking-wider">
                Serving Size
              </span>
              <span className="text-base font-bold text-[#2C2420] mt-0.5 block">
                {n.servingSize}
              </span>
            </div>

            <div className="p-3 bg-[#FDF4F0] rounded-xl border border-[#F5D5C8] text-center">
              <span className="block text-[11px] font-semibold text-[#C46D4E] uppercase tracking-wider">
                Calories
              </span>
              <span className="text-xl font-black text-[#A63A29] mt-0.5 block">
                {n.calories} <span className="text-xs font-normal text-[#8A4A3E]">kcal</span>
              </span>
            </div>
          </div>

          {/* Macronutrients Grid */}
          <div className="bg-white rounded-xl border border-[#E8DCCF] divide-y divide-[#F0E6DA] overflow-hidden text-sm">
            <div className="flex justify-between items-center px-4 py-2.5">
              <span className="text-[#554740] font-medium">Protein</span>
              <span className="font-bold text-[#2C2420]">{n.protein}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5">
              <span className="text-[#554740] font-medium">Total Carbohydrates</span>
              <span className="font-bold text-[#2C2420]">{n.carbohydrates}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5">
              <span className="text-[#554740] font-medium">Total Fat</span>
              <span className="font-bold text-[#2C2420]">{n.fat}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5">
              <span className="text-[#554740] font-medium">Dietary Fiber</span>
              <span className="font-bold text-[#2C2420]">{n.fiber}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-2.5">
              <span className="text-[#554740] font-medium">Sodium</span>
              <span className="font-bold text-[#2C2420]">{n.sodium}</span>
            </div>
          </div>

          {/* Allergens Section */}
          <div className="p-3.5 bg-white rounded-xl border border-[#E8DCCF]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C46D4E] mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Allergens & Dietary Notice</span>
            </div>
            {n.allergens && n.allergens.length > 0 && n.allergens[0] !== 'None' ? (
              <div className="flex flex-wrap gap-1.5">
                {n.allergens.map((alg, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#FDF0EE] text-[#B83E2C] border border-[#F8C6BF] text-xs font-medium"
                  >
                    Contains: {alg}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-xs text-[#2E9B66] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> No common major food allergens detected in base recipe
              </span>
            )}
          </div>

          {/* Key Ingredients List */}
          <div className="text-xs text-[#6B5D55]">
            <strong className="text-[#3D332D] block mb-1">Base Ingredients:</strong>
            <p className="leading-relaxed bg-white/60 p-2.5 rounded-lg border border-[#E8DCCF]">
              {product.ingredients.join(', ')}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E8DCCF] bg-white/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2C2420] text-white hover:bg-[#453933] text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Nutrition
          </button>
        </div>
      </div>
    </div>
  );
};
