"use client";

import { Edit, Mail, Phone, User, Camera } from "lucide-react";
import { useRef } from "react";

import { useUpdateProfileMutation } from "@/store/api/userApi";
import { getImageUrl } from "@/utils/baseUrl";
import { toast } from "sonner";

interface Props {
  data: {
    name: string;
    email: string;
    contact: string;
    profession: string;
    photo?: string;
  };
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  refetch: () => void;
}

export const ProfileHeader: React.FC<Props> = ({
  data,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  refetch
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [updateProfile] = useUpdateProfileMutation();

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await updateProfile(formData).unwrap();
      toast.success(res?.message || "Profile photo updated successfully!");
      refetch();
    } catch (err: any) {
      console.log("err", err);
      
      toast.error(err?.data?.message || "Failed to update profile photo");
    }
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
      <div className="flex flex-col text-center md:text-start items-center md:flex-row md:items-start md:space-x-6">
        <div className="relative group">
          <img
            src={
              data?.photo ? `${getImageUrl()}${data?.photo}` :
              "/placeholder.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />

          {/* Hover overlay for photo change */}
          <div
            onClick={handleOpenFilePicker}
            className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-200"
          >
            <Camera size={20} className="text-white" />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="flex-1 mt-3 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
          <p className="text-lg text-gray-600 md:mb-4">{data.profession}</p>

          <div className="flex flex-col md:flex-row items-center space-x-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>{data.contact}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
