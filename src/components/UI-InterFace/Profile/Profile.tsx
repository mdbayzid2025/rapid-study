"use client";

import { useGetProfileQuery, useUpdateProfileMutation } from "@/store/api/userApi";
import { Edit, Mail, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile] = useUpdateProfileMutation()
  const [profileData, setProfileData] = useState<any>({
    name: "",
    idNo: "",
    contact: "",
    email: "",
    profession: "",
    address: {
      area: "",
      thana: "",
      district: "",
    },
    district: "",
    bloodGroup: "",
    emergencyContact: {
      name: "",
      relation: "",
      mobile: "",
      address: "",
    },
  });
  const {data: profile} = useGetProfileQuery(undefined)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact")) {
      const fieldName = name.split(".")[1]; // Extract the field name (name, relation, etc.)
      setProfileData((prev: any) => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [fieldName]: value,
        },
      }));
    } else if (name.startsWith("address")) {
      const fieldName = name.split(".")[1];
      setProfileData((prev: any) => ({
        ...prev,
        address: {
          ...prev.address,
          [fieldName]: value,
        },
      }));
    } else {
      setProfileData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async() => {
    setIsEditing(false);
    
    try {      
      const res = await updateProfile(profileData).unwrap();
      console.log('response', res);
    } catch (error) {
      console.log('error')
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  useEffect(()=>{
    if(profile?.data){
      setProfileData({...profile?.data})
    }
  },[profile?.data])
if(profile){
  console.log('profile', profile)
}
  return (
    <div className="flex-1 bg-gray-50">
      <main className="p-3 md:p-8">
        <div className=" mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex flex-col text-center md:text-start items-center md:flex-row md:items-start md:space-x-6">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              </div>

              <div className="flex-1 mt-3 md:mt-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profileData.name}
                </h1>
                <p className="text-lg text-gray-600 md:mb-4">
                  {profileData.profession}
                </p>

                <div className="flex flex-col md:flex-row items-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span>{profileData.contact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              {/* ID No */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID No.
                </label>
                <input
                  type="text"
                  name="idNo"
                  value={profileData.idNo}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
              {/* Contact No */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={profileData.contact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              {/* Profession */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={profileData.profession}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={profileData.bloodGroup}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Address Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area
                  </label>
                  <input
                    type="text"
                    name="address.area"
                    value={profileData?.address?.area}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                {/* Thana */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thana
                  </label>
                  <input
                    type="text"
                    name="address.thana"
                    value={profileData?.address?.thana}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <input
                    type="text"
                    name="address.district"
                    value={profileData?.address?.district}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Emergency Contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Emergency Contact Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact.name"
                    value={profileData.emergencyContact.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                {/* Relation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relation
                  </label>
                  <input
                    type="text"
                    name="emergencyContact.relation"
                    value={profileData.emergencyContact.relation}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                {/* Emergency Contact Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact.mobile"
                    value={profileData.emergencyContact.mobile}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                {/* Emergency Contact Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="emergencyContact.address"
                    value={profileData.emergencyContact.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
