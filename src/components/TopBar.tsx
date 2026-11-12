import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TopBarProps {
  variant?: 'landing' | 'registration';
  title?: string;
  stepText?: string;
  onBack?: () => void;
  onNavigateRegister?: () => void;
  onNavigateLogin?: () => void;
  onNavigateHome?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  variant = 'landing',
  title,
  stepText,
  onBack,
  onNavigateRegister,
  onNavigateLogin,
  onNavigateHome,
}) => {
  if (variant === 'landing') {
    return (
      <header className="w-full bg-white border-b border-[#d0d5dd] h-14 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <button
            onClick={onNavigateHome}
            className="font-bold text-[16px] text-[#172033] tracking-tight hover:opacity-80 transition-opacity"
          >
            StayHuB
          </button>
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#344054] font-normal">
            <button onClick={onNavigateHome} className="hover:text-[#172033] transition-colors">Home</button>
            <a href="#about" className="hover:text-[#172033] transition-colors">About</a>
            <a href="#features" className="hover:text-[#172033] transition-colors">Find Houses</a>
            <a href="#contact" className="hover:text-[#172033] transition-colors">Contact</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateRegister}
            className="h-9 px-5 bg-white border border-[#d0d5dd] rounded-lg text-[13px] font-medium text-[#172033] hover:bg-slate-50 transition-colors shadow-xs"
          >
            Register
          </button>
          <button
            onClick={onNavigateLogin}
            className="h-9 px-5 bg-white border border-[#d0d5dd] rounded-lg text-[13px] font-medium text-[#172033] hover:bg-slate-50 transition-colors shadow-xs"
          >
            Login
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white border-b border-[#d0d5dd] h-16 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onNavigateHome}
          className="font-bold text-[16px] text-[#172033] tracking-tight"
        >
          StayHuB
        </button>
        {title && (
          <span className="text-[14px] text-[#344054] font-semibold border-l border-[#d0d5dd] pl-4">
            {title}
          </span>
        )}
        {stepText && (
          <span className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1d4ed8] text-[12px] font-semibold px-2.5 py-1 rounded-full">
            {stepText}
          </span>
        )}
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="h-9 px-4 bg-white border border-[#d0d5dd] rounded-lg text-[13px] font-semibold text-[#172033] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}
    </header>
  );
};
