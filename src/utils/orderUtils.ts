import { Order, ServiceWindow } from '../types';

export const RESTAURANT_PHONE = '+57 3177423192';
export const RESTAURANT_PHONE_CLEAN = '573177423192';

export const SERVICE_WINDOWS: ServiceWindow[] = [
  {
    name: 'Breakfast',
    startTime: '06:00',
    endTime: '10:00',
    displayTime: '6:00 AM – 10:00 AM',
    isActive: true,
  },
  {
    name: 'Lunch',
    startTime: '11:30',
    endTime: '14:00',
    displayTime: '11:30 AM – 2:00 PM',
    isActive: true,
  },
  {
    name: 'Afternoon Snacks',
    startTime: '15:30',
    endTime: '17:00',
    displayTime: '3:30 PM – 5:00 PM',
    isActive: true,
  },
  {
    name: 'Dinner',
    startTime: '18:30',
    endTime: '22:00',
    displayTime: 'Currently Inactive (Admin Special Event Only)',
    isActive: false,
    note: 'Dinner dishes are displayed on the menu for preview & catering inquiries, but the standard daily operating hours do not include a dinner service period unless activated by restaurant administration.',
  },
];

/**
 * Format currency in Colombian Pesos
 */
export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount).replace('COP', '').trim() + ' COP';
}

/**
 * Check if the restaurant is open at a given time
 */
