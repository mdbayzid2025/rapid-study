import React from "react";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => (
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children}</div>
  </div>
);
