class Game {
  /**
   * constructor for Game object
   * a Player object is initialzed with default values
   */
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.thePlayer = new Player(0,0,40,80);
    this.theMonster = new Monster(canvasWidth/7, canvasHeight/7, 60, 100);
    this.theMonster2 = new Monster(canvasWidth/200, canvasHeight/200, 60,100);
    this.moneyArray = [];

    this.theMonster3 = new Monsterr();
    
    this.tracker = 0;
    this.trackerByLevel = {};
    this.scoreByLevel = 0;
    this.goal = 0;
    this.r = 0;
    this.obs = 0;
    this.obstacleArray = [];
    this.level = 1;
    this.luckyCharmFlag = false;
    this.createMoney();
    this.theSound = new Sound('../music/background-1.mp3','../music/super mario bros coin sound FX.mp3','../music/ouch.mov');
    this.theSound1 = new Sound('../music/winning-sound-fx.mov','../music/super mario bros coin sound FX.mp3',"../music/ouch.mov");
    this.concealArray = [];
    this.createObstacle();
    this.playerSelected = 1;
    this.playerImage;
    this.createBackground();
    this.dirtArray = [];

  }

  /**
   * 
   * @param {*} level 
   */
  createRandomNumber(level) {
    let r;
    this.trackerByLevel[this.level] = 0;
    if(level === 1) {
      r = Math.floor(Math.random() * 20) + 12;
    }
    if(level === 2) {
        r = Math.floor(Math.random() * 40) + 15;
    }
    if(level === 3) {
      r = Math.floor(Math.random() * 60) + 20;
    }
    return r;
  }

  createRandomNumberForObstacle(level) {
    let r;
    if(level === 1) {
      r = Math.floor(Math.random() * 5) + 5;
    }
    if(level === 2) {
        r = Math.floor(Math.random() * 8) + 5;
    }
    if(level === 3) {
      r = Math.floor(Math.random() * 10) + 8;
  }
    return r;
  }

  /**
   * create a random amount of money objects on the map
   */
  createMoney() {
    this.moneyArray = [];
    // randomly creates number of money
    this.r = this.createRandomNumber(this.level);
    
    let moneyXPosition;
    let moneyYPosition;
    let moneyWidth = 25;
    let moneyHeight = 40

    for (let i = 0; i < this.r; i++) {
      moneyXPosition = Math.floor(Math.random() * (this.canvasWidth - moneyWidth));
      moneyYPosition = Math.floor(Math.random() * (this.canvasHeight - moneyHeight));
      if(moneyXPosition <= this.thePlayer.width)
        moneyXPosition += this.thePlayer.width;
      if(moneyXPosition <= this.thePlayer.height)
        moneyYPosition += this.thePlayer.height;
      this.moneyArray.push({i : new Money(moneyXPosition, moneyYPosition, moneyWidth, moneyHeight, Math.floor(Math.random() * 6) + 1)
      });
    }
  }

  createObstacle() {
    this.obstacleArray = [];
    // randomly creates number of money
    this.obs = this.createRandomNumberForObstacle(this.level);
    let obstacleXPosition;
    let obstacleYPosition;
    let obstacleWidth = 60;
    let obstacleHeight = 100;

    for (let i = 0; i < this.obs; i++) {
      obstacleXPosition = Math.floor(Math.random() * (this.canvasWidth - obstacleWidth));
      obstacleYPosition = Math.floor(Math.random() * (this.canvasHeight - obstacleHeight));
      if(obstacleXPosition <= this.thePlayer.width)
      obstacleXPosition += this.thePlayer.width;
      if(obstacleXPosition <= this.thePlayer.height)
      obstacleYPosition += this.thePlayer.height;
      this.obstacleArray.push({i : new Obstacle(obstacleXPosition, obstacleYPosition, obstacleWidth, obstacleHeight, Math.floor(Math.random() * 3) + 1)
      });
    }
  }

  createBackground(){
    this.concealArray = [];
    let backgroundX;
    let backgroundY;
    let backgroundWidth = 100;
    let backgroundHeight = 100;
    for(let i = 0; i<this.canvasWidth;i +=10){
      for(let j = 0; j<this.canvasHeight; j +=10){
        if(i === this.thePlayer.x && j === this.thePlayer.y){
          continue;
        }else{
        backgroundX = i;
        backgroundY = j;
        this.concealArray.push(new Background(backgroundX,backgroundY,backgroundWidth,backgroundHeight))
        }
      }
    }
  }

  setGoal(level) {
   if(level === 1) {
    this.goal = 1000;
   } 
   if(level === 2) {
     this.goal = 2000;
   }
   if(level === 3) {
     this.goal = 5000;
   }
    
    return this.goal;
  }

  /**
   * draw all the money to the canvas
   * @param {the context where the canvas is located} context 
   */
  drawMoney(context) {
    let moneyX;
    let moneyY;
    let moneyWidth;
    let moneyHeight;

    for(let i=0;i< this.moneyArray.length;i++) {
      moneyX = this.moneyArray[i].i.x;
      moneyY = this.moneyArray[i].i.y;
      moneyWidth = this.moneyArray[i].i.width;
      moneyHeight = this.moneyArray[i].i.height;
      context.drawImage(this.moneyArray[i].i.revealType(this.moneyArray[i].i.moneyType), moneyX, moneyY, moneyWidth, moneyHeight);
    }
  }

  drawObstacle(context) {
    let obstacleX;
    let obstacleY;
    let obstacleWidth;
    let obstacleHeight;

    for(let i=0;i< this.obstacleArray.length;i++) {
      obstacleX = this.obstacleArray[i].i.x;
      obstacleY = this.obstacleArray[i].i.y;
      obstacleWidth = this.obstacleArray[i].i.width;
      obstacleHeight = this.obstacleArray[i].i.height;
      context.drawImage(this.obstacleArray[i].i.revealObstacleType(this.obstacleArray[i].i.obstacleType), obstacleX, obstacleY, obstacleWidth, obstacleHeight);
    }
  }

  drawBackground(context) {
    let backgroundX;
    let backgroundY;
    let backgroundWidth =100;
    let backgroundHeight= 100;
    let backgroundSquare = new Image();
    backgroundSquare.src = '../images/dirt-background.png';
    for(let i=0; i< this.concealArray.length; i++){
      
      backgroundX = this.concealArray[i].x;
      backgroundY = this.concealArray[i].y
      context.drawImage(backgroundSquare, backgroundX,backgroundY,backgroundWidth,backgroundHeight);
      // context.globalCompositeOperation='destination-in';
      // context.beginPath();
      // context.arc(this.canvasWidth/2,this.canvasHeight/2,this.canvasHeight/2,0,Math.PI*2);
      // context.closePath();
      // context.fill();
    }
  }
