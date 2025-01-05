import { extractImageMetadata } from '../modules/extractImageMetadata.js';
import { createMagicButton } from '../modules/createMagicButton.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message", message);
    if (message.action === "getImageMetadata") {
        console.log(extractImageMetadata(message.imageUrl, message.tab));
    }
});
createMagicButton();
console.log("Content script running");