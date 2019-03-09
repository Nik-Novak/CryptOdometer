
var socket = io.connect(window.location.origin); //connects to localhost:8080 in this case


socket.on('syn_ack', ()=>{
    $('#Status').html('Connected to network');
});

socket.on('receive_blockchain', (bc)=>{
    client.blockchain = bc;
});

socket.emit('syn');