import { ToppingOption, SauceOption } from '../types';

export const AVAILABLE_TOPPINGS: ToppingOption[] = [
  { id: 'top-cheese', name: 'Extra Cheese', price: 3000, category: 'cheese_sides' },
  { id: 'top-avocado', name: 'Avocado', price: 4000, category: 'fresh' },
  { id: 'top-caram-onion', name: 'Caramelized Onion', price: 2000, category: 'fresh' },
  { id: 'top-crispy-plantain', name: 'Crispy Plantain', price: 3000, category: 'cheese_sides' },
  { id: 'top-extra-ropa-vieja', name: 'Extra Ropa Vieja', price: 7000, category: 'protein' },
  { id: 'top-coconut', name: 'Coconut', price: 2000, category: 'fresh' },
  { id: 'top-mint', name: 'Fresh Mint', price: 1500, category: 'fresh' },
  { id: 'top-pickled-onions', name: 'Pickled Onions', price: 2000, category: 'fresh' },
  { id: 'top-extra-pork', name: 'Extra Pork', price: 7000, category: 'protein' },
];

export const AVAILABLE_SAUCES: SauceOption[] = [
  { id: 'sauce-garlic-cilantro', name: 'Garlic-Cilantro Sauce', price: 2000, flavorProfile: 'Creamy coastal Colombian-Caribbean herb sauce with crushed garlic and lime' },
  { id: 'sauce-caribbean-coconut', name: 'Caribbean Coconut Sauce', price: 2500, flavorProfile: 'Silky warm coconut reduction with sweet peppers, ginger, and turmeric' },
  { id: 'sauce-cuban-mojo', name: 'Cuban Mojo Sauce', price: 2000, flavorProfile: 'Traditional Havana mojo made with bitter sour orange, toasted garlic, and cumin' },
  { id: 'sauce-spicy-tropical', name: 'Spicy Tropical Sauce', price: 2000, flavorProfile: 'Zesty habanero and passion fruit glaze with mild fire and tropical sweetness' },
  { id: 'sauce-guava-bbq', name: 'Guava BBQ Sauce', price: 2500, flavorProfile: 'Smoky Caribbean barbecue infused with sweet Colombian guava paste (bocadillo)' },
];
