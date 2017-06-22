var Coin = require("./coin.js");
var Furry = require("./furry.js");

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
