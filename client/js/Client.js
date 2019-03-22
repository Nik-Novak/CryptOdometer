//console.log("Client.jsjs");
var Blockchain = require("./Blockchain").Blockchain;
var Block = require("./Blockchain").Block;

class Client{
    constructor(){
        this.blockchain = null;
    }
    run(){
        let driving = false;
        let odometer = 0;
        $('#start-driving').click(()=>{
            driving = true;
            $('#instructions-container h3').html('Press "stop driving" to simulate stopping.');
        });

        $('#stop-driving').click(()=>{
            driving = false;
            $('#instructions-container h3').html('You may attempt to change the odometer reading at anytime, the system will notify you if it detects tampering.')
        });

        setInterval(()=>{ //increase odometer every 100ms
            if(!driving)
                return;
            odometer++;
            $('#odometer').val(odometer);
        }, 100);

        setInterval(()=>{ //Upload odometer reading to

        }, 10000);
    }
}

var client = new Client();

// //TEST
// let bc = new Blockchain(2);
// bc.addBlock(new Block(0, new Date().valueOf(), { amount: 4 } ));
// bc.addBlock(new Block(1, new Date().valueOf(), { amount: 2 } ));
//
// //JSON.stringify(bc, null, 4)
// console.log( bc );
// console.log("isValid? " + bc.isValid());

module.exports = {
    Client: Client,
    client: client
};