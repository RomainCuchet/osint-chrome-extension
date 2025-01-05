chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "imageMetadata",
    title: "Show image metadata",
    contexts: ["image"]
  });
});
  
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "imageMetadata") {
    chrome.tabs.sendMessage(tab.id, {
      action: "getImageMetadata",
      imageUrl: info.srcUrl,
      tab: tab
    });
  }
});

console.log("Background script running");