(()=>{const e=io("/"),o=document.getElementById("video-grid"),n=new Peer(void 0,{host:"0.peerjs.com",port:"443",secure:!0}),t={};let l,a,c=[],s=c;function d(e,o,l){let a,c;console.log(l),console.log("My different streams ",o);let d=0;o.forEach((o=>{d+=1,console.log("le flux vidéo actuel de la boucle",o),console.log("lenght",s.length-d),c=n.call(e,o,{metadata:s.length-d})}));const r=document.createElement("video");c.on("stream",(e=>{console.log("we got an incoming stream from the joiner ",e),a!==e.id&&(a=e.id,i(document.createElement("video"),e,!0))})),c.on("close",(()=>{r.remove()})),t[e]=c}function i(e,n,t=!1){console.log("videoElement",e),e.muted=!0,e.style.border="solid red 2px",e.srcObject=n,e.volume=0,e.addEventListener("loadedmetadata",(()=>{e.play()})),o.append(e),t&&(e.muted=!1,e.volume=1)}navigator.mediaDevices.enumerateDevices().then((e=>{e.forEach((e=>{console.log(`${e.kind}: ${e.label} id = ${e.deviceId}`),"videoinput"==e.kind&&navigator.mediaDevices.getUserMedia({video:{deviceId:e.deviceId},audio:!0}).then((o=>{console.log("device",e.label),c.push(o),l=o;const n=document.createElement("video");n.id=e.label,console.log("myVideo",n),console.log("everyStream variable from my side ",c),i(n,l,!1)}))}))})).catch((e=>{console.error(`${e.name}: ${e.message}`)})),n.on("call",(e=>{console.log("i've been called so i create the host cameras"),console.log("call.metadata",e.metadata),console.log("la variable everyStream de celui qui join ",s.length),s.length>1&&0==e.metadata&&(console.log("everyStreamCopy",s[0]),e.answer(s[0]),n.call(e.peer,l),s.shift()),e.answer(s[0]),e.on("stream",(e=>{a!==e.id&&(a=e.id,console.log("userVideoStream",e),i(document.createElement("video"),e,!0))}))})),e.on("user-connected",(e=>{console.log("connection ! ",e),setTimeout(d,2e3,e,c,"this message is sent because someone connected")})),e.on("user-disconnected",(e=>{t[e]&&t[e].close()})),e.on("message-incoming",(e=>{document.querySelector("#messageReceiveArea").value=e})),n.on("open",(o=>{e.emit("join-room",ROOM_ID,o)}));let r=document.querySelector("#messageArea");document.querySelector("#sendMessageButton").addEventListener("click",(()=>{e.emit("message",r.value)}))})();