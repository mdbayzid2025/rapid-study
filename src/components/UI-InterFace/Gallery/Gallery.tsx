'use client';


import React from "react";
import { GalleryFilters } from "../../shared/GalleryFilters";
import { GalleryGrid } from "../../shared/galleryGrid";
import { ImageUploadModal } from "../../shared/ImageUploadModal";
import { useGallery } from "@/parent/hooks/useGallery";
import { galleryImages } from "@/parent/data/gallery";

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
