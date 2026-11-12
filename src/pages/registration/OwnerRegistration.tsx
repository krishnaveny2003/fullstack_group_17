import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, FileText, Image, ChevronDown, ShieldCheck, X } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import type { OwnerRegistrationData } from '../../types/auth';

interface OwnerRegistrationProps {
  onBack: () => void;
  onSuccess: (data: OwnerRegistrationData) => void;
}

export const OwnerRegistration: React.FC<OwnerRegistrationProps> = ({
  onBack,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [formData, setFormData] = useState<OwnerRegistrationData>({
    fullName: '',
    gender: 'MALE',
    phoneNumber: '',
    nicNumber: '',
    dateOfBirth: '',
    homeAddress: '',
    propertyName: '',
    propertyType: 'HOUSE',
    address: '',
    city: '',
    distanceFromUniversity: '',
    description: '',
    nicDoc: null,
    propertyDeedDoc: null,
    electricityBillDoc: null,
    propertyImages: [],
    propertyDocConsent: false,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [docNames, setDocNames] = useState<{ [key: string]: string }>({});
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  const updateField = (field: keyof OwnerRegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      if (step === 3 && !formData.propertyDocConsent) {
        alert('Please understand and consent to the property document verification policy before continuing.');
        return;
      }
      setStep((prev) => (prev + 1) as 2 | 3 | 4);
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
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const handleFileUpload = (key: 'nicDoc' | 'propertyDeedDoc' | 'electricityBillDoc', file: File | null) => {
    if (file) {
      setFormData((prev) => ({ ...prev, [key]: file }));
      setDocNames((prev) => ({ ...prev, [key]: file.name }));
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar
        variant="registration"
        title="Owner Registration"
        stepText={`Step ${step} of 4`}
        onBack={handlePrev}
      />

      <main className="flex-1 max-w-[1080px] w-full mx-auto px-6 py-8">
        {/* Progress Stepper (Figma: 62:198) */}
        <div className="mb-8 bg-white border border-[#d0d5dd] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            {[
              { num: 1, label: 'Personal Details' },
              { num: 2, label: 'Property Info' },
              { num: 3, label: 'Documents' },
              { num: 4, label: 'Account Setup' },
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-colors ${
                  step === s.num
                    ? 'bg-[#172033] border-[#172033] text-white'
                    : step > s.num
                    ? 'bg-slate-100 border-slate-300 text-[#172033]'
                    : 'bg-white border-[#d0d5dd] text-[#667085]'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s.num
                      ? 'bg-white text-[#172033]'
                      : step > s.num
                      ? 'bg-[#172033] text-white'
                      : 'bg-slate-100 text-[#667085]'
                  }`}>
                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span className="text-[13px] font-semibold whitespace-nowrap">{s.label}</span>
                </div>

                {idx < 3 && (
                  <div className={`flex-1 h-[2px] rounded-full transition-colors ${step > s.num ? 'bg-[#172033]' : 'bg-[#d0d5dd]'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#d0d5dd] rounded-xl p-8 shadow-sm">
          {/* STEP 1: PERSONAL DETAILS (Figma: 28:57) */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-[#f1f5f9] pb-4">
                <h2 className="text-[20px] font-bold text-[#172033]">Personal Information</h2>
                <p className="text-[13px] text-[#475467]">
                  Enter your legal personal details as the boarding property owner.
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

              {/* Row 2: Phone & NIC */}
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
                    placeholder="Enter contact number"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    NIC Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nicNumber}
                    onChange={(e) => updateField('nicNumber', e.target.value)}
                    placeholder="e.g. 198429104821"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>
              </div>

              {/* Row 3: Date of Birth & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#344054]">
                    Home Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.homeAddress}
                    onChange={(e) => updateField('homeAddress', e.target.value)}
                    placeholder="Enter owner permanent address"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PROPERTY INFO (Figma: 29:94) */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-[#f1f5f9] pb-4">
                <h2 className="text-[20px] font-bold text-[#172033]">Property Information</h2>
                <p className="text-[13px] text-[#475467]">
                  Provide the details of your main boarding house or rental property.
                </p>
              </div>

              {/* Row 1: Property Name & Type */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Property Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.propertyName}
                    onChange={(e) => updateField('propertyName', e.target.value)}
                    placeholder="e.g. Lotus Villa Boarding"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>

                <div className="md:col-span-7 space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.propertyType}
                      onChange={(e) => updateField('propertyType', e.target.value as any)}
                      className="w-full h-11 px-3.5 pr-10 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] appearance-none focus:outline-none focus:border-[#172033]"
                    >
                      <option value="HOUSE">House / Full Villa</option>
                      <option value="ROOM">Single Room / Double Room</option>
                      <option value="ANNEX">Independent Annex</option>
                      <option value="APARTMENT">Apartment Unit</option>
                      <option value="HOSTEL">Student Hostel Complex</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2: Address */}
              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#344054]">
                  Property Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Street address of the boarding property"
                  className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                />
              </div>

              {/* Row 3: City & Distance */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    City / District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="e.g. Colombo 07"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>

                <div className="md:col-span-7 space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Distance from University (Estimated) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.distanceFromUniversity}
                    onChange={(e) => updateField('distanceFromUniversity', e.target.value)}
                    placeholder="e.g. 0.8 km (approx. 10 mins walk to Main Gate)"
                    className="w-full h-11 px-3.5 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                  />
                </div>
              </div>

              {/* Row 4: Description */}
              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#344054]">
                  Property Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe your rooms, bed arrangements, amenities (Wi-Fi, water, security), and house rules..."
                  className="w-full p-3 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] focus:outline-none focus:border-[#172033]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENTS (Figma: 29:133) */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-[#f1f5f9] pb-4">
                <h2 className="text-[20px] font-bold text-[#172033]">Upload Documents</h2>
                <p className="text-[14px] text-[#344054]">
                  Please upload clear and valid documents for verification.<br />
                  <span className="text-[13px] text-[#667085]">Only PDF, JPG, or PNG files are accepted.</span>
                </p>
              </div>

              <div className="space-y-5">
                {/* Document 1: NIC */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#344054]">National Identity Card (NIC)</h3>
                    <p className="text-[12px] text-[#667085]">Clear front &amp; back scan of owner's identity card.</p>
                  </div>
                  <label className="h-10 px-5 bg-white hover:bg-slate-50 border border-[#d0d5dd] rounded-lg text-[13px] font-bold text-[#344054] cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0">
                    <FileText className="w-4 h-4 text-[#172033]" />
                    <span>{docNames['nicDoc'] ? docNames['nicDoc'] : 'Choose File'}</span>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) => handleFileUpload('nicDoc', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Document 2: Property Document Verification (Deed) */}
                <div className="p-5 bg-[#f9fafb] border border-[#d0d5dd] rounded-xl space-y-4 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-[#e4e7ec]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-bold text-[#172033]">Property document verification</h3>
                        <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Required</span>
                      </div>
                      <p className="text-[13px] text-[#344054]">
                        We request your property deed to verify that you own the property or have legal authorization to rent it.
                      </p>
                      <p className="text-[12px] text-[#667085]">
                        Title deed copy or lease authorization agreement.
                      </p>
                    </div>

                    <label className="h-10 px-5 bg-white hover:bg-slate-50 border border-[#d0d5dd] rounded-lg text-[13px] font-bold text-[#344054] cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <span>{docNames['propertyDeedDoc'] ? docNames['propertyDeedDoc'] : 'Choose File'}</span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileUpload('propertyDeedDoc', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Document Privacy Notice */}
                  <div className="p-4 bg-white border border-[#e4e7ec] rounded-lg space-y-2.5">
                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#172033]">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Your document privacy</span>
                    </div>
                    <ul className="space-y-1.5 text-[12px] text-[#475467] list-disc list-inside">
                      <li>Only authorized verification administrators can access your document.</li>
                      <li>Your document will not be visible to students or other property owners.</li>
                      <li>Documents are stored securely and accessed through controlled permissions.</li>
                      <li>Documents are retained only for the stated verification and legal requirements.</li>
                    </ul>
                    <p className="text-[12px] text-[#667085] pt-0.5">
                      Please read our{' '}
                      <button
                        type="button"
                        onClick={() => setShowPrivacyModal(true)}
                        className="text-blue-600 underline font-semibold hover:text-blue-700 cursor-pointer"
                      >
                        Privacy Policy
                      </button>{' '}
                      before uploading.
                    </p>
                  </div>

                  {/* Consent Checkbox Option */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="propertyDocConsent"
                      checked={formData.propertyDocConsent}
                      onChange={(e) => updateField('propertyDocConsent', e.target.checked)}
                      className="w-4 h-4 rounded border-[#d0d5dd] text-[#172033] focus:ring-[#172033] mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="propertyDocConsent" className="text-[13px] text-[#344054] font-medium cursor-pointer">
                      I understand and consent to the collection and processing of my property documents for verification.
                    </label>
                  </div>
                </div>

                {/* Document 3: Electricity Bill (Core SRS Verification Evidence) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#172033] flex items-center gap-2">
                      <span>Electricity Bill</span>
                      <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Required</span>
                    </h3>
                    <p className="text-[12px] text-[#475467]">Recent utility bill showing owner name and matching address.</p>
                  </div>
                  <label className="h-10 px-5 bg-white hover:bg-slate-50 border border-emerald-300 rounded-lg text-[13px] font-bold text-[#172033] cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span>{docNames['electricityBillDoc'] ? docNames['electricityBillDoc'] : 'Choose File'}</span>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) => handleFileUpload('electricityBillDoc', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Document 4: Property Images */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#f9fafb] border border-[#d0d5dd] rounded-lg">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#344054]">Property Photographs</h3>
                    <p className="text-[12px] text-[#667085]">Exterior, rooms, and bathroom photos for student listing.</p>
                  </div>
                  <label className="h-10 px-5 bg-white hover:bg-slate-50 border border-[#d0d5dd] rounded-lg text-[13px] font-bold text-[#344054] cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0">
                    <Image className="w-4 h-4 text-[#172033]" />
                    <span>Choose Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ACCOUNT SETUP (Figma: 31:221) */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-[#f1f5f9] pb-4">
                <h2 className="text-[20px] font-bold text-[#172033]">Account Setup</h2>
                <p className="text-[13px] text-[#475467]">
                  Create login credentials to access your house owner dashboard.
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
                  placeholder="Enter a username"
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
                  placeholder="Enter email address"
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
                    placeholder="Enter a password"
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
                  id="owner-terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => updateField('termsAccepted', e.target.checked)}
                  className="w-5 h-5 rounded border-[#d0d5dd] text-[#172033] focus:ring-[#172033] mt-0.5 cursor-pointer"
                />
                <label htmlFor="owner-terms" className="text-[14px] text-[#344054] font-medium cursor-pointer">
                  I agree to the <span className="underline font-bold">Terms &amp; Conditions</span> and verify all provided property documents are accurate.
                </label>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="mt-8 pt-6 border-t border-[#f1f5f9] flex items-center justify-between">
            <span className="text-[12px] text-[#475467]">
              Step {step} of 4
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
                <span>{step === 4 ? 'Create Account' : step === 3 ? 'Continue' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-[#172033]">Property Document Privacy Policy</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-[13px] text-[#475467] leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p>
                We are committed to safeguarding the privacy and security of your property documents. All ownership verification documents submitted through this platform are handled with the highest standards of confidentiality.
              </p>
              <h4 className="font-bold text-[#172033] pt-1">Document Privacy Standards:</h4>
              <ul className="list-disc list-inside space-y-1.5 pl-1 text-[13px]">
                <li><strong>Controlled Access:</strong> Only authorized verification administrators can access your document.</li>
                <li><strong>Strict Privacy:</strong> Your document will not be visible to students or other property owners.</li>
                <li><strong>Secure Storage:</strong> Documents are stored securely and accessed through controlled permissions.</li>
                <li><strong>Retention Limitation:</strong> Documents are retained only for the stated verification and legal requirements.</li>
              </ul>
              <p className="text-[12px] text-[#667085] pt-1">
                By uploading your property deed, you confirm that you have legal ownership or authorization to list and rent the property.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2.5 bg-[#172033] hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
