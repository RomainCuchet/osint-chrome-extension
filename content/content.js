chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message", message);
    if (message.action === "getImageMetadata") {
        const imageUrl = message.imageUrl;
        const tab = message.tab;

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

            metadata += `URL of the image: ${imageUrl}\nDimensions: ${img.width}x${img.height} px\nFormat: ${imageUrl.split('.').pop()}\n`
            metadata += `Page URL: ${tab.url}\n`;

            console.log(metadata);
            sendResponse({ success: true, metadata: metadata });
        };

        img.onerror = function () {
            sendResponse({ success: false, error: "Unable to load the image or unsupported format." });
        };

        // Keep the message channel open for asynchronous response
        return true;
    }
});

console.log("Content script running");