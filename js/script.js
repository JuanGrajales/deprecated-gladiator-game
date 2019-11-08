/**
 * Step 1: create a canvas so that you can use canvas function (e.g. clearRect)
 * Step 2: create game
 * Step 3: create a loop to update the animation
 */

// create the canvas that you will be working, assign it to ctx
const ctx = document.getElementById('rock-board').getContext('2d');
// keeps count of the frames
let frames = 0;
let startGame = true;
let int;
let i = 10000;
let imgType;
// controls how fast the character moves
let characterSpeed = 6;
let timerValue = 2000;
let bonusArray = [];
let bombBonusFlag = false;
// let startWithBonusFlag = true;
// variables that hold the canvas width and height in case the canvas size changes
let canvasWidth = document.querySelector("#rock-board").width;
let canvasHeight = document.querySelector("#rock-board").height;

// create a Game object, initializes new player and monster
let theGame = new Game(canvasWidth, canvasHeight);

// testing choose a character method
// theGame.chooseCharacter("test");

// create player and monster variables
let player = theGame.thePlayer;
let monster = theGame.theMonster;
let sound = theGame.theSound;
let monster2 = theGame.theMonster2;
let monster3 = theGame.theMonster3; 
let canvas = document.getElementsByTagName('canvas');
// testing 
let spriteX = 0;
let spriteY = 704;
let createEarthquake;
let pauseFlag = false;

// testing 
let monsterSpeed = 5;
let monsterDeadCount = 0;

// function that recursively calls itself to update the animation screen
// the loop can be called anything you want, doesn't have to be mainLoop
function mainLoop() {
  if(!pauseFlag) {
    frames++;
    // clearRect erases the pixels of the canvas starting from (0, 0) until (canvasWidth, canvasHeight)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // draw the player, money and monster
    theGame.drawPlayer(ctx, spriteX, spriteY);
    theGame.drawMoney(ctx);
    theGame.drawMonster(ctx);
    theGame.theSound.playBackground();
    theGame.drawObstacle(ctx);



    /**Testing ***********************************************************************/

    // move the monster position before drawing
    if(frames % monsterSpeed === 0) {
      if(monster3.health <= 0) {

        if(monsterDeadCount < 5) {

          monster3.deadSprite(monsterDeadCount);
          console.log(monster3.spriteX, monster3.spriteY)
          monsterDeadCount++;
        }

      }
      else {

        if(theGame.monsterCollision(player.x, player.y)) {

          // monster3.moveMonster(monster3.x, monster);  
          // monster3.changeSpriteFrame(monster3.monsterDirection(player.x, player.y));
        }
        else {

          monster3.moveMonster(player.x, player.y);  
          monster3.changeSpriteFrame(monster3.monsterDirection(player.x, player.y));
        }

      }
    }


    monster3.drawMonsterr()    

    /**Testing ***********************************************************************/

    
    if(frames % 5 === 0){
      theGame.drawDirt(ctx);
    }
    // theGame.drawBackground(ctx);
    if (theGame.level === 3) {
      theGame.drawMonster2(ctx);
    }
    /**
   * You should call this method whenever you're ready to update your animation onscreen. 
   * This will request that your animation function be called before the browser performs 
   * the next repaint. The number of callbacks is usually 60 times per second, but will 
   * generally match the display refresh rate in most web browsers as per W3C recommendation. 
   * */
  if (theGame.moneyArray.length === 0) {
    startGame = false;
    openPopup();
  }
  }
  
  if (startGame) {
    setTimerValue();
    createEarthquake = setInterval(()=>{
      i = i*-1
      canvas[0].style.backgroundPositionX = `${i}px`
      canvas[0].style.transition = 'all 10s'
    },1000);
    int = window.requestAnimationFrame(mainLoop);
    pauseFlag = false;
  } else {
    clearInterval(createEarthquake);
    i=0;
    window.cancelAnimationFrame(int)
  }
}

// randomly move the monster on the game board
monster.moveMonster(canvasWidth, canvasHeight);
monster2.moveMonster(canvasWidth, canvasHeight);

function movePumpkinObs() {
  theGame.obstacleArray.forEach(obs =>{
    if(obs.i.obstacleType === 3) {
      obs.i.movePumpkin(obs.i.y, canvasHeight, obs.i.obstacleType);
    }    
  })
  }  
  

function restart() {
  theGame.reset();
}

function change(event, point) {
  if (event.currentTarget.checked) {
    bonusArray.push({
      bonus: event.currentTarget.value,
      points: point
    });
  } else {
    bonusArray.forEach((bonus,index) => {
      if(bonus.bonus === event.currentTarget.value) {
        bonusArray.splice(index,1);
      }
    })
  }
}


