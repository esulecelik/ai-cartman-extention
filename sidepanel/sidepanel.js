var port = null;

window.onload = function() {
    const prompt= document.getElementById("input-prompt");
    prompt.addEventListener("keyup", sendText);
    
    port = chrome.runtime.connect({ name: "panelChannel" });
    port.onDisconnect.addListener(() => {
        console.log("Port closed, reconnecting...");
        port = chrome.runtime.connect({ name: "panelChannel" });
    });


    port.onMessage.addListener(function(msg) {
    if (msg.action === "cartmanSays") {
        console.log("Background'dan yeni veri geldi:", msg.data);
        appendCartmanDialog(msg.data);
    }
});

    function sendText(event) {
       
        // Enter butonu değilse dikkate alınmıyor.
        // Don't mind if it is not key Enter 
        var keyCode = event.keyCode;
        if (keyCode != 13){
            return;
        }
        event.preventDefault();
        
        let prompt = event.target.value;
        event.target.value="";

        appendUserPrompt(prompt);
        sendPrompt(prompt);
    }
}


function sendPrompt(userPrompt) {
    port.postMessage({prompt: userPrompt});
}



function appendCartmanDialog(message) {
    const dialogBox = document.getElementById("dialogbox");

    // cartmansays boxu oluşturuluyor.
    outerDiv = document.createElement("div");
    outerDiv.classList.add("cartman-says");


    cartmanIconWrapper = document.createElement("div");
    cartmanIconWrapper.classList.add("cartman-icon");

    cartmanIcon = document.createElement("img");
    cartmanIcon.src="/icons/busy.jfif";
    cartmanIconWrapper.appendChild(cartmanIcon);

    cartmanTextWrapper = document.createElement("div");
    cartmanTextWrapper.classList.add("cartman-text");

    cartmantText = document.createElement("span");
    cartmantText.innerHTML= message;
    cartmanTextWrapper.appendChild(cartmantText);

    outerDiv.appendChild(cartmanIconWrapper);
    outerDiv.appendChild(cartmanTextWrapper);

    dialogBox.appendChild(outerDiv);
}

function appendUserPrompt(prompt) {
    const dialogBox = document.getElementById("dialogbox");

    // Kullanıcı promtu oluşturuluyor.
    outerUserDiv = document.createElement('div');
    outerUserDiv.classList.add("user-prompt");

    userTextWrapper = document.createElement('div');
    userTextWrapper.classList.add("user-says");

    userText = document.createElement("span");
    userText.innerHTML = prompt 
    userTextWrapper.appendChild(userText);
    outerUserDiv.appendChild(userTextWrapper);

    dialogBox.appendChild(outerUserDiv);
        
}
