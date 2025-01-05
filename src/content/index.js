import { extractImageMetadata } from '../modules/extractImageMetadata.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message", message);
    if (message.action === "getImageMetadata") {
        console.log(extractImageMetadata(message.imageUrl, message.tab));
    }
});

console.log("Content script running");