export function getRestaurantStatus(overrideHour?: number, overrideMinute?: number) {
  const now = new Date();
  const currentHour = overrideHour !== undefined ? overrideHour : now.getHours();
  const currentMinute = overrideMinute !== undefined ? overrideMinute : now.getMinutes();
  const currentDecimal = currentHour + currentMinute / 60;

  // Active windows:
  // Breakfast: 6.0 to 10.0
  const isBreakfast = currentDecimal >= 6.0 && currentDecimal < 10.0;
  // Lunch: 11.5 to 14.0
  const isLunch = currentDecimal >= 11.5 && currentDecimal < 14.0;
  // Afternoon Snacks: 15.5 to 17.0
  const isSnacks = currentDecimal >= 15.5 && currentDecimal < 17.0;

  let currentWindow: string | null = null;
  let isOpen = false;

  if (isBreakfast) {
    isOpen = true;
    currentWindow = 'Breakfast (6:00 AM – 10:00 AM)';
  } else if (isLunch) {
    isOpen = true;
    currentWindow = 'Lunch (11:30 AM – 2:00 PM)';
  } else if (isSnacks) {
    isOpen = true;
    currentWindow = 'Afternoon Snacks (3:30 PM – 5:00 PM)';
  }

  // Next upcoming window
  let nextWindow = 'Tomorrow at 6:00 AM (Breakfast)';
  if (currentDecimal < 6.0) {
    nextWindow = 'Today at 6:00 AM (Breakfast)';
  } else if (currentDecimal < 11.5) {
    nextWindow = 'Today at 11:30 AM (Lunch)';
  } else if (currentDecimal < 15.5) {
    nextWindow = 'Today at 3:30 PM (Afternoon Snacks)';
  }

  return {
    isOpen,
    currentWindow,
    nextWindow,
    currentTimeString: `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
  };
}

/**
 * Generates unique order number: EARV-YYYYMMDD-XXX
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(100 + Math.random() * 900); // 3 digits e.g. 001-999
  return `EARV-${year}${month}${day}-${randomSuffix}`;
}

/**
 * Format complete order notification payload for WhatsApp and SMS integration
 */
export function buildOrderNotificationText(order: Order): string {
  const lines: string[] = [];

  lines.push(`🌴 *ENTRE AREPAS Y ROPA VIEJA* — NEW ORDER NOTIFICATION`);
  lines.push(`================================`);
  lines.push(`ORDER NUMBER: ${order.orderNumber}`);
  lines.push(`DATE AND TIME: ${order.timestamp}`);
  lines.push(`CUSTOMER NAME: ${order.customerName}`);
  lines.push(`CUSTOMER PHONE: ${order.customerPhone}`);
  lines.push(`ORDER TYPE: ${order.orderType}`);

  if (order.orderType === 'Delivery' && order.deliveryDetails) {
    const d = order.deliveryDetails;
    lines.push(`DELIVERY ADDRESS: ${d.streetAddress}, Apt/House ${d.aptHouseNumber}, Barrio ${d.neighborhood}, ${d.city}`);
    if (d.deliveryInstructions) {
      lines.push(`ADDRESS INSTRUCTIONS: ${d.deliveryInstructions}`);
    }
    lines.push(`REQUESTED TIME: ${d.timingType === 'As soon as possible' ? 'As soon as possible (Within active window)' : d.scheduledTime}`);
  } else if (order.orderType === 'Dine In' && order.dineInDetails) {
    const di = order.dineInDetails;
    lines.push(`TABLE NUMBER: ${di.tableNumber || 'To be assigned upon arrival'}`);
    lines.push(`REQUESTED TIME: ${di.timingType === 'As soon as possible' ? 'Immediate arrival' : di.scheduledTime}`);
  } else if (order.orderType === 'Take Away' && order.takeAwayDetails) {
    const ta = order.takeAwayDetails;
    lines.push(`PICKUP TIME: ${ta.timingType === 'As soon as possible' ? 'As soon as ready' : ta.scheduledTime}`);
  }

  lines.push(`--------------------------------`);
  lines.push(`PRODUCTS ORDERED:`);
  order.items.forEach((item, idx) => {
    lines.push(`\n[#${idx + 1}] ${item.quantity}x ${item.product.name} — ${formatCOP(item.itemTotalPrice)}`);
    if (item.customization) {
      const cust = item.customization;
      if (cust.selectedToppings.length > 0) {
        lines.push(`   • TOPPINGS: ${cust.selectedToppings.map(t => `${t.name} (+${formatCOP(t.price)})`).join(', ')}`);
      }
      if (cust.selectedSauces.length > 0) {
        lines.push(`   • SAUCES: ${cust.selectedSauces.map(s => `${s.name} (+${formatCOP(s.price)})`).join(', ')}`);
      }
      if (cust.removedIngredients.length > 0) {
        lines.push(`   • REMOVE: ${cust.removedIngredients.join(', ')}`);
      }
      if (cust.specialPreparationNote) {
        lines.push(`   • PREP NOTE: ${cust.specialPreparationNote}`);
      }
      if (cust.allergyNotice) {
        lines.push(`   • ALLERGY NOTICE: ${cust.allergyNotice}`);
      }
    }
  });

  lines.push(`\n--------------------------------`);
  lines.push(`SPECIAL REQUESTS: ${order.specialRequests || 'None provided'}`);
  lines.push(`ALLERGIES: ${order.allergies || 'No specific food allergies stated'}`);
  lines.push(`--------------------------------`);
  lines.push(`SUBTOTAL: ${formatCOP(order.subtotal)}`);
  if ((order.customizationTotal ?? 0) > 0) {
    lines.push(`CUSTOMIZATIONS: ${formatCOP(order.customizationTotal ?? 0)}`);
  }
  if (order.deliveryFee > 0) {
    lines.push(`DELIVERY FEE: ${formatCOP(order.deliveryFee)}`);
  }
  if ((order.discount ?? 0) > 0) {
    lines.push(`DISCOUNT (${order.promoCodeApplied || 'Promotion'}): -${formatCOP(order.discount ?? 0)}`);
  }
  lines.push(`TOTAL: ${formatCOP(order.total)}`);
  lines.push(`================================`);
  lines.push(`Restaurant Phone: ${RESTAURANT_PHONE}`);
  lines.push(`Location: Plazoleta de Calambeo, junto al Mercacentro, Ibagué, Tolima, Colombia`);

  return lines.join('\n');
}

/**
 * Returns a direct WhatsApp click-to-chat URL with pre-filled message
 */
export function getWhatsAppOrderUrl(order: Order): string {
  const text = buildOrderNotificationText(order);
  return `https://wa.me/${RESTAURANT_PHONE_CLEAN}?text=${encodeURIComponent(text)}`;
}

/**
 * Returns an SMS URI with pre-filled body
 */
export function getSMSOrderUrl(order: Order): string {
  const text = buildOrderNotificationText(order);
  return `sms:${RESTAURANT_PHONE}?body=${encodeURIComponent(text)}`;
}
