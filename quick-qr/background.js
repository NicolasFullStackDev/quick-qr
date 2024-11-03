chrome.runtime.onInstalled.addListener(() => {
    console.log("QuickQR Extension Installed");
});

chrome.action.onClicked.addListener((tab) => {
    // Handle button click to enable/disable content script
    chrome.storage.local.get(["contentScriptEnabled"], (result) => {
        const newState = !result.contentScriptEnabled;
        chrome.storage.local.set({ contentScriptEnabled: newState }, () => {
            if (newState) {
                // Request permissions
                chrome.permissions.request({ origins: ["<all_urls>"] }, (granted) => {
                    if (granted) {
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            files: ["jQuery.min.js", "qrCode.min.js", "htmlToCanvas.min.js", "script.js"]
                        });
                    }
                });
            }
        });
    });
});
