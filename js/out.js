/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Coin = __webpack_require__(2);
var Furry = __webpack_require__(3);

function Game() {
  this.board = [...document.querySelectorAll("section#board div")];
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;

  var self = this;
  document.addEventListener("keydown",function(event){
    self.turnFurry(event);
  });
}

Game.prototype.index = function(x,y) {
  return x + (y * 10);
}

Game.prototype.showFurry = function() {
   this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
}

Game.prototype.showCoin = function() {
   this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
}

Game.prototype.startGame = function() {
  var self = this;
  this.idSetInterval = setInterval(function(){
    self.moveFurry();
  }, 250);
}

Game.prototype.moveFurry = function() {
  this.hideVisibleFurry();
  if(this.furry.direction === "right") {
    this.furry.x = this.furry.x + 1;
    this.gameOver();
  } else if(this.furry.direction === "left") {
    this.furry.x = this.furry.x - 1;
    this.gameOver();
  } else if(this.furry.direction === "down") {
    this.furry.y = this.furry.y + 1;
    this.gameOver();
  } else if(this.furry.direction === "up") {
    this.furry.y = this.furry.y - 1;
    this.gameOver();
  }
  this.showFurry();
  this.checkCoinColision();
}

Game.prototype.hideVisibleFurry = function() {
  var div = document.querySelector(".furry");
  div.classList.remove("furry");
}


Game.prototype.turnFurry = function(event) {
  switch(event.which) {
    case 37:
      this.furry.direction = "left";
      break;
    case 38:
      this.furry.direction = "up";
      break;
    case 39:
      this.furry.direction = "right";
      break;
    case 40:
      this.furry.direction = "down";
      break;
  }
}


Game.prototype.checkCoinColision = function() {
  if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
    var coinClass = document.querySelector(".coin");
    coinClass.classList.remove("coin");

    this.score = this.score + 1;
    var showScore = document.querySelector("#score strong");
    showScore.innerText = this.score;

    this.coin = new Coin();
    this.showCoin();
  }
}

Game.prototype.gameOver = function () {
  if ((this.furry.x < 0 || this.furry.x > 9) || (this.furry.y < 0 || this.furry.y > 9)) {

    clearInterval(this.idSetInterval);

    var theEnd = document.querySelector("#over");
    theEnd.classList.remove("invisible");
    theEnd.querySelector("h1 span").textContent = this.score;
  }
}


module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(0);
var game = new Game();

game.startGame();
game.showFurry();
game.showCoin();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Coin() {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Furry() {
  this.x = 0;
  this.y = 0;
  this.direction = "right";
}

module.exports = Furry;


/***/ })
/******/ ]);