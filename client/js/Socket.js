console.log('INIT Socket.jssssss!');

var socket = io.connect(window.location.origin); //connects to localhost:8080 in this case


socket.on('syn_ack', ()=>{
    slog("syn_ack Server connected.");
    socket.emit('request_blockchain');
});

socket.on('receive_blockchain', (bc)=>{
    slog("receive_blockchain Blockchain Sent.");
    client.blockchain = bc;
});

socket.on('validate_blockchain', (packet, cb)=>{
    slog("Blockchain validation requested.");
    console.log(packet);
    cb(true);
    //bc = new Blockchain(packet.)
});

socket.on('test', ()=>{
    log("Test sent.");
});

socket.on('log', (message)=>{
    slog(message);
});

window.addEventListener("beforeunload", function (e) {
    //var confirmationMessage = "\o/";
    socket.emit("disconnect");
    //(e || window.event).returnValue = confirmationMessage; //Gecko + IE           (If you want confirmation message)
    //return confirmationMessage;                            //Webkit, Safari, Chrome
});

function slog(message){
    console.log('[SERVER MESSAGE]',message);
}

function log(message){
    console.log('[LOCAL]',message);
}
console.log('working');