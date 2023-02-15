chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
        changeInfo.status == "complete" &&
        tab.url &&
        tab.url.includes("youtube.com/watch")
    ) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        console.log("v", urlParameters.get("v"));

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabId,
                {
                    type: "NEW",
                    videoId: urlParameters.get("v"),
                },
                (res) => {
                   // console.log(res);
                }
            );
        });
    }
});

