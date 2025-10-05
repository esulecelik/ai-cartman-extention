
var port = chrome.runtime.connect({ name: "channel1" });
port.onDisconnect.addListener(() => {
    port = chrome.runtime.connect({ name: "channel1" });
});


const body = document.body.innerText;
console.log(body);