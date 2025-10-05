const { Header } = require("docx");

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
  const baseURL = "https://api.deepseek.com";
  
  let headers = new Headers();
//   headers.append("Authorization",`Bearer ${}`);
  headers.append("Content-Type","application/json");

  var requestOptions = {
      method: 'GET',
      headers: headers,
  };

    try {
        const response = await fetch(`${baseURL}`, requestOptions)

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }

    return null;
}