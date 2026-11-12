import React from "react";
import { GraduationCap, Home, Shield, ArrowRight } from "lucide-react";
import { TopBar } from "../components/TopBar";
import type { Role } from "../types/auth";

interface RoleSelectionPageProps {
  onSelectRole: (role: Role) => void;
  onBack: () => void;
}

export const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({
  onSelectRole,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar variant="registration" title="Registration" onBack={onBack} />

      <main className="flex-1 max-w-[1080px] w-full mx-auto px-6 py-8 flex flex-col justify-center">
        <div className="bg-[#f8fafc] border border-[#d0d5dd] rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-[32px] font-bold text-[#172033] leading-tight tracking-tight">
              Choose your registration role
            </h1>
            <p className="text-[16px] text-[#475467]">
              Choose how you will use StayHuB to continue.
            </p>
          </div>

          <div className="bg-white border border-[#d0d5dd] rounded-lg p-3">
            <p className="text-[14px] text-[#475467] leading-relaxed">
              Students find housing. House owners list boarding houses. Admin
              access is restricted.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-[24px] font-bold text-[#172033]">
            Choose your account type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              onClick={() => onSelectRole("STUDENT")}
              className="group bg-white border border-[#d0d5dd] hover:border-blue-600 rounded-lg p-6 flex flex-col justify-between h-[220px] cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-bold text-[#172033] group-hover:text-blue-600 transition-colors">
                  Students
                </h3>
                <p className="text-[15px] text-[#475467] leading-[23px]">
                  Find and compare boarding houses near your university.
                </p>
              </div>
              <div className="flex items-center text-[13px] font-semibold text-[#2563eb] pt-2">
                <span>Register as Student</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <div
              onClick={() => onSelectRole("OWNER")}
              className="group bg-white border border-[#d0d5dd] hover:border-[#172033] rounded-lg p-6 flex flex-col justify-between h-[220px] cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-[#172033] flex items-center justify-center">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-bold text-[#172033]">
                  House Owners
                </h3>
                <p className="text-[15px] text-[#475467] leading-[23px]">
                  List and manage your boarding houses.
                </p>
              </div>
              <div className="flex items-center text-[13px] font-semibold text-[#172033] pt-2">
                <span>Register as House Owner</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            <div
              onClick={() => onSelectRole("ADMIN")}
              className="group bg-white border border-[#d0d5dd] hover:border-amber-600 rounded-lg p-6 flex flex-col justify-between h-[220px] cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-[20px] font-bold text-[#172033] group-hover:text-amber-700 transition-colors">
                  Admin
                </h3>
                <p className="text-[15px] text-[#475467] leading-[23px]">
                  For authorized administrators only. Restricted platform
                  access.
                </p>
              </div>
              <div className="flex items-center text-[13px] font-semibold text-amber-700 pt-2">
                <span>Admin Onboarding</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
