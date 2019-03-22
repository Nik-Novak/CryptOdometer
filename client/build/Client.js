"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//console.log("Client.jsjs");
var Blockchain = require("./Blockchain").Blockchain;
var Block = require("./Blockchain").Block;

var Client = function () {
    function Client() {
        _classCallCheck(this, Client);

        this.blockchain = null;
    }

    _createClass(Client, [{
        key: "run",
        value: function run() {
            var driving = false;
            var odometer = 0;
            $('#start-driving').click(function () {
                driving = true;
                $('#instructions-container h3').html('Press "stop driving" to simulate stopping.');
            });

            $('#stop-driving').click(function () {
                driving = false;
                $('#instructions-container h3').html('You may attempt to change the odometer reading at anytime, the system will notify you if it detects tampering.');
            });

            setInterval(function () {
                //increase odometer every 100ms
                if (!driving) return;
                odometer++;
                $('#odometer').val(odometer);
            }, 100);

            setInterval(function () {//Upload odometer reading to
                //BLockchain
            }, 10000);
        }
    }]);

    return Client;
}();

var client = new Client();
client.run();

// //TEST
// let bc = new Blockchain(2);
// bc.addBlock(new Block(0, new Date().valueOf(), { amount: 4 } ));
// bc.addBlock(new Block(1, new Date().valueOf(), { amount: 2 } ));
//
// //JSON.stringify(bc, null, 4)
// console.log( bc );
// console.log("isValid? " + bc.isValid());