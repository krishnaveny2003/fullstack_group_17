import React, { useState } from 'react';
import { Search, ShieldCheck, MapPin, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { TopBar } from '../components/TopBar';

interface LandingPageProps {
  onNavigateRegister: () => void;
  onNavigateLogin: () => void;
  onSearch?: (query: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateRegister,
  onNavigateLogin,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      onNavigateRegister();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar
        variant="landing"
        onNavigateRegister={onNavigateRegister}
        onNavigateLogin={onNavigateLogin}
      />

      <main className="flex-1 max-w-[1120px] w-full mx-auto px-6 py-12 flex flex-col justify-center">
        {/* Hero Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-[48px] font-bold text-[#172033] leading-[1.18] tracking-tight">
              Find Your Ideal Boarding<br />Near Your University
            </h1>
            <p className="text-[17px] text-[#667085] leading-relaxed">
              Verified houses. Safe environment. Affordable prices.<br className="hidden sm:inline" />
              A smarter way to find your next home.
            </p>
          </div>

          {/* Search Bar Form (Figma: 2:15) */}
          <form
            onSubmit={handleSearch}
            className="w-full bg-white border border-[#d0d5dd] rounded-lg p-1.5 shadow-sm flex items-center gap-3 transition-shadow focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-600"
          >
            <div className="flex-1 flex items-center gap-3 pl-3">
              <Search className="w-5 h-5 text-[#667085] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by area, property name, price or facilities..."
                className="w-full text-[15px] text-[#172033] placeholder-[#667085] bg-transparent outline-none py-2"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-8 bg-[#2563eb] hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-[15px] rounded-lg transition-colors flex items-center justify-center shrink-0 shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Quick Filter Prompts */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#667085]">
            <span className="font-medium text-[#344054]">Popular searches:</span>
            {['Girls hostel near campus', 'Single rooms with Wi-Fi', 'Under LKR 15,000', 'Attached bathroom'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-md bg-[#f8fafc] border border-[#e2e8f0] hover:bg-slate-100 hover:text-[#172033] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid (Figma: 2:33) */}
        <section id="features" className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#d0d5dd] rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[16px] text-[#172033]">
              Verified owners
            </h3>
            <p className="text-[14px] text-[#475467] leading-[21px] mt-2">
              Explore boarding options from verified owners.
            </p>
          </div>

          <div className="bg-white border border-[#d0d5dd] rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[16px] text-[#172033]">
              Distance calculator
            </h3>
            <p className="text-[14px] text-[#475467] leading-[21px] mt-2">
              Compare distances to your university.
            </p>
          </div>

          <div className="bg-white border border-[#d0d5dd] rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[16px] text-[#172033]">
              AI boarding assistant
            </h3>
            <p className="text-[14px] text-[#475467] leading-[21px] mt-2">
              Ask the AI boarding assistant for help.
            </p>
          </div>

          <div className="bg-white border border-[#d0d5dd] rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[16px] text-[#172033]">
              Price comparison
            </h3>
            <p className="text-[14px] text-[#475467] leading-[21px] mt-2">
              Compare boarding-house prices.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-14 bg-[#f8fafc] border border-[#d0d5dd] rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-[#172033]">Are you a boarding house owner?</h3>
            <p className="text-sm text-[#475467]">List your verified property and connect directly with trusted university students.</p>
          </div>
          <button
            onClick={onNavigateRegister}
            className="px-6 py-3 bg-[#172033] hover:bg-slate-800 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors shrink-0"
          >
            <span>Register as House Owner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d0d5dd] bg-white py-6 text-center text-xs text-[#667085]">
        <p>&copy; 2026 StayHuB - Smart Student Boarding & Rental Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};
