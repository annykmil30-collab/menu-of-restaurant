import React, { useState } from 'react';
import { Plus, Minus, Info, Sparkles, SlidersHorizontal, AlertCircle, Check } from 'lucide-react';
import { Product } from '../types';
import { formatCOP } from '../utils/orderUtils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenCustomize: (product: Product, quantity: number) => void;
  onOpenNutrition: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenCustomize,
  onOpenNutrition,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddDirect = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#EBE1D5] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:border-[#D9C6B2]"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full bg-[#FAF7F2] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = '/images/hero_fusion_spread_1789756993190.jpg';
          }}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 max-w-[85%]">
          {product.dietaryBadges?.map((badge, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide shadow-xs backdrop-blur-xs ${
                badge.includes('Fusion') || badge.includes('Chef')
                  ? 'bg-[#C46D4E]/90 text-white'
                  : badge.includes('Gluten')
                  ? 'bg-[#78A389]/90 text-white'
                  : badge.includes('Alcoholic') && !badge.includes('Non')
                  ? 'bg-[#9E3929]/90 text-white'
                  : 'bg-white/90 text-[#3D332D]'
              }`}
            >
              {badge}
            </span>
          ))}
          {product.isAvailableForDinnerOnly && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#3D332D]/90 text-[#F4EFE6] backdrop-blur-xs">
              Dinner Menu
            </span>
          )}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#E5D9CC] shadow-xs">
          <span className="font-bold text-sm sm:text-base text-[#C46D4E]">
            {formatCOP(product.price)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        
        {/* Name and Calories Row */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-serif-display font-bold text-lg sm:text-xl text-[#2C2420] leading-snug group-hover:text-[#C46D4E] transition-colors">
            {product.name}
          </h3>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF4ED] text-[#8C7A70] shrink-0">
            {product.calories} kcal
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#635750] leading-relaxed mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Ingredients & Serving Size */}
        <div className="text-[11px] text-[#7A6B62] bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EFE5D9] mb-4 space-y-1">
          <div>
            <strong className="text-[#4A3E37]">Ingredients:</strong> {product.ingredients.slice(0, 4).join(', ')}
            {product.ingredients.length > 4 ? ` +${product.ingredients.length - 4} more` : ''}
          </div>
          <div className="flex justify-between text-[#8C7A70] pt-0.5 border-t border-[#EFE5D9]">
            <span>Serving: <strong>{product.estimatedServingSize}</strong></span>
            {product.allergens.length > 0 && product.allergens[0] !== 'None' ? (
              <span className="text-[#C45946] font-medium">
                Allergens: {product.allergens.join(', ')}
              </span>
            ) : (
              <span className="text-[#2E9B66]">No major allergens</span>
            )}
          </div>
        </div>

        {/* Action Controls Footer */}
        <div className="mt-auto pt-2 flex flex-col gap-2.5">
          
          {/* Nutrition Info Trigger */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onOpenNutrition(product)}
              className="text-xs text-[#2D7D7A] hover:text-[#1D5E5B] font-medium flex items-center gap-1 cursor-pointer transition-colors"
              aria-label={`View nutritional information for ${product.name}`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>View Nutritional Information</span>
            </button>

            {product.customizable && (
              <button
                type="button"
                onClick={() => onOpenCustomize(product, quantity)}
                className="text-xs text-[#C46D4E] hover:text-[#A8573A] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                aria-label={`Customize ${product.name}`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
            )}
          </div>

          {/* Quantity and Add Buttons Row */}
          <div className="flex items-center gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#D9CABE] rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-[#EFE5D8] text-[#4A3E37] transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-bold text-[#2C2420] min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-[#EFE5D8] text-[#4A3E37] transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct Add to Order Button */}
            <button
              type="button"
              onClick={handleAddDirect}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-semibold text-xs sm:text-sm transition-all active:scale-98 cursor-pointer shadow-xs ${
                justAdded
                  ? 'bg-[#2E9B66] text-white'
                  : 'bg-[#C46D4E] hover:bg-[#A8573A] text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
