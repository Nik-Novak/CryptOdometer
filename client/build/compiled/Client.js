"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	function r(e, n, t) {
		function o(i, f) {
			if (!n[i]) {
				if (!e[i]) {
					var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
				}var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
					var n = e[i][1][r];return o(n || r);
				}, p, p.exports, r, e, n, t);
			}return n[i].exports;
		}for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
			o(t[i]);
		}return o;
	}return r;
})()({ 1: [function (require, module, exports) {
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
				key: "calculateHash",
				value: function calculateHash() {
					return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
				}
			}, {
				key: "mineBlock",
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
				key: "createGenesisBlock",
				value: function createGenesisBlock() {
					return new Block(-1, new Date().valueOf(), "Genesis block", "0");
				}
			}, {
				key: "getLatestBlock",
				value: function getLatestBlock() {
					return this.chain[this.chain.length - 1];
				}
			}, {
				key: "addBlock",
				value: function addBlock(newBlock) {
					newBlock.previousHash = this.getLatestBlock().hash;
					newBlock.mineBlock(this.difficulty); //newBlock.hash = newBlock.calculateHash();
					this.chain.push(newBlock);
				}
			}, {
				key: "isValid",
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
	}, { "crypto-js/sha256": 4 }], 2: [function (require, module, exports) {
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

	}, { "./Blockchain": 1 }], 3: [function (require, module, exports) {
		;(function (root, factory) {
			if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
				// CommonJS
				module.exports = exports = factory();
			} else if (typeof define === "function" && define.amd) {
				// AMD
				define([], factory);
			} else {
				// Global (browser)
				root.CryptoJS = factory();
			}
		})(this, function () {

			/**
    * CryptoJS core components.
    */
			var CryptoJS = CryptoJS || function (Math, undefined) {
				/*
     * Local polyfil of Object.create
     */
				var create = Object.create || function () {
					function F() {};

					return function (obj) {
						var subtype;

						F.prototype = obj;

						subtype = new F();

						F.prototype = null;

						return subtype;
					};
				}();

				/**
     * CryptoJS namespace.
     */
				var C = {};

				/**
     * Library namespace.
     */
				var C_lib = C.lib = {};

				/**
     * Base object for prototypal inheritance.
     */
				var Base = C_lib.Base = function () {

					return {
						/**
       * Creates a new object that inherits from this object.
       *
       * @param {Object} overrides Properties to copy into the new object.
       *
       * @return {Object} The new object.
       *
       * @static
       *
       * @example
       *
       *     var MyType = CryptoJS.lib.Base.extend({
       *         field: 'value',
       *
       *         method: function () {
       *         }
       *     });
       */
						extend: function extend(overrides) {
							// Spawn
							var subtype = create(this);

							// Augment
							if (overrides) {
								subtype.mixIn(overrides);
							}

							// Create default initializer
							if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
								subtype.init = function () {
									subtype.$super.init.apply(this, arguments);
								};
							}

							// Initializer's prototype is the subtype object
							subtype.init.prototype = subtype;

							// Reference supertype
							subtype.$super = this;

							return subtype;
						},

						/**
       * Extends this object and runs the init method.
       * Arguments to create() will be passed to init().
       *
       * @return {Object} The new object.
       *
       * @static
       *
       * @example
       *
       *     var instance = MyType.create();
       */
						create: function create() {
							var instance = this.extend();
							instance.init.apply(instance, arguments);

							return instance;
						},

						/**
       * Initializes a newly created object.
       * Override this method to add some logic when your objects are created.
       *
       * @example
       *
       *     var MyType = CryptoJS.lib.Base.extend({
       *         init: function () {
       *             // ...
       *         }
       *     });
       */
						init: function init() {},

						/**
       * Copies properties into this object.
       *
       * @param {Object} properties The properties to mix in.
       *
       * @example
       *
       *     MyType.mixIn({
       *         field: 'value'
       *     });
       */
						mixIn: function mixIn(properties) {
							for (var propertyName in properties) {
								if (properties.hasOwnProperty(propertyName)) {
									this[propertyName] = properties[propertyName];
								}
							}

							// IE won't copy toString using the loop above
							if (properties.hasOwnProperty('toString')) {
								this.toString = properties.toString;
							}
						},

						/**
       * Creates a copy of this object.
       *
       * @return {Object} The clone.
       *
       * @example
       *
       *     var clone = instance.clone();
       */
						clone: function clone() {
							return this.init.prototype.extend(this);
						}
					};
				}();

				/**
     * An array of 32-bit words.
     *
     * @property {Array} words The array of 32-bit words.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
				var WordArray = C_lib.WordArray = Base.extend({
					/**
      * Initializes a newly created word array.
      *
      * @param {Array} words (Optional) An array of 32-bit words.
      * @param {number} sigBytes (Optional) The number of significant bytes in the words.
      *
      * @example
      *
      *     var wordArray = CryptoJS.lib.WordArray.create();
      *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
      *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
      */
					init: function init(words, sigBytes) {
						words = this.words = words || [];

						if (sigBytes != undefined) {
							this.sigBytes = sigBytes;
						} else {
							this.sigBytes = words.length * 4;
						}
					},

					/**
      * Converts this word array to a string.
      *
      * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
      *
      * @return {string} The stringified word array.
      *
      * @example
      *
      *     var string = wordArray + '';
      *     var string = wordArray.toString();
      *     var string = wordArray.toString(CryptoJS.enc.Utf8);
      */
					toString: function toString(encoder) {
						return (encoder || Hex).stringify(this);
					},

					/**
      * Concatenates a word array to this word array.
      *
      * @param {WordArray} wordArray The word array to append.
      *
      * @return {WordArray} This word array.
      *
      * @example
      *
      *     wordArray1.concat(wordArray2);
      */
					concat: function concat(wordArray) {
						// Shortcuts
						var thisWords = this.words;
						var thatWords = wordArray.words;
						var thisSigBytes = this.sigBytes;
						var thatSigBytes = wordArray.sigBytes;

						// Clamp excess bits
						this.clamp();

						// Concat
						if (thisSigBytes % 4) {
							// Copy one byte at a time
							for (var i = 0; i < thatSigBytes; i++) {
								var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
								thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
							}
						} else {
							// Copy one word at a time
							for (var i = 0; i < thatSigBytes; i += 4) {
								thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
							}
						}
						this.sigBytes += thatSigBytes;

						// Chainable
						return this;
					},

					/**
      * Removes insignificant bits.
      *
      * @example
      *
      *     wordArray.clamp();
      */
					clamp: function clamp() {
						// Shortcuts
						var words = this.words;
						var sigBytes = this.sigBytes;

						// Clamp
						words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
						words.length = Math.ceil(sigBytes / 4);
					},

					/**
      * Creates a copy of this word array.
      *
      * @return {WordArray} The clone.
      *
      * @example
      *
      *     var clone = wordArray.clone();
      */
					clone: function clone() {
						var clone = Base.clone.call(this);
						clone.words = this.words.slice(0);

						return clone;
					},

					/**
      * Creates a word array filled with random bytes.
      *
      * @param {number} nBytes The number of random bytes to generate.
      *
      * @return {WordArray} The random word array.
      *
      * @static
      *
      * @example
      *
      *     var wordArray = CryptoJS.lib.WordArray.random(16);
      */
					random: function random(nBytes) {
						var words = [];

						var r = function r(m_w) {
							var m_w = m_w;
							var m_z = 0x3ade68b1;
							var mask = 0xffffffff;

							return function () {
								m_z = 0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10) & mask;
								m_w = 0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10) & mask;
								var result = (m_z << 0x10) + m_w & mask;
								result /= 0x100000000;
								result += 0.5;
								return result * (Math.random() > .5 ? 1 : -1);
							};
						};

						for (var i = 0, rcache; i < nBytes; i += 4) {
							var _r = r((rcache || Math.random()) * 0x100000000);

							rcache = _r() * 0x3ade67b7;
							words.push(_r() * 0x100000000 | 0);
						}

						return new WordArray.init(words, nBytes);
					}
				});

				/**
     * Encoder namespace.
     */
				var C_enc = C.enc = {};

				/**
     * Hex encoding strategy.
     */
				var Hex = C_enc.Hex = {
					/**
      * Converts a word array to a hex string.
      *
      * @param {WordArray} wordArray The word array.
      *
      * @return {string} The hex string.
      *
      * @static
      *
      * @example
      *
      *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
      */
					stringify: function stringify(wordArray) {
						// Shortcuts
						var words = wordArray.words;
						var sigBytes = wordArray.sigBytes;

						// Convert
						var hexChars = [];
						for (var i = 0; i < sigBytes; i++) {
							var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
							hexChars.push((bite >>> 4).toString(16));
							hexChars.push((bite & 0x0f).toString(16));
						}

						return hexChars.join('');
					},

					/**
      * Converts a hex string to a word array.
      *
      * @param {string} hexStr The hex string.
      *
      * @return {WordArray} The word array.
      *
      * @static
      *
      * @example
      *
      *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
      */
					parse: function parse(hexStr) {
						// Shortcut
						var hexStrLength = hexStr.length;

						// Convert
						var words = [];
						for (var i = 0; i < hexStrLength; i += 2) {
							words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
						}

						return new WordArray.init(words, hexStrLength / 2);
					}
				};

				/**
     * Latin1 encoding strategy.
     */
				var Latin1 = C_enc.Latin1 = {
					/**
      * Converts a word array to a Latin1 string.
      *
      * @param {WordArray} wordArray The word array.
      *
      * @return {string} The Latin1 string.
      *
      * @static
      *
      * @example
      *
      *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
      */
					stringify: function stringify(wordArray) {
						// Shortcuts
						var words = wordArray.words;
						var sigBytes = wordArray.sigBytes;

						// Convert
						var latin1Chars = [];
						for (var i = 0; i < sigBytes; i++) {
							var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
							latin1Chars.push(String.fromCharCode(bite));
						}

						return latin1Chars.join('');
					},

					/**
      * Converts a Latin1 string to a word array.
      *
      * @param {string} latin1Str The Latin1 string.
      *
      * @return {WordArray} The word array.
      *
      * @static
      *
      * @example
      *
      *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
      */
					parse: function parse(latin1Str) {
						// Shortcut
						var latin1StrLength = latin1Str.length;

						// Convert
						var words = [];
						for (var i = 0; i < latin1StrLength; i++) {
							words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
						}

						return new WordArray.init(words, latin1StrLength);
					}
				};

				/**
     * UTF-8 encoding strategy.
     */
				var Utf8 = C_enc.Utf8 = {
					/**
      * Converts a word array to a UTF-8 string.
      *
      * @param {WordArray} wordArray The word array.
      *
      * @return {string} The UTF-8 string.
      *
      * @static
      *
      * @example
      *
      *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
      */
					stringify: function stringify(wordArray) {
						try {
							return decodeURIComponent(escape(Latin1.stringify(wordArray)));
						} catch (e) {
							throw new Error('Malformed UTF-8 data');
						}
					},

					/**
      * Converts a UTF-8 string to a word array.
      *
      * @param {string} utf8Str The UTF-8 string.
      *
      * @return {WordArray} The word array.
      *
      * @static
      *
      * @example
      *
      *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
      */
					parse: function parse(utf8Str) {
						return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
					}
				};

				/**
     * Abstract buffered block algorithm template.
     *
     * The property blockSize must be implemented in a concrete subtype.
     *
     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
     */
				var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
					/**
      * Resets this block algorithm's data buffer to its initial state.
      *
      * @example
      *
      *     bufferedBlockAlgorithm.reset();
      */
					reset: function reset() {
						// Initial values
						this._data = new WordArray.init();
						this._nDataBytes = 0;
					},

					/**
      * Adds new data to this block algorithm's buffer.
      *
      * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
      *
      * @example
      *
      *     bufferedBlockAlgorithm._append('data');
      *     bufferedBlockAlgorithm._append(wordArray);
      */
					_append: function _append(data) {
						// Convert string to WordArray, else assume WordArray already
						if (typeof data == 'string') {
							data = Utf8.parse(data);
						}

						// Append
						this._data.concat(data);
						this._nDataBytes += data.sigBytes;
					},

					/**
      * Processes available data blocks.
      *
      * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
      *
      * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
      *
      * @return {WordArray} The processed data.
      *
      * @example
      *
      *     var processedData = bufferedBlockAlgorithm._process();
      *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
      */
					_process: function _process(doFlush) {
						// Shortcuts
						var data = this._data;
						var dataWords = data.words;
						var dataSigBytes = data.sigBytes;
						var blockSize = this.blockSize;
						var blockSizeBytes = blockSize * 4;

						// Count blocks ready
						var nBlocksReady = dataSigBytes / blockSizeBytes;
						if (doFlush) {
							// Round up to include partial blocks
							nBlocksReady = Math.ceil(nBlocksReady);
						} else {
							// Round down to include only full blocks,
							// less the number of blocks that must remain in the buffer
							nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
						}

						// Count words ready
						var nWordsReady = nBlocksReady * blockSize;

						// Count bytes ready
						var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

						// Process blocks
						if (nWordsReady) {
							for (var offset = 0; offset < nWordsReady; offset += blockSize) {
								// Perform concrete-algorithm logic
								this._doProcessBlock(dataWords, offset);
							}

							// Remove processed words
							var processedWords = dataWords.splice(0, nWordsReady);
							data.sigBytes -= nBytesReady;
						}

						// Return processed words
						return new WordArray.init(processedWords, nBytesReady);
					},

					/**
      * Creates a copy of this object.
      *
      * @return {Object} The clone.
      *
      * @example
      *
      *     var clone = bufferedBlockAlgorithm.clone();
      */
					clone: function clone() {
						var clone = Base.clone.call(this);
						clone._data = this._data.clone();

						return clone;
					},

					_minBufferSize: 0
				});

				/**
     * Abstract hasher template.
     *
     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
     */
				var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
					/**
      * Configuration options.
      */
					cfg: Base.extend(),

					/**
      * Initializes a newly created hasher.
      *
      * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
      *
      * @example
      *
      *     var hasher = CryptoJS.algo.SHA256.create();
      */
					init: function init(cfg) {
						// Apply config defaults
						this.cfg = this.cfg.extend(cfg);

						// Set initial values
						this.reset();
					},

					/**
      * Resets this hasher to its initial state.
      *
      * @example
      *
      *     hasher.reset();
      */
					reset: function reset() {
						// Reset data buffer
						BufferedBlockAlgorithm.reset.call(this);

						// Perform concrete-hasher logic
						this._doReset();
					},

					/**
      * Updates this hasher with a message.
      *
      * @param {WordArray|string} messageUpdate The message to append.
      *
      * @return {Hasher} This hasher.
      *
      * @example
      *
      *     hasher.update('message');
      *     hasher.update(wordArray);
      */
					update: function update(messageUpdate) {
						// Append
						this._append(messageUpdate);

						// Update the hash
						this._process();

						// Chainable
						return this;
					},

					/**
      * Finalizes the hash computation.
      * Note that the finalize operation is effectively a destructive, read-once operation.
      *
      * @param {WordArray|string} messageUpdate (Optional) A final message update.
      *
      * @return {WordArray} The hash.
      *
      * @example
      *
      *     var hash = hasher.finalize();
      *     var hash = hasher.finalize('message');
      *     var hash = hasher.finalize(wordArray);
      */
					finalize: function finalize(messageUpdate) {
						// Final message update
						if (messageUpdate) {
							this._append(messageUpdate);
						}

						// Perform concrete-hasher logic
						var hash = this._doFinalize();

						return hash;
					},

					blockSize: 512 / 32,

					/**
      * Creates a shortcut function to a hasher's object interface.
      *
      * @param {Hasher} hasher The hasher to create a helper for.
      *
      * @return {Function} The shortcut function.
      *
      * @static
      *
      * @example
      *
      *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
      */
					_createHelper: function _createHelper(hasher) {
						return function (message, cfg) {
							return new hasher.init(cfg).finalize(message);
						};
					},

					/**
      * Creates a shortcut function to the HMAC's object interface.
      *
      * @param {Hasher} hasher The hasher to use in this HMAC helper.
      *
      * @return {Function} The shortcut function.
      *
      * @static
      *
      * @example
      *
      *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
      */
					_createHmacHelper: function _createHmacHelper(hasher) {
						return function (message, key) {
							return new C_algo.HMAC.init(hasher, key).finalize(message);
						};
					}
				});

				/**
     * Algorithm namespace.
     */
				var C_algo = C.algo = {};

				return C;
			}(Math);

			return CryptoJS;
		});
	}, {}], 4: [function (require, module, exports) {
		;(function (root, factory) {
			if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
				// CommonJS
				module.exports = exports = factory(require("./core"));
			} else if (typeof define === "function" && define.amd) {
				// AMD
				define(["./core"], factory);
			} else {
				// Global (browser)
				factory(root.CryptoJS);
			}
		})(this, function (CryptoJS) {

			(function (Math) {
				// Shortcuts
				var C = CryptoJS;
				var C_lib = C.lib;
				var WordArray = C_lib.WordArray;
				var Hasher = C_lib.Hasher;
				var C_algo = C.algo;

				// Initialization and round constants tables
				var H = [];
				var K = [];

				// Compute constants
				(function () {
					function isPrime(n) {
						var sqrtN = Math.sqrt(n);
						for (var factor = 2; factor <= sqrtN; factor++) {
							if (!(n % factor)) {
								return false;
							}
						}

						return true;
					}

					function getFractionalBits(n) {
						return (n - (n | 0)) * 0x100000000 | 0;
					}

					var n = 2;
					var nPrime = 0;
					while (nPrime < 64) {
						if (isPrime(n)) {
							if (nPrime < 8) {
								H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
							}
							K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

							nPrime++;
						}

						n++;
					}
				})();

				// Reusable object
				var W = [];

				/**
     * SHA-256 hash algorithm.
     */
				var SHA256 = C_algo.SHA256 = Hasher.extend({
					_doReset: function _doReset() {
						this._hash = new WordArray.init(H.slice(0));
					},

					_doProcessBlock: function _doProcessBlock(M, offset) {
						// Shortcut
						var H = this._hash.words;

						// Working variables
						var a = H[0];
						var b = H[1];
						var c = H[2];
						var d = H[3];
						var e = H[4];
						var f = H[5];
						var g = H[6];
						var h = H[7];

						// Computation
						for (var i = 0; i < 64; i++) {
							if (i < 16) {
								W[i] = M[offset + i] | 0;
							} else {
								var gamma0x = W[i - 15];
								var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;

								var gamma1x = W[i - 2];
								var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;

								W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
							}

							var ch = e & f ^ ~e & g;
							var maj = a & b ^ a & c ^ b & c;

							var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
							var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);

							var t1 = h + sigma1 + ch + K[i] + W[i];
							var t2 = sigma0 + maj;

							h = g;
							g = f;
							f = e;
							e = d + t1 | 0;
							d = c;
							c = b;
							b = a;
							a = t1 + t2 | 0;
						}

						// Intermediate hash value
						H[0] = H[0] + a | 0;
						H[1] = H[1] + b | 0;
						H[2] = H[2] + c | 0;
						H[3] = H[3] + d | 0;
						H[4] = H[4] + e | 0;
						H[5] = H[5] + f | 0;
						H[6] = H[6] + g | 0;
						H[7] = H[7] + h | 0;
					},

					_doFinalize: function _doFinalize() {
						// Shortcuts
						var data = this._data;
						var dataWords = data.words;

						var nBitsTotal = this._nDataBytes * 8;
						var nBitsLeft = data.sigBytes * 8;

						// Add padding
						dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
						dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
						dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
						data.sigBytes = dataWords.length * 4;

						// Hash final blocks
						this._process();

						// Return final computed hash
						return this._hash;
					},

					clone: function clone() {
						var clone = Hasher.clone.call(this);
						clone._hash = this._hash.clone();

						return clone;
					}
				});

				/**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA256('message');
     *     var hash = CryptoJS.SHA256(wordArray);
     */
				C.SHA256 = Hasher._createHelper(SHA256);

				/**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA256(message, key);
     */
				C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
			})(Math);

			return CryptoJS.SHA256;
		});
	}, { "./core": 3 }] }, {}, [2]);