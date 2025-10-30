import React from 'react';
import { Upload } from 'lucide-react';
import { FilterCategory } from '../../parent/types';

interface GalleryFiltersProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
  onUploadClick: () => void;
}

const filterOptions: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Classes', value: 'classes' },
  { label: 'Events', value: 'events' },
  { label: 'Projects', value: 'projects' },
  { label: 'Sports', value: 'sports' }
];

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  activeFilter,
  onFilterChange,
  onUploadClick
}) => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange(option.value)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  activeFilter === option.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {/* Upload button */}
          <button
            onClick={onUploadClick}
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Upload size={16} />
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};