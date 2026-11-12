import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { StudentRegistration } from './pages/registration/StudentRegistration';
import { OwnerRegistration } from './pages/registration/OwnerRegistration';
import { AdminRegistration } from './pages/registration/AdminRegistration';
import type { Role } from './types/auth';

type ViewState = 'LANDING' | 'ROLE_SELECT' | 'STUDENT_REG' | 'OWNER_REG' | 'ADMIN_REG';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');

  const handleRoleSelect = (role: Role) => {
    if (role === 'STUDENT') setCurrentView('STUDENT_REG');
    else if (role === 'OWNER') setCurrentView('OWNER_REG');
    else if (role === 'ADMIN') setCurrentView('ADMIN_REG');
  };

  const handleRegistrationSuccess = (role: string, data: any) => {
    alert(`Registration Successful for ${role}!\nUsername: ${data.username}\nEmail: ${data.email}\nData is ready for Spring Boot API submission.`);
    setCurrentView('LANDING');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#172033] relative">
      {/* Quick Navigation Dev Ribbon (Figma Wireframe Switcher) */}
      <div className="bg-[#172033] text-white text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-400">Figma Wireframes:</span>
          <span className="text-slate-300">StayHuB UI System</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCurrentView('LANDING')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              currentView === 'LANDING' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            01 Landing Page
          </button>
          <button
            onClick={() => setCurrentView('ROLE_SELECT')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              currentView === 'ROLE_SELECT' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            02 Role Selection
          </button>
          <button
            onClick={() => setCurrentView('STUDENT_REG')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              currentView === 'STUDENT_REG' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            03 Student (3 Steps)
          </button>
          <button
            onClick={() => setCurrentView('OWNER_REG')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              currentView === 'OWNER_REG' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            04 Owner (4 Steps)
          </button>
          <button
            onClick={() => setCurrentView('ADMIN_REG')}
            className={`px-2.5 py-1 rounded text-xs transition-colors ${
              currentView === 'ADMIN_REG' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            05 Admin (2 Steps)
          </button>
        </div>
      </div>

      {/* Dynamic Screen View */}
      {currentView === 'LANDING' && (
        <LandingPage
          onNavigateRegister={() => setCurrentView('ROLE_SELECT')}
          onNavigateLogin={() => alert('Login modal / page')}
          onSearch={() => setCurrentView('ROLE_SELECT')}
        />
      )}

      {currentView === 'ROLE_SELECT' && (
        <RoleSelectionPage
          onSelectRole={handleRoleSelect}
          onBack={() => setCurrentView('LANDING')}
        />
      )}

      {currentView === 'STUDENT_REG' && (
        <StudentRegistration
          onBack={() => setCurrentView('ROLE_SELECT')}
          onSuccess={(data) => handleRegistrationSuccess('Student', data)}
        />
      )}

      {currentView === 'OWNER_REG' && (
        <OwnerRegistration
          onBack={() => setCurrentView('ROLE_SELECT')}
          onSuccess={(data) => handleRegistrationSuccess('House Owner', data)}
        />
      )}

      {currentView === 'ADMIN_REG' && (
        <AdminRegistration
          onBack={() => setCurrentView('ROLE_SELECT')}
          onSuccess={(data) => handleRegistrationSuccess('Administrator', data)}
        />
      )}
    </div>
  );
}
