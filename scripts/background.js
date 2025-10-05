// background.js
chrome.runtime.onConnect.addListener((port) => {
    console.log("Connected on", port.name);

    if (port.name === "channel1") {
        port.onMessage.addListener((msg) => {
            console.log("Ch1:", msg);
        });
    }

    if (port.name === "channel2") {
        port.onMessage.addListener((msg) => {
            console.log("Ch2:", msg);
        });
    }
});
