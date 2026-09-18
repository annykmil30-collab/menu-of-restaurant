import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';
import { formatCOP } from '../utils/orderUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  appliedPromoCode?: string;
  onApplyPromoCode?: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  appliedPromoCode,
  onApplyPromoCode,
}) => {
  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromoCode === 'THURSDAYCARIBE') {
    discountAmount = Math.round(subtotal * 0.20);
  } else if (appliedPromoCode === 'CUBACUMPLE15') {
    discountAmount = Math.round(subtotal * 0.15);
  }

  const grandTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E8DCCF] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8DCCF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E88C7D]/15 text-[#C46D4E]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-lg text-[#2C2420]">
                Your Order Summary
              </h3>
              <p className="text-xs text-[#7A6B62]">
                {cartItems.length} {cartItems.length === 1 ? 'dish' : 'dishes'} in bag
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-[#8C7A70] hover:text-[#C45946] px-2 py-1 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#F2EAE0] text-[#6B5D55] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF0E6] flex items-center justify-center mx-auto mb-3 text-[#C46D4E]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h4 className="font-serif-display font-bold text-lg text-[#2C2420] mb-1">
                Your bag is empty
              </h4>
              <p className="text-xs text-[#7A6B62] max-w-xs mx-auto mb-4">
                Explore our authentic Colombian-Cuban menu and select your favorite arepas, slow-cooked ropa vieja, or tropical beverages.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#C46D4E] text-white text-xs font-semibold hover:bg-[#A8573A] transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-2xl border border-[#E8DCCF] shadow-xs space-y-2.5"
              >
                {/* Title and Base Price */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-[#EFE5D9] shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#2C2420] leading-tight">
                        {item.product.name}
                      </h4>
                      <span className="text-xs text-[#8C7A70]">
                        {formatCOP(item.unitPrice)} each
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-[#B5A89E] hover:text-[#C45946] transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Customization Details: Toppings, Sauces, Notes */}
                {item.customization && (
                  <div className="text-[11px] bg-[#FAF7F2] p-2 rounded-xl border border-[#F0E6DA] space-y-1 text-[#6B5D55]">
                    {/* Added Toppings */}
                    {item.customization.selectedToppings?.length > 0 && (
                      <div className="flex items-start gap-1">
                        <span className="font-semibold text-[#C46D4E] shrink-0">+ Toppings:</span>
                        <span>
                          {item.customization.selectedToppings.map(t => `${t.name} (+${formatCOP(t.price)})`).join(', ')}
                        </span>
                      </div>
                    )}

                    {/* Added Sauces */}
                    {item.customization.selectedSauces?.length > 0 && (
                      <div className="flex items-start gap-1">
                        <span className="font-semibold text-[#2D7D7A] shrink-0">+ Sauces:</span>
                        <span>
                          {item.customization.selectedSauces.map(s => `${s.name} (+${formatCOP(s.price)})`).join(', ')}
                        </span>
                      </div>
                    )}

                    {/* Removed Ingredients */}
                    {item.customization.removedIngredients?.length > 0 && (
                      <div className="flex items-start gap-1 text-[#B83E2C]">
                        <span className="font-semibold shrink-0">Hold:</span>
                        <span>{item.customization.removedIngredients.join(', ')}</span>
                      </div>
                    )}

                    {/* Special Preparation Note */}
                    {item.customization.specialPreparationNote && (
                      <div className="text-[#3D332D] italic pt-0.5 border-t border-[#F0E6DA]">
                        Note: "{item.customization.specialPreparationNote}"
                      </div>
                    )}
                  </div>
                )}

                {/* Quantity and Line Total */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center border border-[#D9CABE] rounded-lg overflow-hidden bg-[#FAF7F2]">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-[#EFE5D8] text-[#4A3E37] transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-[#2C2420]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-[#EFE5D8] text-[#4A3E37] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-bold text-sm text-[#2C2420]">
                    {formatCOP(item.totalPrice)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E8DCCF] space-y-3">
            {/* Promo Code Applied Notice */}
            {appliedPromoCode && (
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF0D7] text-xs text-[#9E6510] border border-[#F2DE9C]">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D9822B]" />
                  <span>Promo <strong>{appliedPromoCode}</strong> Active</span>
                </div>
                <span className="font-bold text-[#A8573A]">-{formatCOP(discountAmount)}</span>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B5D55]">
                <span>Food & Drinks Subtotal:</span>
                <span className="font-semibold text-[#2C2420]">{formatCOP(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2E9B66]">
                  <span>Discount:</span>
                  <span className="font-semibold">-{formatCOP(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-[#2C2420] pt-2 border-t border-[#F0E6DA]">
                <span>Estimated Total:</span>
                <span className="text-[#C46D4E]">{formatCOP(grandTotal)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#C46D4E] hover:bg-[#A8573A] text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