function buy() {
  bonusArray.forEach(bonus => {
    if (bonus.bonus === 'energy-drink') {
      theGame.tracker -= bonus.points;
      characterSpeed = 12;
      setTimeout(() => {
        characterSpeed = 6;
        document.getElementById('energy-drink-option').checked = false;
      }, 10000);
      document.getElementsByClassName('score-value')[0].innerText = theGame.tracker;
    }
    if (bonus.bonus === 'bomb') {
      theGame.tracker -= bonus.points;
      bombBonusFlag = true;
      setTimeout(() => {
        bombBonusFlag = false; 
        document.getElementById('bomb-option').checked = false;
      }, 10000);
      document.getElementsByClassName('score-value')[0].innerText = theGame.tracker;
    }
    if (bonus.bonus === 'lucky-charm') {
      theGame.tracker -= bonus.points;
      theGame.luckyCharmFlag = true;
      setTimeout(() => {
        theGame.luckyCharmFlag = false;
        theGame.theSound.stopLuckySound();
      }, 10000);
      document.getElementsByClassName('score-value')[0].innerText = theGame.tracker;
    }
  })
}



function notBuy() {
  clearCheckBoxes();
}
function clearCheckBoxes() {
  bonusArray = [];
  document.getElementById('energy-drink-option').checked = false;
  document.getElementById('bomb-option').checked = false;
  document.getElementById('lucky-charm-option').checked = false;
}

function moveKey() {
  // depending on the direction the user presses move in that direction

  // player is not attacking
  // document.onkeyup = function (e) {
  //   if(e.key === " ") {
  //     player.attack = false;
  //   }

  // }

  document.onkeydown = function (e) {
    
    if (e.key === "ArrowUp") {
      if (theGame.collisionDetection(player.x, player.y - characterSpeed))
        player.movePlayer(player.x, player.y - characterSpeed, canvasWidth, canvasHeight);
      theGame.theSound.playWalkingSound();

      if (spriteY > 512 || spriteY < 512) {
        spriteY = 512;
        spriteX = 0;
      } 
      else if (spriteX + 64 > 512)
        spriteX = 64;
      else
        spriteX += 64;

      player.pDirection = e.key;
    }
    if (e.key === "ArrowDown") {
      if (theGame.collisionDetection(player.x, player.y + characterSpeed))
        player.movePlayer(player.x, player.y + characterSpeed, canvasWidth, canvasHeight);
      theGame.theSound.playWalkingSound();

      if (spriteY > 640 || spriteY < 640) {
        spriteY = 640;
        spriteX = 0;
      } 
      else if (spriteX + 64 > 512)
        spriteX = 64;
      else
        spriteX += 64;

      player.pDirection = e.key;
    }
    if (e.key === "ArrowLeft") {
      if (theGame.collisionDetection(player.x - characterSpeed, player.y))
        player.movePlayer(player.x - characterSpeed, player.y, canvasWidth, canvasHeight);
      theGame.theSound.playWalkingSound();

      if (spriteY > 576 || spriteY < 576) {
        spriteY = 576;
        spriteX = 0;
      } 
      else if (spriteX + 64 > 512)
        spriteX = 64;
      else
        spriteX += 64;

      player.pDirection = e.key;
    }
    if (e.key === "ArrowRight") {
      if (theGame.collisionDetection(player.x + characterSpeed, player.y))
        player.movePlayer(player.x + characterSpeed, player.y, canvasWidth, canvasHeight);
      theGame.theSound.playWalkingSound();

      if (spriteY > 704 || spriteY < 704) {
        spriteY = 704;
        spriteX = 0;
      } 
      if (spriteX + 64 > 512)
        spriteX = 64;
      else
        spriteX += 64;

      player.pDirection = e.key;
    }
    if(e.key === " ") {
      switch(player.pDirection) {
        case "ArrowUp":
        if (spriteY > 256 || spriteY < 256) {
          spriteY = 256;
          spriteX = 64;
        } 
        else if (spriteX + 64 > 448)
          spriteX = 64;
        else
          spriteX += 64;
        break;
      case "ArrowLeft":
        if (spriteY > 320 || spriteY < 320) {
          spriteY = 320;
          spriteX = 64;
        } 
        else if (spriteX + 64 > 448)
          spriteX = 64;
        else
          spriteX += 64;
        break;
      case "ArrowDown":
        if (spriteY > 384 || spriteY < 384) {
          spriteY = 384;
          spriteX = 64;
        } 
        else if (spriteX + 64 > 448)
          spriteX = 64;
        else
          spriteX += 64;
        break;
      case "ArrowRight":
        
        if (spriteY > 448 || spriteY < 448) {
          spriteY = 448;
          spriteX = 64;
        } else if (spriteX + 64 > 448)
          spriteX = 64;
        else
          spriteX += 64;

        break;
      }
      if(spriteX === 256)
      {
        theGame.playerAttack();
        
      }
      
    }
    if (e.key === "Shift") {
      if (bombBonusFlag) {
        theGame.obstacleArray.forEach((obstacle, index) => {
          theGame.obstacleArray.splice(index, 1);
          theGame.theSound.playExplosion();
        })
      }
    }
  }
}