applySelectedPlayer(playerSelected) {
    this.playerImage = this.thePlayer.getSelectedPlayer(playerSelected);
}

  drawDirt(context){
    let dirtX = Math.floor(Math.random() * this.canvasWidth)+1;
    let dirtY = Math.floor(Math.random() * this.canvasHeight)+1;
    let dirtWidth = 20;
    let dirtHeight = 20;
    let dirtPiece = new Image();
    dirtPiece.src = "../images/dirt-background.png";
    context.drawImage(dirtPiece,dirtX,dirtY,dirtWidth,dirtHeight);
  }

  /**
   * draw the player on the canvas
   * @param {passes the canvas context} context 
   */
  drawPlayer = (context, spriteX, spriteY) => {
    let playerX = this.thePlayer.x;
    let playerY = this.thePlayer.y;
    let playerWidth = this.thePlayer.width;
    let playerHeight = this.thePlayer.height;
    let spriteWidth = 64;
    let spriteHeight = 64;
      context.drawImage(this.playerImage, spriteX, spriteY, spriteWidth, spriteHeight, playerX, playerY, playerWidth, playerHeight);
    }
 
  
  /**
   * this function allows the player to choose a different character
   * @param {string: specifies the character the player wants} characterType 
   */
  // chooseCharacter(characterChosen) {
  //   switch(characterChosen) {
  //     case "test":
  //         const characterTheUserTypesImg = new Image();
  //         characterTheUserTypesImg.src = "../images/cartoon-miner.png";
  //         this.thePlayer.characterType = characterTheUserTypesImg;
  //         break;
  //   }
  // }

  /**
   * draw the monster on the canvas
   * @param {the context where the canvas is located} context 
   * @param {the obstacle object} obstacleObject 
   */
  drawMonster(context) {
    let monsterX = this.theMonster.x;
    let monsterY = this.theMonster.y;
    let monsterWidth = this.theMonster.width;
    let monsterHeight = this.theMonster.height;
    let monsterImage = this.theMonster.monsterType
    context.drawImage(monsterImage, monsterX, monsterY, monsterWidth, monsterHeight);
  }

  drawMonster3(context) {
    let monsterX3 = this.theMonster3.x;
    let monsterY3 = this.theMonster3.x;
    let monsterWidth3 = this.theMonster3.width;
    let monsterHeight3 = this.theMonster3.height;
    let monsterImage3 = this.theMonster3.monsterType1;
    context.drawImage(monsterImage3,monsterX3,monsterY3,monsterWidth3,monsterHeight3);
  }

  drawMonster2(context) {
    let monsterX2 = this.theMonster2.x;
    let monsterY2 = this.theMonster2.y;
    let monsterWidth2 = this.theMonster2.width;
    let monsterHeight2 = this.theMonster2.height;
    let monsterImage2 = this.theMonster2.monsterType1;
    context.drawImage(monsterImage2,monsterX2,monsterY2,monsterWidth2,monsterHeight2);
  }

  /**
   * this function allows the monster to be randomly change
   * @param {string: specifies the monster type} characterType 
   */
  randomizeMonster(monsterType) {
    switch(monsterType) {
      case "monsterTypes":
          const monsterTypesavailable = new Image();
          monsterTypesavailable.src = characterTheUserTypesImg
          this.theMonster.character = monsterTypesavailable;
          break;
    }
  }

  /**
   * detect if the player has collided with the monster or monies
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  collisionDetection(futureX, futureY) {
    let canMove = true;

    // the greater these values are the closer the player will be able to get to the object before it cannot move
    let rightCollissionProximity = 10;
    let leftCollissionProximity = 11;
    let topCollissionProximity = 25;
    let bottomCollissionProximity = 30;

    let playerRightSide = futureX + this.thePlayer.width - rightCollissionProximity;
    let playerLeftSide = futureX  + leftCollissionProximity;
    let playerTopSide = futureY + topCollissionProximity;
    let playerBottomSide = futureY + this.thePlayer.height - bottomCollissionProximity;

    let monsterRightSide = this.theMonster.x + this.theMonster.width;
    let monsterLeftSide = this.theMonster.x;
    let monsterTopSide = this.theMonster.y;
    let monsterBottomSide = this.theMonster.y + this.theMonster.height;

    
    let monsterRightSide2 = this.theMonster2.x + this.theMonster2.width;
    let monsterLeftSide2 = this.theMonster2.x;
    let monsterTopSide2 = this.theMonster2.y;
    let monsterBottomSide2 = this.theMonster2.y + this.theMonster2.height;


    /**
     * if the right and left side of the player are between then monsters left and right side &&
     * if the top and bottom side of the player are between then monsters top and bottom side
     */
    if(playerRightSide >= monsterLeftSide && playerLeftSide <= monsterRightSide && 
      playerBottomSide >= monsterTopSide && playerTopSide <= monsterBottomSide) {
      canMove = false;
      this.theSound.playDamageSound();
    }

   
  
    if(this.level === 3){
      
    if(playerRightSide >= monsterLeftSide2 && playerLeftSide <= monsterRightSide2 && 
      playerBottomSide >= monsterTopSide2 && playerTopSide <= monsterBottomSide2) {
      canMove = false;
      this.theSound.playDamageSound();
    }
  }

    // the greater these values are the closer the player will be able to get to the object before it cannot move
    rightCollissionProximity = 0;
    leftCollissionProximity = 10;
    topCollissionProximity = 0;
    bottomCollissionProximity = 0;

    this.moneyArray.forEach((e,index) => {
      if(playerRightSide >= e.i.x && playerLeftSide <= e.i.x + e.i.width && 
        playerBottomSide >= e.i.y && playerTopSide <= e.i.y + e.i.height) {
          
          this.moneyArray.splice(index, 1);
          this.trackScore(e.i.getMoneyValue(e.i.moneyType));
          if(e.i.moneyType ===2){
            this.theSound.playDiamondSound();
          }else{
          this.theSound.playGrabSound();
          }
          
        }
    })

    this.obstacleArray.forEach((e,index) => {
      if(playerRightSide >= e.i.x && playerLeftSide <= e.i.x + e.i.width && 
        playerBottomSide >= e.i.y && playerTopSide <= e.i.y + e.i.height) {
          if(e.i.obstacleType !== 1) {
            this.obstacleArray.splice(index, 1);
          } else {
            canMove = false;
          }
          
          this.trackScore(e.i.getObstacleValue(e.i.obstacleType, this.luckyCharmFlag));
          if(e.i.obstacleType === 1){
            this.theSound.playCrashingSound();
            if(this.luckyCharmFlag === true){
              this.theSound.stopObstaclesSound();
            }
          }else{
            this.theSound.playFallingSound();
            if(this.luckyCharmFlag === true){
              this.theSound.stopObstaclesSound();
            }
          }
        }
    })

    this.concealArray.forEach((e,index) => {
      if(playerRightSide >= e.x && playerLeftSide <= e.x + e.width && 
        playerBottomSide >= e.y && playerTopSide <= e.y + e.height) {
          e.x = -100;
          e.y = -100;
        }
    })
    return canMove;
  }

  // track the score and keeps adding it to the score element in the score-board
  trackScore(valueScored) {
    this.scoreByLevel = valueScored;
    this.tracker += valueScored;
     this.trackerByLevel[this.level] =+ this.scoreByLevel; 
    document.getElementsByClassName('score-value')[0].innerText = this.tracker;
  }

  // reset the game
  reset() {
    location.reload();
  }

  /**
   * detect if the player has collided with the monster or monies
   * @param {new x axis position on canvas} futureX 
   * @param {new y axis position on canvas} futureY 
   */
  monsterCollision(futureX, futureY) {
    let hit = false;

    // the greater these values are the closer the player will be able to get to the object before it cannot move
    let rightCollissionProximity = 10;
    let leftCollissionProximity = 11;
    let topCollissionProximity = 25;
    let bottomCollissionProximity = 30;

    let playerRightSide = futureX + this.thePlayer.width - rightCollissionProximity;
    let playerLeftSide = futureX  + leftCollissionProximity;
    let playerTopSide = futureY + topCollissionProximity;
    let playerBottomSide = futureY + this.thePlayer.height - bottomCollissionProximity;

    let monsterRightSide = this.theMonster3.x + this.theMonster3.frameWidth;
    let monsterLeftSide = this.theMonster3.x;
    let monsterTopSide = this.theMonster3.y;
    let monsterBottomSide = this.theMonster3.y + this.theMonster3.frameHeight;

    /**
     * if the right and left side of the player are between then monsters left and right side &&
     * if the top and bottom side of the player are between then monsters top and bottom side
     */
    if(playerRightSide >= monsterLeftSide && playerLeftSide <= monsterRightSide && 
      playerBottomSide >= monsterTopSide && playerTopSide <= monsterBottomSide) {
      hit = true;
      
      
    }
    return hit;
  }

  /**
     * player attacks
     */
    playerAttack() {

      this.thePlayer.attack = true;
      //if the monstercollision is true 
      // remove monster health
      // if zero health remove monster
      // have an attack variable
      // change sprite location
      if(this.monsterCollision(this.thePlayer.x + 15, this.thePlayer.y + 15)) {
        this.theMonster3.health -= 25;        
        this.theSound.playMonsterSound();
        if(this.theMonster3.health <= 0) {
          // figure out how to remove the monster
        }
      }

      // document.onkeyup = function (e) {
      //   while(e.key != "a") {
      //     if(this.monsterCollision(playerX, playerY)){
      //     }
      //   }
      // }
        
    }

}