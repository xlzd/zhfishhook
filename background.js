
var currentTab;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request == 'showPageAction') {
    chrome.tabs.query(
        {
            currentWindow: true,
            active: true
        },
        function(tabArray) {
            if (tabArray && tabArray[0])
                chrome.pageAction.show(tabArray[0].id);
        }
    );
  }
});


function checkForValidUrl(tabId, changeInfo, tab) {

    url = tab.url.toLowerCase()

    if (url.startsWith("https://www.zhihu.com/question")) {
        chrome.pageAction.show(tabId);
    }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