function openPopup() {
  clearCheckBoxes();
  document.getElementById('exampleModal').classList.add('show');
  document.getElementById('exampleModal').classList.add('show-popup');
  document.getElementById('exampleModal').classList.remove('hide-popup');
  startGame = false;
  if (timerValue !== 0) {
    timerValue = 0;
    document.getElementsByClassName('timer-value')[0].innerText = timerValue;
  }
  dimScreen();
  if (Number(document.getElementsByClassName('score-value')[0].innerText) >= Number(document.getElementsByClassName('goal-value')[0].innerText)) {
    document.getElementsByClassName('reset')[0].setAttribute('style','display:none');
    document.getElementsByClassName('win-temp')[0].classList.remove('hide-popup');
    document.getElementsByClassName('lose')[0].classList.add('hide-popup');
    document.getElementsByClassName('start')[0].classList.remove('hide-popup');
    if(theGame.level !== 3){
      document.getElementsByClassName('win-temp')[0].innerText = `Woo hoo! You cleared Level ${theGame.level}`;
      if(theGame.level === 1){
        document.getElementsByClassName('bonus-instructions')[0].removeAttribute('style','display:none');
        document.getElementsByClassName('unlocked-bonus')[0].removeAttribute('style','display:none');
        document.getElementsByClassName('sales')[0].removeAttribute('style','display:none');
      }
    } else {
      document.getElementsByClassName('win-temp')[0].innerText = `Congratulations! You cracked all the levels`;
      //theGame.theSound1.playBackground();
      document.getElementsByClassName('bonus-instructions')[0].setAttribute('style','display:none');
      document.getElementsByClassName('start')[0].setAttribute('style','display:none');
      document.getElementsByClassName('unlocked-bonus')[0].setAttribute('style','display:none');
      document.getElementsByClassName('sales')[0].setAttribute('style','display:none');
     
      document.getElementsByClassName('reset')[0].removeAttribute('style','display:none');
    
    }
  } else {
    if(theGame.level === 1) {
      document.getElementsByClassName('bonus-instructions')[0].setAttribute('style','display:none');
      document.getElementsByClassName('unlocked-bonus')[0].setAttribute('style','display:none');
      document.getElementsByClassName('sales')[0].setAttribute('style','display:none');
    }
    document.getElementsByClassName('lose')[0].classList.remove('hide-popup');
    document.getElementsByClassName('win-temp')[0].classList.add('hide-popup');
    document.getElementsByClassName('start')[0].classList.add('hide-popup');
    document.getElementsByClassName('lose')[0].innerText = `Sorry! Please try again`;
    document.getElementsByClassName('reset')[0].setAttribute('style','display:none');
  }
}

function dimScreen() {
  document.getElementById('modal-overlay').classList.remove('hide-popup');
  document.getElementById('modal-overlay').classList.add('show-popup');
}

function timeOut() {
  document.getElementById('exampleModal').classList.remove('show');
  document.getElementById('exampleModal').classList.remove('show-popup');
  document.getElementById('exampleModal').classList.add('hide-popup');
  if (document.getElementById('modal-overlay').classList.contains('show-popup')) {
    document.getElementById('modal-overlay').classList.remove('show-popup');
    document.getElementById('modal-overlay').classList.add('hide-popup');
  }
}

function setTimerValue() {
  timerValue--;
  document.getElementsByClassName('timer-value')[0].innerText = timerValue;
  if (timerValue < 200) {
    document.getElementsByClassName('timer-value')[0].setAttribute('style', 'color: rgba(180, 34, 8, 0.877)');
    theGame.theSound.stopBackground();
    theGame.theSound.playTimerSound();
    if (timerValue === 0) {
      theGame.theSound.stopTimer();
      openPopup();
      if(theGame.level === 3 && Number(document.getElementsByClassName('score-value')[0].innerText) >= Number(document.getElementsByClassName('goal-value')[0].innerText)){
        setInterval(()=>{
         theGame.theSound.stopBackground(); 
        },1)
        theGame.theSound.playWinningSound();
      }
    }
  } else {
    document.getElementsByClassName('timer-value')[0].removeAttribute('style', 'color: rgba(180, 34, 8, 0.877)');
  }
}

