export function formatFileSize(sizeInBytes) {
    const KB = 1024;
    const MB = 1024 * KB;
    const GB = 1024 * MB;

    if (sizeInBytes < KB) {
        return sizeInBytes + " bytes";
    } else if (sizeInBytes < MB) {
        return (sizeInBytes / KB).toFixed(2) + " KB";
    } else if (sizeInBytes < GB) {
        return (sizeInBytes / MB).toFixed(2) + " MB";
    } else {
        return (sizeInBytes / GB).toFixed(2) + " GB";
    }
}
