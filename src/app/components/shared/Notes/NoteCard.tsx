import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Download, 
  FileText,
  FileType,
  FileImage,
  Book,
  Check
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface DocumentAttachment {
  url: string;
  fileName: string;
  type: 'pdf' | 'word' | 'powerpoint' | 'other';
  size?: number;
}

interface NoteCardProps {
  _id?: string;
  title: string;
  description: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  images: string[];
  documents: DocumentAttachment[];
  priority?: number;
  isPrepared?: boolean;
  onTogglePrepared?: () => void;
  tags?: string[];
}

export const NoteCard = ({
  title,
  description,
  createdAt,
  images,
  documents,
  priority = 3,
  isPrepared = false,
  onTogglePrepared,
  tags = [],
 }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);  

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images?.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images?.length) % images?.length);
  };

  const openImageViewer = (index: number) => {
    setViewerImageIndex(index);
    setViewerOpen(true);
  };

  const handleViewerNext = () => {
    setViewerImageIndex(prev => (prev + 1) % images?.length);
  };

  const handleViewerPrev = () => {
    setViewerImageIndex(prev => (prev - 1 + images?.length) % images?.length);
  };

  const downloadFile = (url: string, fileName?: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      

    } catch (error) {
      console.error("Download error:", error);

    }
  };

  const getFileIcon = (type: DocumentAttachment['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'word':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'powerpoint':
        return <FileText className="h-6 w-6 text-orange-500" />;
      case 'other':
        return <FileType className="h-6 w-6 text-gray-500" />;
      default:
        return <FileImage className="h-6 w-6 text-green-500" />;
    }
  };

  const getFileTypeBadge = (type: DocumentAttachment['type']) => {
    const baseClasses = "absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium";
    switch (type) {
      case 'pdf':
        return <span className={`${baseClasses} bg-red-500/80 text-white`}>PDF</span>;
      case 'word':
        return <span className={`${baseClasses} bg-blue-500/80 text-white`}>DOCX</span>;
      case 'powerpoint':
        return <span className={`${baseClasses} bg-orange-500/80 text-white`}>PPT</span>;
      default:
        return null;
    }
  };

  // Generate star rating based on priority
  const renderPriorityStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`text-xs ${i <= priority ? "text-yellow-500" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Border color based on priority
  const getPriorityBorderColor = () => {
    switch (priority) {
      case 5: return "border-l-red-500";
      case 4: return "border-l-orange-500";
      case 3: return "border-l-blue-500";
      case 2: return "border-l-green-500";
      default: return "border-l-gray-500";
    }
  };

  return (
    <>
      <Card className={`overflow-hidden hover:shadow-md transition-all border-l-4 ${getPriorityBorderColor()}`}>
        <CardContent className="p-0">
          <div className="relative">
            <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {images?.length > 0 ? (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt={`Note image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Book className="h-12 w-12 opacity-30" />
                  <span className="ml-2">No images available</span>
                </div>
              )}

              {images?.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-8 w-8"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-8 w-8"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {images?.length > 0 && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 bg-black/40 hover:bg-black/60 text-white rounded-full h-8 w-8"
                    onClick={() => openImageViewer(currentImageIndex)}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-12 top-2 bg-black/40 hover:bg-black/60 text-white rounded-full h-8 w-8"
                    onClick={() => downloadFile(images[currentImageIndex], `image-${currentImageIndex + 1}.jpg`)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </>
              )}

              {images?.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {images.map((_:any, index :any) => (
                    <div
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors cursor-pointer",
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white/50"
                      )}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}

              {/* Prepared badge */}
              {isPrepared && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Prepared
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{title}</h3>
                <div className="flex">{renderPriorityStars()}</div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1 mb-2">{description}</p>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2 mb-3">
                  {tags.map((tag:any, index :any) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {format(new Date(createdAt), "MMM dd, yyyy")}
                </div>
                
                {onTogglePrepared && (
                  <Button 
                    variant={isPrepared ? "outline" : "default"}
                    size="sm"
                    onClick={onTogglePrepared}
                    className="text-xs h-7 rounded-md"
                  >
                    {isPrepared ? "Mark as Not Prepared" : "Mark as Prepared"}
                  </Button>
                )}
              </div>

              {images?.length > 0 && (
                <div className="mt-3 flex -space-x-3 overflow-hidden">
                  {images.slice(0, 4).map((image:any, index :any) => (
                    <div
                      key={index}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 overflow-hidden cursor-pointer"
                      onClick={() => openImageViewer(index)}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {images?.length > 4 && (
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-700">
                      <span className="text-xs font-medium">
                        +{images?.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {documents?.length > 0 && (
                <div className="mt-3 border-t pt-3">
                  <p className="text-xs font-medium mb-2">Attachments</p>
                  <div className="space-y-2">
                    {documents.map((doc :any, index :any) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        onClick={() => downloadFile(doc.url, doc.fileName)}
                      >
                        <div className="flex items-center space-x-2">
                          {getFileIcon(doc.type)}
                          <span className="text-sm truncate max-w-[150px]">
                            {doc.fileName || `Document ${index + 1}`}
                          </span>
                        </div>
                        <Button size="icon" variant="ghost" className="h-6 w-6">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-3xl h-[80vh] p-0 overflow-hidden">
          <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
            <DialogTitle className="text-white px-4 py-2">
              {title} - Image {viewerImageIndex + 1} of {images?.length}
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative flex items-center justify-center w-full h-full bg-black">
            <img
              src={images[viewerImageIndex]}
              alt={`Full size ${viewerImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
            
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-10 w-10"
              onClick={handleViewerPrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-10 w-10"
              onClick={handleViewerNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            
            <div className="absolute bottom-4 left-4">
              <Button
                size="sm"
                variant="outline"
                className="bg-black/40 hover:bg-black/60 text-white border-white/20"
                onClick={() => downloadFile(images[viewerImageIndex], `image-${viewerImageIndex + 1}.jpg`)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_:any, index :any) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors cursor-pointer",
                    index === viewerImageIndex ? "bg-white" : "bg-white/50"
                  )}
                  onClick={() => setViewerImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};