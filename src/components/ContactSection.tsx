import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink, Share2 } from 'lucide-react';
import { RESTAURANT_PHONE, RESTAURANT_PHONE_CLEAN } from '../utils/orderUtils';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#68B8B5] block mb-2">
            Visit & Connect
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#2C2420] tracking-tight mb-3">
            Contact & Location
          </h2>
          <p className="text-sm sm:text-base text-[#6B5D55]">
            We are located in Ibagué, Tolima, Colombia. Drop by for dining, call us directly, or reach out on our social channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details Card (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCF] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Restaurant Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#E88C7D]/15 text-[#C46D4E] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#2C2420]">Physical Location</h4>
                  <p className="text-sm font-semibold text-[#2C2420] mt-0.5">
                    Plazoleta de Calambeo, junto al Mercacentro
                  </p>
                  <span className="text-xs font-semibold text-[#C46D4E] block mt-1">
                    Ibagué, Tolima, Colombia
                  </span>
                </div>
              </div>

              {/* Official Phone Number */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#68B8B5]/15 text-[#2D7D7A] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#2C2420]">Customer & Orders Phone</h4>
                  <p className="text-sm text-[#554740] mt-0.5">
                    Direct line for table reservations and order assistance:
                  </p>
                  <a
                    href={`tel:${RESTAURANT_PHONE}`}
                    className="text-base font-bold text-[#2D7D7A] hover:underline block mt-1"
                  >
                    {RESTAURANT_PHONE}
                  </a>
                </div>
              </div>

              {/* Official Service Hours Recap */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#F6D365]/25 text-[#9E6510] shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-xs sm:text-sm text-[#554740] space-y-1">
                  <h4 className="font-bold text-base text-[#2C2420]">Daily Service Hours</h4>
                  <p>• <strong>Breakfast:</strong> 6:00 AM – 10:00 AM</p>
                  <p>• <strong>Lunch:</strong> 11:30 AM – 2:00 PM</p>
                  <p>• <strong>Afternoon Snacks:</strong> 3:30 PM – 5:00 PM</p>
                  <p className="text-[#8C7A70] text-xs pt-1">
                    *Dinner dishes are featured on the menu for preview; regular dinner service operates upon administrator activation.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media & Direct Messaging Buttons (Required Placeholders) */}
            <div className="pt-6 border-t border-[#E8DCCF]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A70] block mb-3">
                Official Channels & Social Profiles
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${RESTAURANT_PHONE_CLEAN}?text=${encodeURIComponent('Hello Entre Arepas y Ropa Vieja team! I would like to inquire about your restaurant in Ibagué.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#EBF7F2] text-[#1E5C3D] hover:bg-[#D9F2E7] transition-colors text-center"
                >
                  <MessageCircle className="w-5 h-5 mb-1 text-[#2E9B66]" />
                  <span className="font-bold text-xs">WhatsApp</span>
                  <span className="text-[10px] text-[#557F69] mt-0.5">+57 317...</span>
                </a>

                {/* Facebook Placeholder */}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); alert('Facebook account: @entrearepasyropavieja (Official social link placeholder)'); }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF7F2] border border-[#E3D8CC] text-[#4A3E37] hover:border-[#C46D4E] transition-colors text-center"
                  title="Facebook Page (Placeholder configured)"
                >
                  <Share2 className="w-5 h-5 mb-1 text-[#1877F2]" />
                  <span className="font-bold text-xs">Facebook</span>
                  <span className="text-[10px] text-[#8C7A70] mt-0.5">@entrearepas...</span>
                </a>

                {/* Instagram Placeholder */}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); alert('Instagram account: @entrearepasyropavieja (Official social link placeholder)'); }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF7F2] border border-[#E3D8CC] text-[#4A3E37] hover:border-[#C46D4E] transition-colors text-center"
                  title="Instagram Profile (Placeholder configured)"
                >
                  <span className="text-base font-bold mb-0.5 text-[#E1306C]">📸</span>
                  <span className="font-bold text-xs">Instagram</span>
                  <span className="text-[10px] text-[#8C7A70] mt-0.5">@entrearepas...</span>
                </a>

                {/* Gmail / Email Placeholder */}
                <a
                  href="mailto:contact.entrearepas@gmail.com?subject=Inquiry%20Entre%20Arepas%20y%20Ropa%20Vieja"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FAF7F2] border border-[#E3D8CC] text-[#4A3E37] hover:border-[#C46D4E] transition-colors text-center"
                  title="Send an email via Gmail"
                >
                  <Mail className="w-5 h-5 mb-1 text-[#EA4335]" />
                  <span className="font-bold text-xs">Gmail / Email</span>
                  <span className="text-[10px] text-[#8C7A70] mt-0.5">contact@...</span>
                </a>
              </div>
            </div>

          </div>

          {/* Interactive Map & Neighborhood Highlights (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif-display font-bold text-lg text-[#2C2420]">
                  Map & Delivery Zones in Ibagué
                </span>
                <span className="text-xs bg-[#E8F4F3] text-[#2D7D7A] font-semibold px-2.5 py-1 rounded-lg">
                  Plazoleta de Calambeo
                </span>
              </div>

              {/* Styled Interactive Map Visual */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E3D8CC] aspect-16/10 bg-[#FAF4ED] mb-4 shadow-inner">
                {/* Stylized Google Map Frame for Ibagué */}
                <iframe
                  title="Entre Arepas y Ropa Vieja en Plazoleta de Calambeo, Ibagué"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15918.239247656977!2d-75.2472!3d4.4452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c493010b9bf3%3A0x67c29668478d103b!2sCalambeo%2C%20Ibagu%C3%A9%2C%20Tolima!5e0!3m2!1ses!2sco!4v1710000000000!5m2!1ses!2sco"
                  className="w-full h-full border-0 filter contrast-105"
                  loading="lazy"
                />
              </div>

              {/* Delivery Barrios in Ibagué */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE2D5] text-xs text-[#554740] space-y-1.5">
                <strong className="text-[#2C2420] block font-bold">
                  Citywide Delivery Available Across Ibagué:
                </strong>
                <p>
                  We deliver freshly packaged orders across all major neighborhoods in Ibagué: <strong>El Vergel, Cádiz, La Pola, Centro, Piedra Pintada, Belén, Calambeo, Salado, Interlaken, and Santa Helena</strong>.
                </p>
                <p className="text-[#8C7A70] text-[11px] pt-1">
                  Delivery fee: $5,000 COP flat rate. Free delivery on orders over $70,000 COP!
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E8DCCF] flex items-center justify-between text-xs text-[#8C7A70]">
              <span>Entre Arepas y Ropa Vieja • Tolima Gastronomy</span>
              <a
                href={`tel:${RESTAURANT_PHONE}`}
                className="font-bold text-[#C46D4E] hover:underline"
              >
                Call +57 3177423192
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
