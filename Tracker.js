var fs = require('fs-extra');
var express = require('express');
var Blockchain = require('./client/js/Blockchain').Blockchain;
var Block = require('./client/js/Blockchain').Block;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ip = require('ip');

class ConsensusRequest{
    constructor(blockchain, clients, approvalRatio){
        this.blockchain = blockchain;
        this.clients = clients;
        this.counter = 0;
        this.approvalRatio = approvalRatio;
        io.emit('test');
    }

    validateBlockchain(callback, timeout=10000){
        let timer = setTimeout(()=>{ //timeout if not approved in time
            callback(false); //send failure
        },timeout);

        this.clients.forEach(client=>{
            log("Client validation request sent.");
            client.emit("validate_blockchain", {
                data: this.blockchain, callback: () => {
                    this.counter++;
                    if (this.counter / clients.length >= this.approvalRatio) {
                        clearTimeout(timer);
                        callback(true); //send success
                    }
                }
            });
        });
    }
}

class Tracker {
    constructor(){
        this.clients=[]; //array of cleitn sockets
        this.blockchain = new Blockchain();
        this.boolSyncResponses = [];
    }
    addClient(client){
        this.clients.push(client);
        client.emit("test");
    }
    removeClient(client){
        this.clients.splice( this.clients.indexOf(client), 1 );
    }

    run(){
// ********* SERVER ROUTING *********
//server.listen(8080); //server.listen(8080, '192.168.1.109'); //LAN MODE
        server.listen(8080, ip.address());

        app.use( (req, res, next)=>{ //Any url not defined (or i guess final module to be used)
            console.log('Client requested:', req.originalUrl);
            next();
        } );

        app.get('/', (req, res)=>{
            res.sendFile(__dirname + '/client/index.html');
        });

        app.use(express.static(__dirname + '/client')); //Serves ALL static resources from public folder

        app.use( (req, res, next)=>{ //Any url not defined (or i guess final module to be used)
            res.writeHead( 404 );
            res.end();
        } );

// ********* SOCKETS *********

        io.on('connect', (socket)=>{
            log('Client socket connected');
            this.addClient(socket);
            console.log(this.clients.length);
            socket.emit('syn_ack');

            socket.on('request_blockchain', ()=>{
                log("Client requesting blockchain.");
                socket.emit('test');
                new ConsensusRequest(this.blockchain, this.clients, 0.51).validateBlockchain((result)=>{
                    if(result)
                        socket.emit('receive_blockchain', this.blockchain);
                    else
                        socket.emit('receive_blockchain_error');
                });
                log('Client requesting blockchain.');
            });

            socket.on('disconnect', () => {
                console.log('Client socket disconnected.');
                this.removeClient(socket);
                console.log(this.clients.length);
                socket.emit('log', 'Disconnected from server socket'); 
            });
        });

        var opn = require('opn');
        opn('http://'+ip.address()+':8080');


//TODO: Client menu detect exits game --should be done
//TODO: refresh exclamation marks on updates --should be done
//TODO: LAN/online mode --should be working
//TODO: Detailed target info
    }
}

function log(msg){
    console.log('[LOG]',msg);
}

var tracker = new Tracker();
tracker.run();