// start of the game
function initialLoad() {
  theGame.scoreByLevel = 0;
  timerValue = 2000;
  frames = 0;
  startGame = true;
  player.x = 0;
  player.y = 0;
  i=10000;
  timeOut();
}

function nextLoad() {
  document.getElementsByClassName('goal-value')[0].innerText = theGame.setGoal(theGame.level);
  theGame.createRandomNumber(theGame.level);
  theGame.createMoney();
  // theGame.createBackground();
  monster3.health = 100;
  theGame.createObstacle();
  if(characterSpeed >10){
    theGame.theSound.playPowerUp();
  } 
  if (theGame.luckyCharmFlag === true){
    theGame.theSound.playLuckySound();
  }
  movePumpkinObs();
  mainLoop();
  moveKey();
}

function changeCanvasImage() {
  if (theGame.level === 2) {
    document.getElementById('rock-board').setAttribute('style', 'background-image:url("../images/creepy-image2.jpeg")');
    theGame.theSound = new Sound('../music/level2-main.mp3', '../music/super mario bros coin sound FX.mp3', '../music/ouch.mov')
  }
  if (theGame.level === 3) {
    document.getElementById('rock-board').setAttribute('style', 'background-image:url("../images/cave-background.png")');
    theGame.theSound = new Sound('../music/level3-main.mp3', '../music/super mario bros coin sound FX.mp3', '../music/ouch.mov')
  }
}


let playerSelectedGlobal = "";


function changeCharacter(playerType) {

  playerSelectedGlobal += playerType;

  
  
  

  if(playerSelectedGlobal.length === 3) {

    playerType = playerSelectedGlobal;

    if(playerType === 'hss') {
     theGame.playerSelected = 1;
    }
    else if(playerType === 'hsd') {
      theGame.playerSelected = 2;
    }
    else if(playerType === 'hgs') {
      theGame.playerSelected = 3;
    }
    else if(playerType === 'hgd') {
      theGame.playerSelected = 4;
    }
  
  
    else if(playerType === 'oss') {
      theGame.playerSelected = 5;
     }
     else if(playerType === 'osd') {
       theGame.playerSelected = 6;
     }
     else if(playerType === 'ogs') {
       theGame.playerSelected = 7;
     }
     else if(playerType === 'ogd') {
       theGame.playerSelected = 8;
     }
  
  
     else if(playerType === 'sss') {
      theGame.playerSelected = 9;
     }
     else if(playerType === 'ssd') {
       theGame.playerSelected = 10;
     }
     else if(playerType === 'sgs') {
       theGame.playerSelected = 11;
     }
     else if(playerType === 'sgd') {
       theGame.playerSelected = 12;
     }

     else {
      theGame.playerSelected = 3;
     }
  
  
    document.getElementById('characterModal').classList.remove('show');
    document.getElementById('characterModal').classList.remove('show-popup');
    document.getElementById('characterModal').classList.remove('hide-popup');
    document.getElementById('modal-overlay').classList.add('hide-popup');
    theGame.applySelectedPlayer(theGame.playerSelected);
    movePumpkinObs();
  mainLoop();
  moveKey();
  }

  // add error checking if player makes more than 3 clicks 

}
function start() {
  initialLoad()
  theGame.level++;
  changeCanvasImage();
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  nextLoad(); 
}

function restartLevel() {
  initialLoad();
  spriteX = 10;
  document.getElementsByClassName('score-value')[0].innerText = theGame.tracker - theGame.trackerByLevel[theGame.level];
  theGame.tracker = theGame.tracker - theGame.trackerByLevel[theGame.level]
  nextLoad();
}
function pause() {
  startGame = !startGame;
  if(startGame) {
    document.getElementsByClassName('pause')[0].innerText = 'Pause';
    pauseFlag = true;
    i=10000;
    mainLoop();
  } else {
    document.getElementsByClassName('pause')[0].innerText = 'Play';
  }
}
function openInstructions() {
   
  if(document.getElementsByClassName('inst')[0].hasAttribute('style','display:none')) {
    document.getElementsByClassName('inst')[0].removeAttribute('style','display:none');
  } else {
    document.getElementsByClassName('inst')[0].setAttribute('style','display:none');
  }
  
}
document.getElementsByClassName('inst')[0].setAttribute('style','display:none');
document.getElementById('characterModal').classList.add('show');
document.getElementById('characterModal').classList.add('show-popup');
// document.getElementById('modal-overlay').classList.add('hide-popup');

document.getElementsByClassName('goal-value')[0].innerText = theGame.setGoal(theGame.level);
document.getElementsByClassName('unlocked-bonus')[0].setAttribute('style','display:none');
document.getElementsByClassName('sales')[0].setAttribute('style','display:none');
document.getElementsByClassName('bonus-instructions')[0].setAttribute('style','display:none');