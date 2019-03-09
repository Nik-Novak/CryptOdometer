console.log("Blockchain.js");
const SHA256 = require('crypto-js/sha256');

//const { 
//  performance
//} = require('perf_hooks');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.timestamp = timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.nonce=0;
        this.hash=this.calculateHash();
    }
    
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce ).toString();
    }
    
    mineBlock(difficulty){
//        let deltaT = performance.now();
        while(this.hash.substring(0, difficulty) !== new Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
//        deltaT = performance.now() - deltaT;
        console.log("Block successfully mined!" + this.hash);
    }
}

class Blockchain{
    constructor(difficulty=1){
        this.chain = [ this.createGenesisBlock() ];
        this.difficulty = difficulty;
    }
    
    createGenesisBlock(){
        return new Block(-1, new Date().valueOf(), "Genesis block", "0")
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);//newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    
    isValid(){
        for (let i=1; i< this.chain.length; i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i-1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()){
                console.log("Invalid block hash");
                return false;
            }
            if(!currentBlock.hash.startsWith(new Array(this.difficulty+1).join("0"))){
                console.log("Block's hash did not meet difficulty requirements");
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                console.log("Chain hash invalid ");
                return false;
            }
        }
        return true;
    }
}

let bc = new Blockchain(2);
bc.addBlock(new Block(0, new Date().valueOf(), { amount: 4 } ));
bc.addBlock(new Block(1, new Date().valueOf(), { amount: 2 } ));

//JSON.stringify(bc, null, 4)
console.log( bc );
console.log("isValid? " + bc.isValid());