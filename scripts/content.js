
// Background servise bağlantı açılıyor,eğer bağlantı kapanırsa
// tekrar bağlanılıyor. 
var port = chrome.runtime.connect({ name: "contentChannel" });
port.onDisconnect.addListener(() => {
    port = chrome.runtime.connect({ name: "contentChannel" });
});

port.postMessage({promt:document.body.innerText});