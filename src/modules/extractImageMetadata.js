import EXIF from 'exif.js';

/**
 * Extracts metadata from an image and associated tab information.
 *
 * @param {string} imageUrl - The URL of the image to process.
 * @param {object} tab - An object representing the tab information (e.g., URL).
 * @returns {Promise<string>} A promise that resolves to the metadata string or rejects with an error.
 */
export function extractImageMetadata(imageUrl, tab) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Enable cross-origin image loading
        img.src = imageUrl;

        img.onload = function () {
            let metadata = ``;

            let exifExtracted = false; // Track if EXIF data is added

            try {
                EXIF.getData(img, function () {
                    const allMetaData = EXIF.getAllTags(this);
                    if (Object.keys(allMetaData).length > 0) {
                        exifExtracted = true;
                        for (const tag in allMetaData) {
                            if (allMetaData.hasOwnProperty(tag)) {
                                metadata += `${tag}: ${allMetaData[tag]}\n`;
                            }
                        }
                    }
                });

                // Check if EXIF was extracted
                if (!exifExtracted) {
                    metadata += "No EXIF metadata found.\n";
                }
            } catch (error) {
                metadata += "Error retrieving EXIF metadata: " + error.message + "\n";
            }

            metadata += `URL of the image: ${imageUrl}\nDimensions: ${img.width}x${img.height} px\nFormat: ${imageUrl.split('.').pop()}\n`;
            metadata += `Page URL: ${tab.url}\n`;

            resolve(metadata);
        };

        img.onerror = function () {
            reject("Unable to load the image or unsupported format.");
        };
    });
}
