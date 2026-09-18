import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy, Printer, Phone, MapPin, Clock, ArrowRight, Share2, Check, ExternalLink } from 'lucide-react';
import { Order } from '../types';
import { formatCOP, RESTAURANT_PHONE, RESTAURANT_PHONE_CLEAN, buildOrderNotificationText } from '../utils/orderUtils';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  // Generate WhatsApp text payload
  const notificationText = buildOrderNotificationText(order);
  const encodedText = encodeURIComponent(notificationText);
  const whatsappUrl = `https://wa.me/${RESTAURANT_PHONE_CLEAN}?text=${encodedText}`;
  const smsUrl = `sms:${RESTAURANT_PHONE}?body=${encodedText}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(notificationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const customerFullName = order.customer?.fullName || order.customerName;
  const customerPhone = order.customer?.phone || order.customerPhone;
  const orderType = order.customer?.orderType || order.orderType;
  const orderId = order.id || order.orderNumber;
  const discountVal = order.discountAmount ?? order.discount ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8DCCF] overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Success Badge */}
        <div className="p-6 bg-white border-b border-[#E8DCCF] text-center relative">
          <div className="w-14 h-14 rounded-full bg-[#E8F7EE] text-[#2E9B66] flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <span className="text-xs uppercase tracking-widest font-bold text-[#68B8B5] block mb-1">
            Order Confirmed & Sent to Kitchen
          </span>

          <h2 className="font-serif-display text-2xl sm:text-3xl font-extrabold text-[#2C2420]">
            Thank You, {customerFullName}!
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs">
            <span className="font-mono bg-[#FAF4ED] px-3 py-1 rounded-lg border border-[#E5D7C8] font-bold text-[#C46D4E]">
              Order #{orderId}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#EBF7F2] text-[#1E5C3D] font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2E9B66] animate-pulse" />
              {order.status}
            </span>
          </div>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          
          {/* WhatsApp / SMS Quick Action Callout */}
          <div className="p-4 rounded-2xl bg-[#EAF7F0] border border-[#BBE6CF] space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#2E9B66] text-white shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-[#195938]">
                  Send Order Confirmation to Restaurant WhatsApp
                </h4>
                <p className="text-xs text-[#30664B] mt-0.5 leading-relaxed">
                  Click below to open WhatsApp with your complete itemized order, delivery instructions, and payment method ready to send directly to <strong>{RESTAURANT_PHONE}</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] py-2.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-transform active:scale-98 flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Notify Kitchen via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={handleCopyText}
                className="py-2.5 px-3.5 bg-white hover:bg-[#FAF7F2] text-[#2C2420] border border-[#C5DACF] rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2E9B66]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#6B5D55]" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <a
                href={smsUrl}
                className="py-2.5 px-3.5 bg-white hover:bg-[#FAF7F2] text-[#2C2420] border border-[#C5DACF] rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Send SMS</span>
              </a>
            </div>
          </div>

          {/* Delivery & Customer Summary */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DCCF] space-y-2.5 text-xs text-[#554740]">
            <h4 className="font-serif-display font-bold text-sm text-[#2C2420] border-b border-[#F0E6DA] pb-1.5">
              Service & Destination Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-[#8C7A70] block text-[11px]">Customer:</span>
                <span className="font-bold text-[#2C2420]">{customerFullName} ({customerPhone})</span>
              </div>
              <div>
                <span className="text-[#8C7A70] block text-[11px]">Order Type:</span>
                <span className="font-bold text-[#C46D4E]">{orderType}</span>
              </div>
              
              {orderType === 'Delivery' && (
                <>
                  <div>
                    <span className="text-[#8C7A70] block text-[11px]">Neighborhood (Ibagué):</span>
                    <span className="font-semibold text-[#2C2420]">{order.customer?.deliveryNeighborhood || order.deliveryDetails?.neighborhood || 'Ibagué'}</span>
                  </div>
                  <div>
                    <span className="text-[#8C7A70] block text-[11px]">Delivery Address:</span>
                    <span className="font-semibold text-[#2C2420]">{order.customer?.deliveryAddress || order.deliveryDetails?.streetAddress || 'Address on file'}</span>
                  </div>
                </>
              )}

              {orderType === 'Dine In' && (
                <div>
                  <span className="text-[#8C7A70] block text-[11px]">Table / Area:</span>
                  <span className="font-semibold text-[#2C2420]">{order.customer?.tableNumber || order.dineInDetails?.tableNumber || 'Assigned table'}</span>
                </div>
              )}

              <div>
                <span className="text-[#8C7A70] block text-[11px]">Preferred Timing:</span>
                <span className="font-semibold text-[#2C2420]">{order.customer?.preferredTime || 'As soon as possible'}</span>
              </div>

              <div>
                <span className="text-[#8C7A70] block text-[11px]">Payment Method:</span>
                <span className="font-semibold text-[#2C2420]">{order.paymentMethod || 'Mobile Transfer'}</span>
              </div>
            </div>

            {order.customer?.specialDeliveryInstructions && (
              <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#EDE2D5] mt-2">
                <span className="font-bold text-[11px] text-[#4A3E37] block">Delivery Instructions:</span>
                <p className="text-[#6B5D55] italic">{order.customer.specialDeliveryInstructions}</p>
              </div>
            )}
          </div>

          {/* Itemized Order List */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8DCCF] space-y-3">
            <h4 className="font-serif-display font-bold text-sm text-[#2C2420] border-b border-[#F0E6DA] pb-1.5">
              Itemized Kitchen Bill
            </h4>

            <div className="divide-y divide-[#F0E6DA]">
              {order.items.map((item) => (
                <div key={item.id} className="py-2.5 space-y-1">
                  <div className="flex justify-between items-start text-xs sm:text-sm">
                    <span className="font-bold text-[#2C2420]">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-bold text-[#2C2420]">{formatCOP(item.totalPrice)}</span>
                  </div>

                  {item.customization && (
                    <div className="text-[11px] text-[#7A6B62] space-y-0.5 pl-2 border-l-2 border-[#E8DCCF]">
                      {item.customization.selectedToppings?.length > 0 && (
                        <div>
                          + Toppings: {item.customization.selectedToppings.map(t => `${t.name} (+${formatCOP(t.price)})`).join(', ')}
                        </div>
                      )}
                      {item.customization.selectedSauces?.length > 0 && (
                        <div>
                          + Sauces: {item.customization.selectedSauces.map(s => `${s.name} (+${formatCOP(s.price)})`).join(', ')}
                        </div>
                      )}
                      {item.customization.removedIngredients?.length > 0 && (
                        <div className="text-[#B83E2C]">
                          Hold: {item.customization.removedIngredients.join(', ')}
                        </div>
                      )}
                      {item.customization.specialPreparationNote && (
                        <div className="italic text-[#3D332D]">
                          Note: "{item.customization.specialPreparationNote}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-2 border-t border-[#F0E6DA] space-y-1 text-xs">
              <div className="flex justify-between text-[#6B5D55]">
                <span>Subtotal:</span>
                <span>{formatCOP(order.subtotal)}</span>
              </div>

              {discountVal > 0 && (
                <div className="flex justify-between text-[#2E9B66]">
                  <span>Promotional Discount:</span>
                  <span>-{formatCOP(discountVal)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#6B5D55]">
                <span>Delivery Fee:</span>
                <span>{order.deliveryFee === 0 ? 'FREE / $0' : formatCOP(order.deliveryFee)}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#2C2420] pt-2 border-t border-[#E8DCCF]">
                <span>Total Paid / Payable:</span>
                <span className="text-[#C46D4E]">{formatCOP(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Print & Close Buttons */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E8DCCF] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE5D9] text-[#4A3E37] border border-[#D9CABE] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>

            <a
              href={`tel:${RESTAURANT_PHONE}`}
              className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE5D9] text-[#4A3E37] border border-[#D9CABE] text-xs font-semibold flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C46D4E]" />
              <span>Call Kitchen</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2C2420] hover:bg-[#453933] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
};
