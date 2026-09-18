import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, UtensilsCrossed, Sparkles, Heart, Info, MessageSquare, Flame } from 'lucide-react';
import { Logo } from './Logo';
import { formatCOP, RESTAURANT_PHONE } from '../utils/orderUtils';

interface NavbarProps {
  cartItemCount?: number;
  cartCount?: number;
  cartSubtotal?: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate?: (sectionId: string, categoryFilter?: string) => void;
  onNavigateSection?: (sectionId: string, categoryFilter?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartCount,
  cartSubtotal = 0,
  onOpenCart,
  activeSection,
  onNavigate,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const finalItemCount = cartItemCount ?? cartCount ?? 0;

  const handleNavClick = (sectionId: string, categoryFilter?: string) => {
    if (onNavigate) {
      onNavigate(sectionId, categoryFilter);
    } else if (onNavigateSection) {
      onNavigateSection(sectionId, categoryFilter);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBE1D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="cursor-pointer py-2 focus:outline-hidden"
            onClick={() => handleNavClick('home')}
          >
            <Logo size="md" showSlogan={false} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'home' ? 'text-[#C46D4E] bg-[#F4EBE1]' : 'text-[#4A3E37] hover:text-[#C46D4E] hover:bg-[#F7EFE6]'
              }`}
            >
              Home
            </button>

            {/* Menu with direct categories */}
            <button
              onClick={() => handleNavClick('menu')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'menu' ? 'text-[#C46D4E] bg-[#F4EBE1]' : 'text-[#4A3E37] hover:text-[#C46D4E] hover:bg-[#F7EFE6]'
              }`}
            >
              Full Menu
            </button>

            <button
              onClick={() => handleNavClick('build-order')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeSection === 'build-order' ? 'text-[#2D7D7A] bg-[#E8F4F3]' : 'text-[#2D7D7A] hover:bg-[#EDF7F6]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#68B8B5]" />
              Build Your Order
            </button>

            <button
              onClick={() => handleNavClick('promotions')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                activeSection === 'promotions' ? 'text-[#C46D4E] bg-[#FDF2ED]' : 'text-[#4A3E37] hover:text-[#C46D4E] hover:bg-[#F7EFE6]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#E88C7D]" />
              Promotions
            </button>

            <button
              onClick={() => handleNavClick('reviews')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'reviews' ? 'text-[#C46D4E] bg-[#F4EBE1]' : 'text-[#4A3E37] hover:text-[#C46D4E] hover:bg-[#F7EFE6]'
              }`}
            >
              Reviews
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'about' ? 'text-[#C46D4E] bg-[#F4EBE1]' : 'text-[#4A3E37] hover:text-[#C46D4E] hover:bg-[#F7EFE6]'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'contact' ? 'text-[#C46D4E] bg-[#F4EBE1]' : 'text-[#4A3E37] hover:text-[#C46D4E] hover:bg-[#F7EFE6]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-3">
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${RESTAURANT_PHONE}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#5B4C43] bg-white border border-[#E0D4C5] hover:border-[#C46D4E] hover:text-[#C46D4E] transition-colors"
              title="Call Entre Arepas y Ropa Vieja in Ibagué"
            >
              <Phone className="w-3.5 h-3.5 text-[#C46D4E]" />
              <span>{RESTAURANT_PHONE}</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#C46D4E] hover:bg-[#A8573A] text-white shadow-sm transition-transform active:scale-95 cursor-pointer font-medium text-sm"
              aria-label={`Open shopping cart with ${finalItemCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Order Cart</span>
              {finalItemCount > 0 ? (
                <span className="bg-[#FAF7F2] text-[#C46D4E] text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {finalItemCount}
                </span>
              ) : (
                <span className="text-xs opacity-80">0</span>
              )}

              {cartSubtotal > 0 && (
                <span className="hidden md:inline pl-1 border-l border-white/30 text-xs font-semibold">
                  {formatCOP(cartSubtotal)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#4A3E37] hover:bg-[#F2EAE0] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#EBE1D5] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E8DCCF]">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#4A3E37] hover:bg-[#F2EAE0]"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#4A3E37] hover:bg-[#F2EAE0]"
            >
              All Menus
            </button>
            <button
              onClick={() => handleNavClick('menu', 'Breakfast')}
              className="text-left px-3 py-2 rounded-lg text-xs font-medium text-[#C46D4E] hover:bg-[#F2EAE0]"
            >
              🍳 Breakfast (6-10 AM)
            </button>
            <button
              onClick={() => handleNavClick('menu', 'Lunch')}
              className="text-left px-3 py-2 rounded-lg text-xs font-medium text-[#C46D4E] hover:bg-[#F2EAE0]"
            >
              🍛 Lunch (11:30 AM - 2 PM)
            </button>
            <button
              onClick={() => handleNavClick('menu', 'Afternoon Snacks')}
              className="text-left px-3 py-2 rounded-lg text-xs font-medium text-[#C46D4E] hover:bg-[#F2EAE0]"
            >
              🥟 Snacks (3:30 - 5 PM)
            </button>
            <button
              onClick={() => handleNavClick('menu', 'Dinner')}
              className="text-left px-3 py-2 rounded-lg text-xs font-medium text-[#7A6B62] hover:bg-[#F2EAE0]"
            >
              🌙 Dinner Menu
            </button>
            <button
              onClick={() => handleNavClick('menu', 'Drinks')}
              className="text-left px-3 py-2 rounded-lg text-xs font-medium text-[#2D7D7A] hover:bg-[#F2EAE0]"
            >
              🍹 Tropical Drinks
            </button>
            <button
              onClick={() => handleNavClick('menu', 'Desserts')}
              className="text-left px-3 py-2 rounded-lg text-xs font-medium text-[#D9822B] hover:bg-[#F2EAE0]"
            >
              🍰 Desserts
            </button>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <button
              onClick={() => handleNavClick('build-order')}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#2D7D7A] bg-[#EDF7F6]"
            >
              <Sparkles className="w-4 h-4 text-[#68B8B5]" />
              Build Your Order (Custom Combo)
            </button>

            <button
              onClick={() => handleNavClick('promotions')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#C46D4E] hover:bg-[#F2EAE0]"
            >
              <Flame className="w-4 h-4 text-[#E88C7D]" />
              Promotions (Thursday & Birthday)
            </button>

            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#4A3E37] hover:bg-[#F2EAE0]"
            >
              Customer Reviews
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#4A3E37] hover:bg-[#F2EAE0]"
            >
              About Our Colombian-Cuban Story
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#4A3E37] hover:bg-[#F2EAE0]"
            >
              Contact & Location (Ibagué)
            </button>
          </div>

          <div className="pt-3 border-t border-[#E8DCCF] flex items-center justify-between text-xs text-[#6B5D55]">
            <span>Phone: {RESTAURANT_PHONE}</span>
            <span>Ibagué, Tolima</span>
          </div>
        </div>
      )}
    </header>
  );
};
