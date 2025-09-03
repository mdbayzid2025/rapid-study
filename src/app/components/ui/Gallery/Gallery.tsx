'use client';

import { galleryImages } from "@/app/data/gallery";
import { useGallery } from "@/app/hooks/useGallery";
import React from "react";
import { GalleryFilters } from "../../shared/GalleryFilters";
import { GalleryGrid } from "../../shared/galleryGrid";
import { ImageUploadModal } from "../../shared/ImageUploadModal";

export const Gallery = () => {
      const {
    filteredImages,
    activeFilter,
    isUploadModalOpen,
    handleFilterChange,
    handleUploadImage,
    openUploadModal,
    closeUploadModal
  } = useGallery(galleryImages);

  return (
    <div>
      <GalleryFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        onUploadClick={openUploadModal}
      />

      <GalleryGrid images={galleryImages} activeFilter={activeFilter} />

      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        onUpload={handleUploadImage}
      />
    </div>
  );
};
