window.onload = function() {
    const prompt= document.getElementById("input-prompt");
    prompt.addEventListener("keyup", sendText);
    
    var port = chrome.runtime.connect({ name: "channel2" });
    port.onDisconnect.addListener(() => {
        console.log("Port closed, reconnecting...");
        port = chrome.runtime.connect({ name: "channel2" });
    });

    function sendText(event) {
        const dialogBox = document.getElementById("dialogbox");
       
        // Enter butonu değilse dikkate alınmıyor.
        var keyCode = event.keyCode;
        if (keyCode != 13){
            return;
        }
        event.preventDefault();
        
        let prompt = event.target.innerHTML;
        event.target.value="";

        // Kullanıcı promtu oluşturuluyor.


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
        cartmantText.innerHTML= "Dude";
        cartmanTextWrapper.appendChild(cartmantText);

        outerDiv.appendChild(cartmanIconWrapper);
        outerDiv.appendChild(cartmanTextWrapper);

        dialogBox.appendChild(outerDiv);
       
    }
}