'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log("Blockchain.js");
var SHA256 = require('crypto-js/sha256');

//const { 
//  performance
//} = require('perf_hooks');

// class Transaction{
//     constructor(fromAddress, toAddress, amount){
//         this.fromAddress = fromAddress;
//         this.toAddress = toAddress;
//         this.amount = amount;
//     }
// }

var Block = function () {
    function Block(index, timestamp, data) {
        var previousHash = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

        _classCallCheck(this, Block);

        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    _createClass(Block, [{
        key: 'calculateHash',
        value: function calculateHash() {
            return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
        }
    }, {
        key: 'mineBlock',
        value: function mineBlock(difficulty) {
            //        let deltaT = performance.now();
            while (this.hash.substring(0, difficulty) !== new Array(difficulty + 1).join("0")) {
                this.nonce++;
                this.hash = this.calculateHash();
            }
            //        deltaT = performance.now() - deltaT;
            console.log("Block successfully mined!" + this.hash);
        }
    }]);

    return Block;
}();

var Blockchain = function () {
    function Blockchain() {
        var difficulty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

        _classCallCheck(this, Blockchain);

        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
    }

    _createClass(Blockchain, [{
        key: 'createGenesisBlock',
        value: function createGenesisBlock() {
            return new Block(-1, new Date().valueOf(), "Genesis block", "0");
        }
    }, {
        key: 'getLatestBlock',
        value: function getLatestBlock() {
            return this.chain[this.chain.length - 1];
        }
    }, {
        key: 'addBlock',
        value: function addBlock(newBlock) {
            newBlock.previousHash = this.getLatestBlock().hash;
            newBlock.mineBlock(this.difficulty); //newBlock.hash = newBlock.calculateHash();
            this.chain.push(newBlock);
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            for (var i = 1; i < this.chain.length; i++) {
                var currentBlock = this.chain[i];
                var previousBlock = this.chain[i - 1];

                if (currentBlock.hash !== currentBlock.calculateHash()) {
                    console.log("Invalid block hash");
                    return false;
                }
                if (!currentBlock.hash.startsWith(new Array(this.difficulty + 1).join("0"))) {
                    console.log("Block's hash did not meet difficulty requirements");
                    return false;
                }
                if (currentBlock.previousHash !== previousBlock.hash) {
                    console.log("Chain hash invalid ");
                    return false;
                }
            }
            return true;
        }
    }]);

    return Blockchain;
}();

module.exports = {
    Block: Block,
    Blockchain: Blockchain
};