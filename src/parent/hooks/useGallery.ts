'use client'

import { useState, useMemo } from 'react';
import { GalleryImage, FilterCategory } from '../types';

export const useGallery = (initialImages: GalleryImage[]) => {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredImages = useMemo(() => {
    return activeFilter === 'all' 
      ? images 
      : images.filter(image => image.category === activeFilter);
  }, [images, activeFilter]);

  const handleFilterChange = (filter: FilterCategory) => {
    setActiveFilter(filter);
  };

  const handleUploadImage = (imageData: { title: string; category: any; file: File }) => {
    // In a real application, you would upload the file to a server
    // For demo purposes, we'll create a local URL
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      src: URL.createObjectURL(imageData.file),
      alt: imageData.title,
      category: imageData.category,
      title: imageData.title,
      description: `Uploaded ${imageData.category} image`
    };

    setImages(prev => [newImage, ...prev]);
    setIsUploadModalOpen(false);
  };

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  return {
    images,
    filteredImages,
    activeFilter,
    isUploadModalOpen,
    handleFilterChange,
    handleUploadImage,
    openUploadModal,
    closeUploadModal
  };
};