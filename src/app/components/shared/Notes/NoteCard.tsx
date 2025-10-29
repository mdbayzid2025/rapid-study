import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Download,
  Book,
  LucideBookOpenText,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "antd";
import { getImageUrl } from "@/utils/baseUrl";
import { handleDownload } from "@/utils/downloadFile";

export const NoteCard = ({
  title,
  subject,
  description,
  createdAt,
  images = [],
  document = [],
  priority,
  isPrepared = false,
  onTogglePrepared,
  tags = [],
}: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);

  const handleNextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const openImageViewer = (index: number) => {
    setViewerImageIndex(index);
    setViewerOpen(true);
  };

  const handleViewerNext = () =>
    setViewerImageIndex((prev) => (prev + 1) % images.length);
  const handleViewerPrev = () =>
    setViewerImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const getPriorityColor = () => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityBorderColor = () => {
    switch (priority) {
      case "High":
        return "border-l-red-500";
      case "Medium":
        return "border-l-orange-400";
      case "Low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const getDocumentName = (url: string) => {
    const fileName = url.split("/").pop();
    const withoutTime = fileName?.replace(/^\d+-/, "") || "";
    return withoutTime.replace(/\.[^\.]+$/, "");
  };

  return (
    <>
      <Card
        className={`overflow-hidden hover:shadow-md mb-1 transition-all border-l-4 ${getPriorityBorderColor()}`}
      >
        <CardContent className="p-0">
          {/* ---------- IMAGE PREVIEW ---------- */}
          <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            {images.length > 0 ? (
              <img
                src={`${getImageUrl()}${images[currentImageIndex]}`}
                alt={`Note image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-700"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Book className="h-12 w-12 opacity-30" />
                <span className="ml-2">No images available</span>
              </div>
            )}

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <div className="absolute top-2 left-2 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-purple-800/40 hover:bg-purple-800/60 text-white h-8 w-8 rounded-none"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-purple-800/40 hover:bg-purple-800/60 text-white h-8 w-8 rounded-none"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Image Actions */}
            {images.length > 0 && (
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-black/40 hover:bg-black/60 text-white rounded-full h-8 w-8"
                  onClick={() => openImageViewer(currentImageIndex)}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="bg-green-700 hover:bg-green-800 text-white rounded-full h-8 w-8"
                  onClick={() => handleDownload(images[currentImageIndex])}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* ---------- CONTENT ---------- */}
          <div className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex gap-1 items-center text-muted-foreground">
                <LucideBookOpenText
                  size={18}
                  color="currentColor"
                  className="text-orange-500/80"
                />
                {subject?.name}
              </div>
              <div
                className={`text-center ${getPriorityColor()} text-xs px-2 mb-1 py-0.5 rounded-full`}
              >
                {priority}
              </div>
            </div>

            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-2">
              {description}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2 mb-3">
                {tags.map((tag: any, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

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

            {/* ---------- DOCUMENTS ---------- */}
            {document?.length > 0 && (
              <div className="mt-3 border-t pt-3">
                <p className="text-xs font-medium mb-2">Attachments</p>
                <div className="grid grid-cols-3 gap-2">
                  {document.map((doc: string, index: number) => (
                    <Tooltip key={index} title={getDocumentName(doc)}>
                      <div
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                        onClick={() => handleDownload(doc)}
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-red-500" />
                          <span className="text-[12px] truncate">
                            {`Doc. ${index + 1}`}
                          </span>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer h-6 w-6"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ---------- IMAGE VIEWER DIALOG ---------- */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-3xl h-[80vh] p-0 overflow-hidden">
          <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
            <DialogTitle className="text-white px-4 py-2">
              {title} - Image {viewerImageIndex + 1} of {images.length}
            </DialogTitle>
          </DialogHeader>

          <div className="relative flex items-center justify-center w-full h-full bg-black">
            <img
              src={`${getImageUrl()}${images[viewerImageIndex]}`}
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

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_: any, index: number) => (
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
