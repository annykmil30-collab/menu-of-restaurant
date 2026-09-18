import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HoursStatusBanner } from './components/HoursStatusBanner';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { BuildYourOrder } from './components/BuildYourOrder';
import { PromotionsSection } from './components/PromotionsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { SuggestionsSection } from './components/SuggestionsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { NutritionModal } from './components/NutritionModal';

import { Product, CartItem, Order, MenuCategory, CustomerReview, CustomerSuggestion, SelectedCustomization } from './types';
import { INITIAL_REVIEWS } from './data/initialReviews';
import { RESTAURANT_PHONE_CLEAN } from './utils/orderUtils';
import { MessageCircle } from 'lucide-react';

export default function App() {
  // Navigation & Category filter state
  const [activeSection, setActiveSection] = useState('home');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<MenuCategory | 'All'>('All');

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('earv_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('earv_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Promotions State
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>('');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Customizer Modal
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [customizerQuantity, setCustomizerQuantity] = useState(1);

  // Nutrition Modal
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const [nutritionProduct, setNutritionProduct] = useState<Product | null>(null);

  // Reviews State (Persisted)
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('earv_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('earv_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews', e);
    }
  }, [reviews]);

  // Suggestions State (Persisted)
  const [suggestions, setSuggestions] = useState<CustomerSuggestion[]>(() => {
    try {
      const saved = localStorage.getItem('earv_suggestions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('earv_suggestions', JSON.stringify(suggestions));
    } catch (e) {
      console.error('Failed to save suggestions', e);
    }
  }, [suggestions]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number, customization?: SelectedCustomization) => {
    const toppingsPrice = customization?.selectedToppings?.reduce((sum, t) => sum + t.price, 0) || 0;
    const saucesPrice = customization?.selectedSauces?.reduce((sum, s) => sum + s.price, 0) || 0;
    const unitPrice = product.price + toppingsPrice + saucesPrice;

    // Check if matching item exists (same product and exact customization)
    const existingIndex = cartItems.findIndex((item) => {
      if (item.product.id !== product.id) return false;
      if (!customization && !item.customization) return true;
      if (
        JSON.stringify(item.customization?.selectedToppings) === JSON.stringify(customization?.selectedToppings) &&
        JSON.stringify(item.customization?.selectedSauces) === JSON.stringify(customization?.selectedSauces) &&
        JSON.stringify(item.customization?.removedIngredients) === JSON.stringify(customization?.removedIngredients) &&
        item.customization?.specialPreparationNote === customization?.specialPreparationNote
      ) {
        return true;
      }
      return false;
    });

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const newQty = updated[existingIndex].quantity + quantity;
      updated[existingIndex].quantity = newQty;
      updated[existingIndex].totalPrice = newQty * updated[existingIndex].unitPrice;
      updated[existingIndex].itemTotalPrice = newQty * updated[existingIndex].unitPrice;
      setCartItems(updated);
    } else {
      const generatedId = `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      const newItem: CartItem = {
        id: generatedId,
        cartItemId: generatedId,
        product,
        quantity,
        customization,
        itemBasePrice: product.price,
        itemCustomizationTotal: toppingsPrice + saucesPrice,
        itemFinalUnitPrice: unitPrice,
        itemTotalPrice: unitPrice * quantity,
        unitPrice,
        totalPrice: unitPrice * quantity,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems(cartItems.map(item => {
      if (item.id === cartItemId) {
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.unitPrice * newQuantity,
        };
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Customizer triggers
  const handleOpenCustomize = (product: Product, quantity: number = 1) => {
    setCustomizingProduct(product);
    setCustomizerQuantity(quantity);
    setIsCustomizerOpen(true);
  };

  // Nutrition trigger
  const handleOpenNutrition = (product: Product) => {
    setNutritionProduct(product);
    setIsNutritionOpen(true);
  };

  // Checkout and Order Placement
  const handleOrderPlaced = (order: Order) => {
    setPlacedOrder(order);
    setIsCheckoutOpen(false);
    setCartItems([]); // Cart cleared after placement
  };

  // Promotions
  const handleApplyPromoCode = (code: string) => {
    setAppliedPromoCode(code);
    setIsCartOpen(true); // Open cart to show applied discount
  };

  // Reviews submission
  const handleAddReview = (newRev: Omit<CustomerReview, 'id' | 'status'>) => {
    const reviewObj: CustomerReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      status: 'published',
    };
    setReviews([reviewObj, ...reviews]);
  };

  const handleToggleModerationStatus = (reviewId: string) => {
    setReviews(reviews.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          status: r.status === 'published' ? 'hidden' : 'published',
        };
      }
      return r;
    }));
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  // Suggestions submission
  const handleAddSuggestion = (suggestionData: Omit<CustomerSuggestion, 'id' | 'date'>) => {
    const sugObj: CustomerSuggestion = {
      ...suggestionData,
      id: `sug-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };
    setSuggestions([sugObj, ...suggestions]);
  };

  // Navigation Smooth Scroll Helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C2420] font-sans antialiased selection:bg-[#E88C7D]/30 selection:text-[#C46D4E]">
      
      {/* Top Banner: Service Hours & Dynamic Live Status */}
      <HoursStatusBanner />

      {/* Main Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Website Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          onExploreMenu={() => handleNavigate('menu')}
          onOrderNow={() => {
            handleNavigate('menu');
            setSelectedMenuCategory('All');
          }}
          onOurStory={() => handleNavigate('about')}
        />

        {/* Menu Section with Filters, Search, Topping Customization, Nutrition */}
        <MenuSection
          selectedCategory={selectedMenuCategory}
          onCategoryChange={(cat) => setSelectedMenuCategory(cat)}
          onAddToCart={handleAddToCart}
          onOpenCustomize={handleOpenCustomize}
          onOpenNutrition={handleOpenNutrition}
        />

        {/* Interactive "Build Your Own Order" Platter Builder */}
        <BuildYourOrder
          onAddCustomComboToCart={(product, quantity, customization) => {
            handleAddToCart(product, quantity, customization);
            setIsCartOpen(true);
          }}
        />

        {/* Promotions: Thursday Special & Birthday 15% OFF */}
        <PromotionsSection
          onApplyPromoCode={handleApplyPromoCode}
          appliedPromoCode={appliedPromoCode}
        />

        {/* Customer Reviews & 4-Star Rating Breakdown with Admin Moderation */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
          onToggleModerationStatus={handleToggleModerationStatus}
          onDeleteReview={handleDeleteReview}
        />

        {/* Help Us Improve: Customer Suggestions */}
        <SuggestionsSection
          onSubmitSuggestion={handleAddSuggestion}
        />

        {/* About Us / Our Story: Colombian-Cuban Connection */}
        <AboutSection />

        {/* Contact, Hours & Ibagué Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${RESTAURANT_PHONE_CLEAN}?text=${encodeURIComponent('Hello Entre Arepas y Ropa Vieja! I would like to make an inquiry or order in Ibagué.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#1EBE5D] hover:scale-108 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
        aria-label="Contact Entre Arepas y Ropa Vieja on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-1">
          WhatsApp Us (+57 3177423192)
        </span>
      </a>

      {/* Sliding Order Summary Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromoCode={appliedPromoCode}
        onApplyPromoCode={setAppliedPromoCode}
      />

      {/* Product Customizer Modal (Toppings, Sauces, Ingredient Removal, Notes) */}
      <ProductCustomizerModal
        product={customizingProduct}
        onClose={() => setIsCustomizerOpen(false)}
        onAddToCart={handleAddToCart}
        initialQuantity={customizerQuantity}
      />

      {/* Nutritional Information Modal (Estimated calories, macros, allergens) */}
      <NutritionModal
        product={nutritionProduct}
        onClose={() => setIsNutritionOpen(false)}
      />

      {/* Checkout & Address Modal (Ibagué neighborhoods, order types, payments) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderPlaced={handleOrderPlaced}
        appliedPromoCode={appliedPromoCode}
        onApplyPromoCode={setAppliedPromoCode}
      />

      {/* Final Order Confirmation & WhatsApp Notification Modal */}
      <OrderConfirmationModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

    </div>
  );
}
