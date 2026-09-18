export type MenuCategory = 
  | 'Breakfast'
  | 'Lunch'
  | 'Afternoon Snacks'
  | 'Dinner'
  | 'Drinks'
  | 'Desserts';

export interface NutritionalInfo {
  calories: number;
  protein: string;
  carbohydrates: string;
  fat: string;
  fiber: string;
  sodium: string;
  servingSize: string;
  allergens: string[];
}

export interface Product {
  id: string;
  name: string;
  category: MenuCategory;
  price: number; // in COP
  shortDescription: string;
  detailedDescription: string;
  ingredients: string[];
  imageUrl: string;
  estimatedServingSize: string;
  calories: number;
  nutritionalInfo: NutritionalInfo;
  allergens: string[];
  dietaryBadges?: string[]; // e.g. 'Signature Fusion', 'Colombian Classic', 'Cuban Tradition', 'Gluten-Free', 'Alcoholic', 'Non-Alcoholic'
  isAlcoholic?: boolean;
  isAvailableForDinnerOnly?: boolean;
  customizable?: boolean;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number; // in COP
  category?: 'protein' | 'fresh' | 'cheese_sides';
}

export interface SauceOption {
  id: string;
  name: string;
  price: number; // in COP
  flavorProfile: string;
}

export interface SelectedCustomization {
  selectedToppings: ToppingOption[];
  selectedSauces: SauceOption[];
  removedIngredients: string[];
  specialPreparationNote: string;
  allergyNotice: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Tropical Spicy';
}

export type PaymentMethod =
  | 'Mobile Transfer (Nequi / Daviplata / Bancolombia)'
  | 'Cash on Delivery / Counter'
  | 'Card on Delivery (Portable POS terminal)'
  | 'Online Card Payment';

export interface CartItem {
  id: string;
  cartItemId: string;
  product: Product;
  quantity: number;
  customization?: SelectedCustomization;
  itemBasePrice: number;
  itemCustomizationTotal: number;
  itemFinalUnitPrice: number;
  itemTotalPrice: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'Dine In' | 'Take Away' | 'Delivery';

export interface DeliveryDetails {
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  aptHouseNumber: string;
  neighborhood: string;
  city: string; // Default: 'Ibagué, Tolima'
  deliveryInstructions?: string;
  timingType: 'As soon as possible' | 'Schedule for later';
  scheduledTime?: string;
}

export interface DineInDetails {
  fullName: string;
  phoneNumber: string;
  tableNumber?: string;
  guestCount?: number;
  timingType: 'As soon as possible' | 'Schedule for later';
  scheduledTime?: string;
}

export interface TakeAwayDetails {
  fullName: string;
  phoneNumber: string;
  timingType: 'As soon as possible' | 'Schedule for later';
  scheduledTime?: string;
}

export interface Order {
  id?: string;
  orderNumber: string; // e.g., EARV-20260918-001
  timestamp: string;
  createdAt?: string;
  customerName: string;
  customerPhone: string;
  customer?: {
    fullName: string;
    phone: string;
    email?: string;
    orderType: OrderType;
    deliveryAddress?: string;
    deliveryNeighborhood?: string;
    tableNumber?: string;
    preferredTime?: string;
    specialDeliveryInstructions?: string;
  };
  orderType: OrderType;
  deliveryDetails?: DeliveryDetails;
  dineInDetails?: DineInDetails;
  takeAwayDetails?: TakeAwayDetails;
  items: CartItem[];
  subtotal: number;
  customizationTotal?: number;
  deliveryFee: number;
  discount?: number;
  discountAmount?: number;
  promoCodeApplied?: string;
  appliedPromoCode?: string;
  total: number;
  paymentMethod?: PaymentMethod;
  specialRequests?: string;
  allergies?: string;
  confirmedCheckbox?: boolean;
  status: 'Pending Review' | 'Kitchen Preparing' | 'Ready' | 'Completed' | 'Received - Kitchen Preparing';
}

export interface CustomerReview {
  id: string;
  name: string;
  date: string;
  foodRating: number; // 1-5
  serviceRating: number; // 1-5
  atmosphereRating: number; // 1-5
  overallRating: number; // 1-5
  comment: string;
  favoriteDish?: string;
  status: 'published' | 'pending_moderation' | 'hidden';
}

export interface CustomerSuggestion {
  id: string;
  category: 'Food' | 'Service' | 'Restaurant' | 'Website' | 'New dishes' | 'New drinks' | 'Other ideas';
  name: string;
  emailOrPhone: string;
  suggestion: string;
  date: string;
}

export interface ServiceWindow {
  name: 'Breakfast' | 'Lunch' | 'Afternoon Snacks' | 'Dinner';
  startTime: string; // 24h format "06:00"
  endTime: string; // 24h format "10:00"
  displayTime: string;
  isActive: boolean;
  note?: string;
}
