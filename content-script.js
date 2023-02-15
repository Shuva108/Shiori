let youtubeRightControls, youtubePlayer;
let currentVideo = "";
let currentVideoBookmarks = [];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { type, value, videoId } = request;
    console.log("request", request);
    if (type === "NEW") {
        currentVideo = videoId;
        console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);
        newVideoLoaded();
        // sendResponse({ farewell: "goodbye" });
    }
});
// get current theme
const isDark = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
const newVideoLoaded = () => {
    const bookmarkBtnExists =
        document.getElementsByClassName("bookmark-btn")[0];

    if (!bookmarkBtnExists) {
        console.log("bookmarkBtnExists in");
        const bookmarkBtn = document.createElement("img");
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            bookmarkBtn.src = chrome.runtime.getURL("assets/img/bookmarkDark.svg");
        } else {
            bookmarkBtn.src = chrome.runtime.getURL("assets/img/bookmark.svg");
        }
        bookmarkBtn.className = "ytp-button " + "bookmark-btn";
        bookmarkBtn.title = "Click to bookmark current timestamp";
        bookmarkBtn.style.width = "30px";
        bookmarkBtn.style.marginRight = "7px";

        youtubeRightControls =
            document.getElementsByClassName("ytp-right-controls")[0];
        youtubePlayer = document.getElementsByClassName("video-stream")[0];

        youtubeRightControls.prepend(bookmarkBtn);
        bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
};

//open a modal to insert Bookmark Details
const bookMarkModalHandler = () => {
    //   // Get HTML head element
    //   var head = document.getElementsByTagName('HEAD')[0];

    //   // Create new link Element
    //   var link = document.createElement('link');

    //   // set the attributes for link element
    //   link.rel = 'stylesheet';
    //   link.type = 'text/css';
    //   link.integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
    //   link.crossorigin="anonymous"
    //   link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css';

    //   // Append link element to HTML head
    //   head.appendChild(link);

    //   var script = document.createElement('script');
    //   script.src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    //   script.integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
    //   script.crossorigin="anonymous"
    //   head.appendChild(script);

    const myModal = new bootstrap.Modal("#myModal", {
        keyboard: false,
    });

    myModal.show(document.getElementById("myModal"));
};

const addNewBookmarkEventHandler = () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
        time: currentTime,
        desc: "Bookmark at " + getTime(currentTime),
    };
    console.log(newBookmark);

    chrome.storage.sync.set({
        [currentVideo]: JSON.stringify(
            [...currentVideoBookmarks, newBookmark].sort(
                (a, b) => a.time - b.time
            )
        ),
    });
};

newVideoLoaded();


