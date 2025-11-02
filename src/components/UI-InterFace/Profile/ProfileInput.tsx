import React from "react";

interface ProfileInputProps {
  label: string;
  name: string;
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileInput: React.FC<ProfileInputProps> = ({
  label,
  name,
  value,
  disabled,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
                 focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                 disabled:bg-gray-50 disabled:text-gray-600"
    />
  </div>
);
