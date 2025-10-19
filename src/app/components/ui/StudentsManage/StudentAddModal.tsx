import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { User } from '@/store/api/authApi';


interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
  user?: any | null;
  mode: 'add' | 'edit' | 'view';
}

const initialState = {
        name: '',
        email: '',
        idNo: '',
        contact: '',
        profession: '',
        bloodGroup: '',
        district: '',
        address: { area: '', thana: '', district: '' },
        emergencyContact: { name: '', relation: '', mobile: '', address: '' },
        status: 'ACTIVE',
      
}

const UserAddModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
  mode,
}) => {
  const [formData, setFormData] = useState(initialState);

  console.log('abc', user)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        idNo: user?.idNo || '',
        contact: user?.contact || '',
        profession: user?.profession || '',
        bloodGroup: user?.bloodGroup || '',
        district: user?.district || '',
        address: {
          area: user?.address?.area || '',
          thana: user?.address?.thana || '',
          district: user?.address?.district || '',
        },
        emergencyContact: {
          name: user?.emergencyContact?.name || '',
          relation: user?.emergencyContact?.relation || '',
          mobile: user?.emergencyContact?.mobile || '',
          address: user?.emergencyContact?.address || '',
        },
        status: user?.status || 'ACTIVE',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        idNo: '',
        contact: '',
        profession: '',
        bloodGroup: '',
        district: '',
        address: { area: '', thana: '', district: '' },
        emergencyContact: { name: '', relation: '', mobile: '', address: '' },
        status: 'ACTIVE',
      });
    }
  }, [user, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    nestedField?: string,
    parentField?: string
  ) => {
    const { name, value } = e.target;
    if (parentField) {
      setFormData((prev:any) => ({
        ...prev,
        [parentField]: {
          ...prev[parentField],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';
  const title =
    mode === 'add'
      ? 'Add New User'
      : mode === 'edit'
      ? 'Edit User'
      : 'User Details';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={isReadOnly}
              required
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={isReadOnly}
              required
            />
            <InputField
              label="Contact Number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              readOnly={isReadOnly}
              required
            />
            <InputField
              label="ID Number"
              name="idNo"
              value={formData.idNo}
              onChange={handleChange}
              readOnly={isReadOnly}
              required
            />
            <InputField
              label="Profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
            <SelectField
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              disabled={isReadOnly}
              options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']}
            />
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold text-gray-800 mt-4 mb-2">Address</h3>
            <div className="grid grid-cols-3 gap-3">
              <InputField
                label="Area"
                name="area"
                value={formData.address.area}
                onChange={(e: any) => handleChange(e, 'area', 'address')}
                readOnly={isReadOnly}
              />
              <InputField
                label="Thana"
                name="thana"
                value={formData.address.thana}
                onChange={(e: any) => handleChange(e, 'thana', 'address')}
                readOnly={isReadOnly}
              />
              <InputField
                label="District"
                name="district"
                value={formData.address.district}
                onChange={(e: any) => handleChange(e, 'district', 'address')}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mt-4 mb-2">
              Emergency Contact
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Name"
                name="name"
                value={formData.emergencyContact.name}
                onChange={(e: any) => handleChange(e, 'name', 'emergencyContact')}
                readOnly={isReadOnly}
              />
              <InputField
                label="Relation"
                name="relation"
                value={formData.emergencyContact.relation}
                onChange={(e:any) => handleChange(e, 'relation', 'emergencyContact')}
                readOnly={isReadOnly}
              />
              <InputField
                label="Mobile"
                name="mobile"
                value={formData.emergencyContact.mobile}
                onChange={(e:any) => handleChange(e, 'mobile', 'emergencyContact')}
                readOnly={isReadOnly}
              />
              <InputField
                label="Address"
                name="address"
                value={formData.emergencyContact.address}
                onChange={(e:any) => handleChange(e, 'address', 'emergencyContact')}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* Status */}
          <div className="grid  gap-4">
            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isReadOnly}
              options={['ACTIVE', 'INACTIVE']}
            />           
          </div>

          {!isReadOnly && (
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 cursor-pointer text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {mode === 'add' ? 'Add User' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// ✅ Reusable input component
const InputField = ({
  label,
  name,
  value,
  onChange,
  readOnly,
  required,
  type = 'text',
}: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
    />
  </div>
);

// ✅ Reusable select component
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled,
}: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
    >
      <option value="">Select {label}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default UserAddModal;
