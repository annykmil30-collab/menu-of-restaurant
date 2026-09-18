import React, { useState } from 'react';
import { Lightbulb, Send, Check, MessageSquareHeart } from 'lucide-react';
import { CustomerSuggestion } from '../types';

interface SuggestionsSectionProps {
  onSubmitSuggestion: (suggestion: Omit<CustomerSuggestion, 'id' | 'date'>) => void;
}

export const SuggestionsSection: React.FC<SuggestionsSectionProps> = ({ onSubmitSuggestion }) => {
  const [category, setCategory] = useState<CustomerSuggestion['category']>('Food');
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories: CustomerSuggestion['category'][] = [
    'Food',
    'Service',
    'Restaurant',
    'Website',
    'New dishes',
    'New drinks',
    'Other ideas',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    onSubmitSuggestion({
      category,
      name: name.trim() || 'Valued Guest',
      emailOrPhone: emailOrPhone.trim() || 'Not provided',
      suggestion: suggestion.trim(),
    });

    setSuggestion('');
    setName('');
    setEmailOrPhone('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="suggestions" className="py-12 sm:py-16 bg-[#FAF7F2] border-b border-[#E8DCCF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DCCF] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-2xl bg-[#68B8B5]/20 text-[#2D7D7A]">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#68B8B5]">
                Your Voice Matters
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C2420]">
                Help Us Improve
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#635750] leading-relaxed mb-6">
            At Entre Arepas y Ropa Vieja, our menu and hospitality evolve through your ideas. Whether you have a suggestion for a new Colombian-Cuban fusion recipe, an idea for our drinks, or feedback about service in Ibagué, we read every message.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Category Selector Pills */}
            <div>
              <label className="block text-xs font-bold text-[#3D332D] mb-2">
                What would you like to suggest about?
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      category === cat
                        ? 'bg-[#C46D4E] text-white shadow-xs'
                        : 'bg-[#FAF7F2] border border-[#DDD3C7] text-[#554740] hover:border-[#C46D4E]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E37] mb-1">
                  Your Name (Optional):
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mateo Hernández"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E37] mb-1">
                  Phone or Email (Optional):
                </label>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="e.g. mateo@gmail.com or 317..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Suggestion Text */}
            <div>
              <label className="block text-xs font-semibold text-[#4A3E37] mb-1">
                Your Suggestion / Idea:
              </label>
              <textarea
                required
                rows={3}
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Tell us what you'd love to see on our table, how we can make our ordering easier, or your favorite culinary wish..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D9CABE] bg-[#FAF7F2] text-[#2C2420] focus:ring-2 focus:ring-[#C46D4E] focus:outline-hidden"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2D7D7A] hover:bg-[#205E5B] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Suggestion</span>
              </button>
            </div>

            {submitted && (
              <div className="p-3.5 bg-[#EBF7F2] text-[#1E5C3D] border border-[#BDE5D3] rounded-xl text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-[#2E9B66]" />
                <span>Thank you! Your suggestion has been received by the Entre Arepas y Ropa Vieja team in Ibagué.</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
};
