'use client';

import { useState } from 'react';
import { useGetNoticeQuery } from '@/store/api/settingApi'
import { Eye, FileText, Plus, X, Upload } from 'lucide-react';
import React from 'react'
import Container from '../../shared/Container/Container';

const Notice = () => {
    const { data: noticeData } = useGetNoticeQuery(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notices, setNotices] = useState(noticeData || []);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        date: '',
        iconType: 'pdf'
    });

    console.log('noticeData', noticeData)

    const handleFileChange = (e:any) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const handleAddNotice = () => {
        if (!formData.description || !formData.date) {
            alert('Please fill in all required fields');
            return;
        }

        const newNotice = {
            id: (notices?.length || 0) + 1,
            description: formData.description,
            date: formData.date,
            icon: formData.iconType,
            file: (file as any)?.name || null
        };

        setNotices([...(notices || []), newNotice]);
        setFormData({ description: '', date: '', iconType: 'pdf' });
        setFile(null);
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setFormData({ description: '', date: '', iconType: 'pdf' });
        setFile(null);
        setIsModalOpen(false);
    };

    const displayData = notices || noticeData || [];

    return (
        <div className="p-6">
            <Container>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Notice
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-teal-500 text-white">
                                    <th className="px-6 py-3 text-left text-sm font-semibold">ক্রমিক ন.</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">বিষয়বস্তু</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">প্রকাশের তারিখ</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">আইকন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayData?.map((row:any, idx:any) => (
                                    <tr
                                        key={row.id}
                                        className={`border-b ${
                                            idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{row.description}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{row.date}</td>
                                        <td className="px-6 py-4 text-sm">
                                            <IconComponent type={row.icon} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>

            {/* Create Notice Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Create Notice</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    placeholder="Enter notice description"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                    rows={3}
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({ ...formData, date: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>

                            {/* Icon Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Icon Type
                                </label>
                                <select
                                    value={formData.iconType}
                                    onChange={(e) =>
                                        setFormData({ ...formData, iconType: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                >
                                    <option value="pdf">PDF</option>
                                    <option value="image">Image</option>
                                    <option value="link">Link</option>
                                </select>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload File
                                </label>
                                <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-teal-500 rounded-lg cursor-pointer hover:bg-teal-50 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <Upload className="w-5 h-5 text-teal-500" />
                                        <span className="text-sm text-gray-700">                                            
                                            {file ? (file as any)?.name : 'Click to upload'}
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleCloseModal}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddNotice}
                                className="flex-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors font-medium"
                            >
                                Add Notice
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const IconComponent = ({ type }: any) => {
    if (type === 'pdf') {
        return (
            <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
            </div>
        );
    }
    if (type === 'image') {
        return (
            <div className="w-10 h-10 bg-blue-400 rounded flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
            </div>
        );
    }
    return (
        <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
        </div>
    );
};

export default Notice