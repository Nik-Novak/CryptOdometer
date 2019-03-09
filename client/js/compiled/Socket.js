(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

socket.on('validate_blockchain', (packet)=>{
    slog("Blockchain validation requested.");
    console.log(packet);
    //bc.validate();
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
},{}]},{},[1]);
