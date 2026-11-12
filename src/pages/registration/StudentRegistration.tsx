import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Upload, ChevronDown } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import type { StudentRegistrationData } from '../../types/auth';

interface StudentRegistrationProps {
  onBack: () => void;
  onSuccess: (data: StudentRegistrationData) => void;
}

export const StudentRegistration: React.FC<StudentRegistrationProps> = ({
  onBack,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState<StudentRegistrationData>({
    fullName: '',
    gender: 'MALE',
    phoneNumber: '',
    dateOfBirth: '',
    homeAddress: '',
    contactNumber: '',
    studentId: '',
    universityName: 'University of Colombo',
    faculty: '',
    degreeProgram: '',
    academicYear: '',
    idPhoto: null,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [idPhotoName, setIdPhotoName] = useState<string>('');

  const updateField = (field: keyof StudentRegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as 2 | 3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Validate and submit
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
      setStep((prev) => (prev - 1) as 1 | 2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, idPhoto: file }));
      setIdPhotoName(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <TopBar
        variant="registration"
        title="Student Registration"
        stepText={`Step ${step} of 3`}
        onBack={handlePrev}
      />

      <main className="flex-1 max-w-[1080px] w-full mx-auto px-6 py-8">
        {/* Progress Stepper (Figma: 62:303) */}
        <div className="mb-8 bg-white border border-[#d0d5dd] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            {/* Step 1 */}
            <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-colors ${
              step === 1
                ? 'bg-[#eff6ff] border-[#bfdbfe] text-[#1d4ed8]'
                : step > 1
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-white border-[#d0d5dd] text-[#475467]'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 1
                  ? 'bg-[#2563eb] text-white'
                  : step > 1
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#f8fafc] border border-[#d0d5dd] text-[#475467]'
              }`}>
                {step > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
              </div>
              <span className="text-[13px] font-semibold whitespace-nowrap">Personal Details</span>
            </div>

            <div className={`flex-1 h-[2px] rounded-full transition-colors ${step >= 2 ? 'bg-[#2563eb]' : 'bg-[#d0d5dd]'}`} />

            {/* Step 2 */}
            <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-colors ${
              step === 2
                ? 'bg-[#eff6ff] border-[#bfdbfe] text-[#1d4ed8]'
                : step > 2
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-white border-[#d0d5dd] text-[#475467]'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 2
                  ? 'bg-[#2563eb] text-white'
                  : step > 2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#f8fafc] border border-[#d0d5dd] text-[#475467]'
              }`}>
                {step > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
              </div>
              <span className="text-[13px] font-semibold whitespace-nowrap">Academic Details</span>
            </div>

            <div className={`flex-1 h-[2px] rounded-full transition-colors ${step >= 3 ? 'bg-[#2563eb]' : 'bg-[#d0d5dd]'}`} />

            {/* Step 3 */}
            <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-colors ${
              step === 3
                ? 'bg-[#eff6ff] border-[#bfdbfe] text-[#1d4ed8]'
                : 'bg-white border-[#d0d5dd] text-[#475467]'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 3
                  ? 'bg-[#2563eb] text-white'
                  : 'bg-[#f8fafc] border border-[#d0d5dd] text-[#475467]'
              }`}>
                3
              </div>
              <span className="text-[13px] font-semibold whitespace-nowrap">Account Setup</span>
            </div>
          </div>
        </div>

        {/* Form Container (Figma: 62:325) */}
        <div className="bg-white border border-[#d0d5dd] rounded-xl p-8 shadow-sm">
          {/* STEP 1: PERSONAL DETAILS */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-[#f1f5f9] pb-4">
                <h2 className="text-[20px] font-bold text-[#172033]">Personal Information</h2>
                <p className="text-[13px] text-[#475467]">
                  Enter your personal details to continue your student registration.
                </p>
              </div>

              {/* Row 1: Full Name & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => updateField('gender', 'MALE')}
                      className={`flex-1 h-11 px-4 border rounded-lg flex items-center gap-3 transition-colors ${
                        formData.gender === 'MALE'
                          ? 'border-blue-600 bg-blue-50/50 text-[#172033]'
                          : 'border-[#d0d5dd] bg-white text-[#344054] hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.gender === 'MALE' ? 'border-blue-600' : 'border-[#98a2b3]'
                      }`}>
                        {formData.gender === 'MALE' && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                      </span>
                      <span className="text-[14px] font-semibold">Male</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateField('gender', 'FEMALE')}
                      className={`flex-1 h-11 px-4 border rounded-lg flex items-center gap-3 transition-colors ${
                        formData.gender === 'FEMALE'
                          ? 'border-pink-600 bg-pink-50/50 text-[#172033]'
                          : 'border-[#d0d5dd] bg-white text-[#344054] hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.gender === 'FEMALE' ? 'border-pink-600' : 'border-[#98a2b3]'
                      }`}>
                        {formData.gender === 'FEMALE' && <span className="w-2 h-2 rounded-full bg-pink-600" />}
                      </span>
                      <span className="text-[14px] font-semibold">Female</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Date of Birth */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => updateField('phoneNumber', e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField('dateOfBirth', e.target.value)}
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Row 3: Address & Contact Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Home Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.homeAddress}
                    onChange={(e) => updateField('homeAddress', e.target.value)}
                    placeholder="Enter your home address"
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Emergency Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => updateField('contactNumber', e.target.value)}
                    placeholder="Enter a contact number"
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ACADEMIC DETAILS */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-[#f1f5f9] pb-4">
                <h2 className="text-[20px] font-bold text-[#172033]">Academic Information</h2>
                <p className="text-[13px] text-[#475467]">
                  Enter your academic details to continue your student registration.
                </p>
              </div>

              {/* Row 1: Student ID & Faculty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#172033]">
                    Student ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => updateField('studentId', e.target.value)}
                    placeholder="e.g. IT22948210"
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#172033]">
                    Faculty <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.faculty}
                      onChange={(e) => updateField('faculty', e.target.value)}
                      className="w-full h-11 px-3.5 pr-10 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] appearance-none focus:outline-none focus:border-blue-600"
                    >
                      <option value="">Select faculty</option>
                      <option value="Faculty of Computing & Technology">Faculty of Computing & Technology</option>
                      <option value="Faculty of Science">Faculty of Science</option>
                      <option value="Faculty of Engineering">Faculty of Engineering</option>
                      <option value="Faculty of Management">Faculty of Management</option>
                      <option value="Faculty of Medicine">Faculty of Medicine</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2: Degree Program & Academic Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#172033]">
                    Degree Program <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.degreeProgram}
                      onChange={(e) => updateField('degreeProgram', e.target.value)}
                      className="w-full h-11 px-3.5 pr-10 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] appearance-none focus:outline-none focus:border-blue-600"
                    >
                      <option value="">Select degree program</option>
                      <option value="BSc (Hons) in Information Technology">BSc (Hons) in Information Technology</option>
                      <option value="BSc (Hons) in Software Engineering">BSc (Hons) in Software Engineering</option>
                      <option value="BSc (Hons) in Computer Science">BSc (Hons) in Computer Science</option>
                      <option value="BSc in Physical Science">BSc in Physical Science</option>
                      <option value="Bachelor of Business Administration">Bachelor of Business Administration</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-bold text-[#172033]">
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.academicYear}
                      onChange={(e) => updateField('academicYear', e.target.value)}
                      className="w-full h-11 px-3.5 pr-10 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] appearance-none focus:outline-none focus:border-blue-600"
                    >
                      <option value="">Select academic year</option>
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: ID Photo Upload (Figma: 62:400) */}
              <div className="space-y-2">
                <label className="block text-[14px] font-bold text-[#172033]">
                  University ID Photo <span className="text-red-500">*</span>
                </label>
                <label className="bg-white border-2 border-dashed border-[#d0d5dd] hover:border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <Upload className="w-6 h-6 text-[#2563eb] mb-2" />
                  <span className="text-[14px] font-semibold text-[#172033]">
                    {idPhotoName ? idPhotoName : 'Upload ID photo'}
                  </span>
                  <span className="text-[12px] text-[#64748b] mt-0.5">
                    Browse or drag and drop your student ID photo (JPG, PNG)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: ACCOUNT SETUP */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-[#f1f5f9] pb-4">
                <h2 className="text-[20px] font-bold text-[#172033]">Account Setup</h2>
                <p className="text-[13px] text-[#475467]">
                  Create your account details to complete your student registration.
                </p>
              </div>

              {/* Row 1: Username & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => updateField('username', e.target.value)}
                    placeholder="Enter a username"
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="Enter your university email address"
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Row 2: Password & Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Enter a secure password"
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#344054]">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full h-11 px-3.5 bg-white border border-[#d0d5dd] rounded-lg text-[14px] text-[#172033] placeholder-[#667085] focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Terms & Conditions (Figma: 62:499) */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => updateField('termsAccepted', e.target.checked)}
                  className="w-5 h-5 rounded border-[#d0d5dd] text-blue-600 focus:ring-blue-500 mt-0.5 cursor-pointer"
                />
                <label htmlFor="terms" className="text-[14px] text-[#475467] cursor-pointer">
                  I agree to the <span className="text-blue-600 font-medium hover:underline">Terms &amp; Conditions</span> and Student Accommodation Code of Conduct.
                </label>
              </div>
            </div>
          )}

          {/* Form Actions Footer (Figma: 62:353) */}
          <div className="mt-8 pt-6 border-t border-[#f1f5f9] flex items-center justify-between">
            <span className="text-[12px] text-[#475467]">
              Step {step} of 3 &bull; {step === 1 ? 'Personal Details' : step === 2 ? 'Academic Details' : 'Account Setup'}
            </span>

            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="h-11 px-6 bg-white border border-[#d0d5dd] hover:bg-slate-50 text-[15px] font-bold text-[#172033] rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="h-11 px-6 bg-[#2563eb] hover:bg-blue-700 active:bg-blue-800 text-[15px] font-bold text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>{step === 3 ? 'Create Account' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
