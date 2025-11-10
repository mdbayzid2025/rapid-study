"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/store/api/userApi";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileSection } from "./ProfileSection";
import { ProfileInput } from "./ProfileInput";
import { IProfile } from "./ProfileInterface";


const defaultProfile: IProfile = {
  name: "",
  idNo: "",
  contact: "",
  photo: "",
  email: "",
  profession: "",
  bloodGroup: "",
  address: { area: "", thana: "", district: "" },
  emergencyContact: { name: "", relation: "", mobile: "", address: "" },
};

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<IProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, refetch } = useGetProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (profile?.data) {setProfileData(profile?.data)};
  }, [profile?.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setProfileData(prev => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else if (name.startsWith("emergencyContact.")) {
      const key = name.split(".")[1];
      setProfileData(prev => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [key]: value },
      }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(profileData).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-3 md:p-8">
      <ProfileHeader
        data={profileData}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSave}
        refetch={refetch}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Profile Information</h2>

        {/* Basic Info */}
        <ProfileSection title="Basic Information">
          <ProfileInput label="Name" name="name" value={profileData?.name} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="ID No." name="idNo" value={profileData?.idNo} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="Contact" name="contact" value={profileData?.contact} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="Email" name="email" value={profileData?.email} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="Profession" name="profession" value={profileData?.profession} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="Blood Group" name="bloodGroup" value={profileData?.bloodGroup} disabled={!isEditing} onChange={handleChange} />
        </ProfileSection>

        {/* Address */}
        <ProfileSection title="Address Information">
          <ProfileInput label="Area" name="address.area" value={profileData?.address?.area} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="Thana" name="address.thana" value={profileData?.address?.thana} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="District" name="address.district" value={profileData?.address?.district} disabled={!isEditing} onChange={handleChange} />
        </ProfileSection>

        {/* Emergency */}
        <ProfileSection title="Emergency Contact">
          <ProfileInput label="Name" name="emergencyContact.name" value={profileData?.emergencyContact?.name} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="Relation" name="emergencyContact.relation" value={profileData?.emergencyContact?.relation} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="Mobile" name="emergencyContact.mobile" value={profileData?.emergencyContact?.mobile} disabled={!isEditing} onChange={handleChange} />
          <ProfileInput label="Address" name="emergencyContact.address" value={profileData?.emergencyContact?.address} disabled={!isEditing} onChange={handleChange} />
        </ProfileSection>
      </div>
    </div>
  );
};

export default Profile;
