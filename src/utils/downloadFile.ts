import { getImageUrl } from "@/utils/baseUrl";

export const handleDownload = (path: string) => {
  if (!path) return;

  // ensure full URL
  const fileUrl = path.startsWith("http")
    ? path
    : `${getImageUrl()}${path}`;

  const fileName = fileUrl.split("/").pop() || "downloaded_file";

  fetch(fileUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.blob();
    })
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error("Download failed:", error);
      // toast.error("Failed to download the file");
    });
};
