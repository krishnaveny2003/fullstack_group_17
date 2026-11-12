import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShieldAlert } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import type { AdminRegistrationData } from '../../types/auth';

interface AdminRegistrationProps {
  onBack: () => void;
  onSuccess: (data: AdminRegistrationData) => void;
}

export const AdminRegistration: React.FC<AdminRegistrationProps> = ({
  onBack,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState<AdminRegistrationData>({
    fullName: '',
    gender: 'MALE',
    phoneNumber: '',
    dateOfBirth: '',
    homeAddress: '',
    contactNumber: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const updateField = (field: keyof AdminRegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (!formData.termsAccepted) {
        alert('Please agree to the Terms & Conditions before completing registration.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      onSuccess(formData);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar
        variant="registration"
        title="Admin Registration | Authorized administrators only"
        stepText={`Step ${step} of 2`}
        onBack={handlePrev}
      />

      <main className="flex-1 max-w-[1080px] w-full mx-auto px-6 py-8">
        {/* Security Notice */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-amber-800 text-xs font-medium">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Restricted Portal: Administrator registrations require internal security authorization and platform key verification.</span>
        </div>

        {/* Progress Stepper (Figma: 62:595) */}
        <div className="mb-8 bg-white border border-[#d0d5dd] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            {/* Step 1 */}
            <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-colors ${
              step === 1
                ? 'bg-[#172033] border-[#172033] text-white'
                : 'bg-slate-100 border-slate-300 text-[#172033]'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 1 ? 'bg-white text-[#172033]' : 'bg-[#172033] text-white'
              }`}>
                {step > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
              </div>
              <span className="text-[13px] font-semibold whitespace-nowrap">Personal Details</span>
            </div>

            <div className={`flex-1 h-[2px] rounded-full transition-colors ${step >= 2 ? 'bg-[#172033]' : 'bg-[#d0d5dd]'}`} />

            {/* Step 2 */}
            <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-colors ${
              step === 2
                ? 'bg-[#172033] border-[#172033] text-white'
                : 'bg-white border-[#d0d5dd] text-[#667085]'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 2 ? 'bg-white text-[#172033]' : 'bg-slate-100 text-[#667085]'
              }`}>
                2
              </div>
              <span className="text-[13px] font-semibold whitespace-nowrap">Account Setup</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#d0d5dd] rounded-xl p-8 shadow-sm">
          {/* STEP 1: PERSONAL DETAILS (Figma: 31:255) */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-[#f1f5f9] pb-4">
                <h2 className="text-[20px] font-bold text-[#344054]">Personal Information</h2>
                <p className="text-[13px] text-[#475467]">
                  Enter your official staff identification details.
                </p>
              </div>

              {/* Row 1: Full Name & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => updateField('gender', 'MALE')}
                      className={`flex-1 h-11 px-4 border rounded-lg flex items-center gap-3 transition-colors ${
                        formData.gender === 'MALE'
                          ? 'border-[#172033] bg-slate-100 text-[#172033]'
                          : 'border-[#d0d5dd] bg-[#f9fafb] text-[#344054]'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.gender === 'MALE' ? 'border-[#172033]' : 'border-[#98a2b3]'
                      }`}>
                        {formData.gender === 'MALE' && <span className="w-2 h-2 rounded-full bg-[#172033]" />}
                      </span>
                      <span className="text-[14px] font-bold">Male</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateField('gender', 'FEMALE')}
                      className={`flex-1 h-11 px-4 border rounded-lg flex items-center gap-3 transition-colors ${
                        formData.gender === 'FEMALE'
                          ? 'border-[#172033] bg-slate-100 text-[#172033]'
                          : 'border-[#d0d5dd] bg-[#f9fafb] text-[#344054]'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.gender === 'FEMALE' ? 'border-[#172033]' : 'border-[#98a2b3]'
                      }`}>
                        {formData.gender === 'FEMALE' && <span className="w-2 h-2 rounded-full bg-[#172033]" />}
                      </span>
                      <span className="text-[14px] font-bold">Female</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Date of Birth */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => updateField('phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>
              </div>

              {/* Row 3: Address & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    Home Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.homeAddress}
                    onChange={(e) => updateField('homeAddress', e.target.value)}
                    placeholder="Enter residential address"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    Official Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => updateField('contactNumber', e.target.value)}
                    placeholder="Enter office / mobile contact"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ACCOUNT SETUP (Figma: 31:292) */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-[#f1f5f9] pb-4">
                <h2 className="text-[20px] font-bold text-[#344054]">Account Setup</h2>
                <p className="text-[13px] text-[#475467]">
                  Create administrator credentials for system operations.
                </p>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="block text-[14px] font-bold text-[#344054]">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => updateField('username', e.target.value)}
                  placeholder="Enter administrator username"
                  className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-[14px] font-bold text-[#344054]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Enter official email"
                  className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                />
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Enter password"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="Confirm password"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="admin-terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => updateField('termsAccepted', e.target.checked)}
                  className="w-5 h-5 rounded border-[#d0d5dd] text-[#172033] focus:ring-[#172033] mt-0.5 cursor-pointer"
                />
                <label htmlFor="admin-terms" className="text-[14px] text-[#344054] font-medium cursor-pointer">
                  I agree to the <span className="underline font-bold">Terms &amp; Conditions</span> and administrative privacy policies.
                </label>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="mt-8 pt-6 border-t border-[#f1f5f9] flex items-center justify-between">
            <span className="text-[12px] text-[#475467]">
              Step {step} of 2
            </span>

            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="h-11 px-6 bg-white border border-[#d0d5dd] hover:bg-slate-50 text-[14px] font-bold text-[#172033] rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="h-11 px-7 bg-[#172033] hover:bg-slate-800 active:bg-black text-[14px] font-bold text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>{step === 2 ? 'Create Account' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
