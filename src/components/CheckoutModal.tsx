import React, { useState } from 'react';
import { X, MapPin, Phone, CreditCard, Banknote, Clock, ArrowRight, Tag, AlertCircle, Check, Sparkles } from 'lucide-react';
import { CartItem, Order, OrderType, PaymentMethod } from '../types';
import { formatCOP, RESTAURANT_PHONE } from '../utils/orderUtils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderPlaced: (order: Order) => void;
  appliedPromoCode?: string;
  onApplyPromoCode: (code: string) => void;
}

const IBAGUE_NEIGHBORHOODS = [
  'El Vergel',
  'Cádiz',
  'Centro / Plaza de Bolívar',
  'La Pola',
  'Piedra Pintada',
  'Belén',
  'Calambeo',
  'Salado / El Salado',
  'Interlaken',
  'Santa Helena',
  'Macarena',
  'Other Neighborhood in Ibagué',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderPlaced,
  appliedPromoCode,
  onApplyPromoCode,
}) => {
  if (!isOpen) return null;

  // Form State
  const [orderType, setOrderType] = useState<OrderType>('Delivery');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState(IBAGUE_NEIGHBORHOODS[0]);
  const [tableNumber, setTableNumber] = useState('');
  const [timePreference, setTimePreference] = useState<'ASAP' | 'Scheduled'>('ASAP');
  const [scheduledTime, setScheduledTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Mobile Transfer (Nequi / Daviplata / Bancolombia)');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [formError, setFormError] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  
  // Delivery fee: 5000 COP for delivery, free if order >= 70,000 COP, or 0 for Take Away / Dine In
  const deliveryFee = orderType === 'Delivery' ? (subtotal >= 70000 ? 0 : 5000) : 0;

  // Promo discounts
  let discountAmount = 0;
  if (appliedPromoCode === 'THURSDAYCARIBE') {
    discountAmount = Math.round(subtotal * 0.20);
  } else if (appliedPromoCode === 'CUBACUMPLE15') {
    discountAmount = Math.round(subtotal * 0.15);
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'THURSDAYCARIBE' || code === 'CUBACUMPLE15') {
      onApplyPromoCode(code);
      setPromoMessage(`Promo code "${code}" successfully applied!`);
    } else {
      setPromoMessage('Invalid promo code. Valid codes: THURSDAYCARIBE, CUBACUMPLE15');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!phone.trim()) {
      setFormError('Please enter a contact phone number.');
      return;
    }

    if (orderType === 'Delivery' && !address.trim()) {
      setFormError('Please enter your complete delivery address in Ibagué.');
      return;
    }

    if (orderType === 'Dine In' && !tableNumber.trim()) {
      setFormError('Please specify your table number or dining area.');
      return;
    }

    const uniqueId = `EARV-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const orderDateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const orderTimeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: uniqueId,
      orderNumber: uniqueId,
      timestamp: `${orderDateStr} at ${orderTimeStr}`,
      createdAt: `${orderDateStr} at ${orderTimeStr}`,
      customerName: fullName.trim(),
      customerPhone: phone.trim(),
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        orderType,
        deliveryAddress: orderType === 'Delivery' ? address.trim() : undefined,
        deliveryNeighborhood: orderType === 'Delivery' ? neighborhood : undefined,
        tableNumber: orderType === 'Dine In' ? tableNumber.trim() : undefined,
        preferredTime: timePreference === 'ASAP' ? 'As soon as possible (30-45 mins)' : `Scheduled: ${scheduledTime}`,
        specialDeliveryInstructions: specialInstructions.trim(),
      },
      orderType,
      deliveryDetails: orderType === 'Delivery' ? {
        fullName: fullName.trim(),
        phoneNumber: phone.trim(),
        streetAddress: address.trim(),
        aptHouseNumber: '',
        neighborhood,
        city: 'Ibagué, Tolima',
        deliveryInstructions: specialInstructions.trim(),
        timingType: timePreference === 'ASAP' ? 'As soon as possible' : 'Schedule for later',
        scheduledTime,
      } : undefined,
      dineInDetails: orderType === 'Dine In' ? {
        fullName: fullName.trim(),
        phoneNumber: phone.trim(),
        tableNumber: tableNumber.trim(),
        timingType: timePreference === 'ASAP' ? 'As soon as possible' : 'Schedule for later',
        scheduledTime,
      } : undefined,
      takeAwayDetails: orderType === 'Take Away' ? {
        fullName: fullName.trim(),
        phoneNumber: phone.trim(),
        timingType: timePreference === 'ASAP' ? 'As soon as possible' : 'Schedule for later',
        scheduledTime,
      } : undefined,
      items: cartItems,
      paymentMethod,
      appliedPromoCode,
      promoCodeApplied: appliedPromoCode,
      subtotal,
      customizationTotal: 0,
      discount: discountAmount,
      discountAmount,
      deliveryFee,
      total: grandTotal,
      specialRequests: specialInstructions.trim(),
      allergies: '',
      confirmedCheckbox: true,
      status: 'Kitchen Preparing',
    };

    onOrderPlaced(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8DCCF] overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8DCCF] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-display font-bold text-xl text-[#2C2420]">
                Checkout & Confirmation
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF0D7] text-[#9E6510] font-semibold">
                Ibagué, Tolima
              </span>
            </div>
            <p className="text-xs text-[#7A6B62]">
              Complete your details to send your order directly to our kitchen
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F2EAE0] text-[#6B5D55] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handlePlaceOrder} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Step 1: Order Type Selection */}
          <div>
            <label className="font-serif-display font-bold text-base text-[#2C2420] block mb-2">
              1. Select Order Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Delivery', 'Take Away', 'Dine In'] as OrderType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`p-3 rounded-2xl border text-center font-semibold transition-all cursor-pointer ${
                    orderType === type
                      ? 'bg-[#C46D4E] text-white border-[#C46D4E] shadow-sm'
                      : 'bg-white border-[#E0D4C5] text-[#4A3E37] hover:border-[#C46D4E]'
                  }`}
                >
                  <span className="block text-sm">{type}</span>
                  <span className={`text-[10px] font-normal block mt-0.5 ${orderType === type ? 'text-white/80' : 'text-[#8C7A70]'}`}>
                    {type === 'Delivery' ? '$5,000 COP (Ibagué)' : type === 'Take Away' ? 'Pick up at restaurant' : 'At table in Ibagué'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Customer Contact Information */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DCCF] space-y-3">
            <span className="font-serif-display font-bold text-base text-[#2C2420] block">
              2. Contact Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#4A3E37] mb-1">
                  Full Name <span className="text-[#C46D4E]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Valentina Mora"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A3E37] mb-1">
                  Phone / Mobile Number <span className="text-[#C46D4E]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +57 317 742 3192"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E37] mb-1">
                Email Address (For receipt copy):
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. valentina@example.com"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Step 3: Location / Table Specifics */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DCCF] space-y-3">
            <span className="font-serif-display font-bold text-base text-[#2C2420] block">
              3. Service Location in Ibagué
            </span>

            {orderType === 'Delivery' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#4A3E37] mb-1">
                      Neighborhood (Barrio) in Ibagué:
                    </label>
                    <select
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                    >
                      {IBAGUE_NEIGHBORHOODS.map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A3E37] mb-1">
                      Exact Delivery Street Address <span className="text-[#C46D4E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Carrera 5 #42-10, Apt 302, Edificio Palma"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E37] mb-1">
                    Delivery Instructions / Landmark (Gate, Portería, etc.):
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Leave with doorman, ring doorbell 302..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {orderType === 'Dine In' && (
              <div>
                <label className="block text-xs font-bold text-[#4A3E37] mb-1">
                  Table Number or Seating Area: <span className="text-[#C46D4E]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. Table 4 / Patio Terrace"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                />
              </div>
            )}

            {orderType === 'Take Away' && (
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EDE2D5] text-xs text-[#6B5D55]">
                Pick-up Address: <strong>Carrera 5 #42-10, Ibagué, Tolima</strong>. Your order will be prepared hot and sealed for takeaway in approximately 20–25 minutes.
              </div>
            )}

            {/* Timing */}
            <div className="pt-2 border-t border-[#F0E6DA] flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#4A3E37]">Preparation Timing:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTimePreference('ASAP')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    timePreference === 'ASAP' ? 'bg-[#2D7D7A] text-white' : 'bg-[#FAF7F2] text-[#554740] border border-[#DDD3C7]'
                  }`}
                >
                  As soon as possible (30–45 mins)
                </button>
                <button
                  type="button"
                  onClick={() => setTimePreference('Scheduled')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    timePreference === 'Scheduled' ? 'bg-[#2D7D7A] text-white' : 'bg-[#FAF7F2] text-[#554740] border border-[#DDD3C7]'
                  }`}
                >
                  Specific time
                </button>
              </div>
            </div>

            {timePreference === 'Scheduled' && (
              <div className="pt-2">
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#D9CABE] text-xs bg-[#FAF7F2]"
                />
              </div>
            )}
          </div>

          {/* Step 4: Payment Method Selection */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8DCCF] space-y-3">
            <span className="font-serif-display font-bold text-base text-[#2C2420] block">
              4. Payment Method
            </span>

            <div className="space-y-2">
              {(
                [
                  'Mobile Transfer (Nequi / Daviplata / Bancolombia)',
                  'Cash on Delivery / Counter',
                  'Card on Delivery (Portable POS terminal)',
                  'Online Card Payment',
                ] as PaymentMethod[]
              ).map((method) => {
                const isSelected = paymentMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FDF2ED] border-[#C46D4E] shadow-xs'
                        : 'bg-[#FAF7F2] border-[#E5DACE] text-[#4A3E37] hover:border-[#C46D4E]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#C46D4E] bg-[#C46D4E]' : 'border-[#B8ABA0]'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="font-semibold text-xs sm:text-sm text-[#2C2420]">{method}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Transfer Bank Details info box */}
            {paymentMethod.includes('Mobile Transfer') && (
              <div className="p-3.5 bg-[#FAF4ED] rounded-xl border border-[#E8D6C3] text-xs text-[#5B4C43] space-y-1">
                <strong className="text-[#A8573A] block font-bold">Mobile Transfer Details (Colombia):</strong>
                <p>• <strong>Nequi / Daviplata:</strong> 317 742 3192 (Entre Arepas y Ropa Vieja)</p>
                <p>• <strong>Bancolombia Savings Account:</strong> 829-001928-44</p>
                <p className="text-[11px] text-[#8C7A70] pt-1">
                  You can send the payment proof screenshot easily via our WhatsApp button upon placing your order!
                </p>
              </div>
            )}
          </div>

          {/* Promo Code Input */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DCCF]">
            <label className="block text-xs font-bold text-[#4A3E37] mb-1.5">
              Have a Promotional Voucher or Code?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="e.g. THURSDAYCARIBE or CUBACUMPLE15"
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] uppercase focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-[#2C2420] hover:bg-[#453933] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className={`text-xs mt-1.5 ${promoMessage.includes('successfully') ? 'text-[#2E9B66]' : 'text-[#B83E2C]'}`}>
                {promoMessage}
              </p>
            )}
          </div>

          {/* Error notice */}
          {formError && (
            <div className="p-3 bg-[#FDF0EE] text-[#B83E2C] border border-[#F8C6BF] rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Summary Breakdown */}
          <div className="bg-[#FAF4ED] p-4 rounded-2xl border border-[#E8DCCF] space-y-2 text-xs">
            <div className="flex justify-between text-[#6B5D55]">
              <span>Items Subtotal ({cartItems.length} items):</span>
              <span className="font-semibold text-[#2C2420]">{formatCOP(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#2E9B66]">
                <span>Discount ({appliedPromoCode}):</span>
                <span className="font-semibold">-{formatCOP(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#6B5D55]">
              <span>Delivery Fee ({orderType}):</span>
              <span className="font-semibold text-[#2C2420]">
                {deliveryFee === 0 ? (orderType === 'Delivery' ? 'FREE (Over $70,000)' : '$0 COP') : formatCOP(deliveryFee)}
              </span>
            </div>

            <div className="pt-2 border-t border-[#E3D4C4] flex justify-between items-baseline text-base font-bold text-[#2C2420]">
              <span>Total Payable:</span>
              <span className="text-lg font-black text-[#C46D4E]">
                {formatCOP(grandTotal)}
              </span>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[#C46D4E] hover:bg-[#A8573A] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Confirm & Place Order</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
