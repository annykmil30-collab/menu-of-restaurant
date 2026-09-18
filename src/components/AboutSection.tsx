import React from 'react';
import { Heart, Sparkles, Utensils, Compass, Coffee, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-gradient-to-b from-[#FAF7F2] to-[#FAF4ED] border-b border-[#E8DCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/5 bg-[#FAF4ED]">
              <img
                src="/src/assets/images/hero_fusion_spread_1789756993190.jpg"
                alt="Entre Arepas y Ropa Vieja dining table with Colombian arepas and Cuban ropa vieja"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-semibold text-[#F6D365] tracking-wider block mb-1">
                  Culinary Philosophy
                </span>
                <p className="font-serif-display text-xl font-bold">
                  “Two Cultures, One Table, Endless Flavor.”
                </p>
                <span className="text-xs opacity-90 block mt-1">
                  Rooted in Ibagué, Tolima, Colombia
                </span>
              </div>
            </div>

            {/* Cultural Pairings Box */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-white rounded-2xl border border-[#E8DCCF] shadow-xs">
                <strong className="text-[#C46D4E] block font-bold mb-0.5">Colombian Heritage</strong>
                <p className="text-[#6B5D55]">Golden heirloom corn arepas, slow roasted Tolimense lechón, and Andean herbs.</p>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-[#E8DCCF] shadow-xs">
                <strong className="text-[#2D7D7A] block font-bold mb-0.5">Cuban Tradition</strong>
                <p className="text-[#6B5D55]">Fork-tender braised ropa vieja, citrus garlic mojo criollo, and moros y cristianos.</p>
              </div>
            </div>
          </div>

          {/* Story Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C46D4E] block mb-2">
                Our Story & Origins
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2420] tracking-tight leading-tight">
                Where Colombia and Cuba Share the Same Hearth
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5A4E46] leading-relaxed">
              <strong>Entre Arepas y Ropa Vieja</strong> was born in <strong>Ibagué, Tolima</strong> out of a deep reverence for two of Latin America’s most vibrant culinary cultures. We celebrate the shared maritime soul, tropical warmth, and deep family traditions that unite the kitchens of Colombia and Cuba.
            </p>

            <p className="text-sm sm:text-base text-[#5A4E46] leading-relaxed">
              On one side stands the Colombian arepa—golden, comforting, and griddled with pure Tolimense pride. On the other stands Cuba’s legendary Ropa Vieja—shredded flank steak patiently braised in a rich sofrito of vine tomatoes, sweet peppers, Spanish olives, and garlic. When these two beloved icons meet on a single table, the result is an unforgettable gastronomic harmony.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-[#E8DCCF]">
                <div className="p-2 rounded-xl bg-[#E88C7D]/20 text-[#C46D4E] shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C2420]">Authentic Ingredients</h4>
                  <p className="text-xs text-[#6B5D55] mt-0.5">
                    Real Colombian corn masa, fresh coastal cheeses, authentic Cuban bitter orange, and freshly picked Caribbean herbs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-[#E8DCCF]">
                <div className="p-2 rounded-xl bg-[#68B8B5]/20 text-[#2D7D7A] shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C2420]">Family & Community</h4>
                  <p className="text-xs text-[#6B5D55] mt-0.5">
                    A welcoming sanctuary in Ibagué where neighbors, families, and travelers gather to celebrate genuine hospitality.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F2E8DC] rounded-2xl border border-[#E0D4C5] flex items-center gap-3 text-xs sm:text-sm text-[#4A3E37]">
              <MapPin className="w-5 h-5 text-[#C46D4E] shrink-0" />
              <span>
                Proudly operating in <strong>Ibagué, Tolima, Colombia</strong>. Experience our table in person or have your favorite dishes delivered hot to your doorstep.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
