console.log('INIT Socket.jssssss!');

var Blockchain = require('./Blockchain').Blockchain;
var Block = require('./Blockchain').Block;

var socket = io.connect(window.location.origin); //connects to localhost:8080 in this case

socket.on('syn_ack', ()=>{
    slog("syn_ack Server connected.");
    socket.emit('request_blockchain');
});

socket.on('receive_blockchain', (bc)=>{
    slog("receive_blockchain Blockchain Sent.");
    log("RECEIVED BC!!!");
    log(client);
});

socket.on('validate_blockchain', (packet, cb)=>{
    slog("Blockchain validation requested.");
    console.log(packet);
    //cb(true);
    bc = new Blockchain(packet.data.difficulty);
    bc.chain = packet.data.chain;
    log(bc.chain);
    if(bc.isValid())
        cb(true);
    else
        cb(false);
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