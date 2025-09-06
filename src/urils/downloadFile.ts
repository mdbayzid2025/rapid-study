    export const handleDownload = (url:any) => {
    const fileName = url.split('/').pop() || 'downloaded_file';
 
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed:", error);
        // toast.error("Failed to download the image");
      });
  };