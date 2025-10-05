// background.js
var sidepanelPort = null;
var contentPort = null;

chrome.runtime.onConnect.addListener((port) => {
    console.log("Connected on", port.name);

    // Content script
    if (port.name === "contentChannel") {
      contentPort=port;

      port.onMessage.addListener(function(msg) {
          console.log("Content'dan gelen mesaj:", msg);

          apiCall(msg.prompt);
          sendDataToSidepanel();
          sidepanelPort.postMessage({json:msg})
      });

      // Content kapatılırsa portu temizle
      port.onDisconnect.addListener(function() {
          console.log("Content bağlantısı kesildi.");
          contentPort = null;
      });
    }

    // Sidepanel script
    if (port.name === "panelChannel") {
      sidepanelPort = port;

      port.onMessage.addListener(function(msg) {
         apiCall(msg.prompt);
         sendDataToSidepanel();
      });

      // Sidepanel kapatılırsa portu temizle
      port.onDisconnect.addListener(function() {
          console.log("Sidepanel bağlantısı kesildi.");
          sidepanelPort = null;
      });
    }
});


function sendDataToSidepanel(data) {
    if (sidepanelPort) {
        console.log("Sidepanel'a veri gönderiliyor...");
        sidepanelPort.postMessage({
            action: "cartmanSays",
            data: "Test"
        });
    } else {
        console.warn("Sidepanel şu anda açık değil, veri gönderilemedi.");
    }
}

async function apiCall(prompt) {
  console.log("API CALL: "+ prompt);
}