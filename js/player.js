class Player {
    /**
     * constructor for Player object
     * @param {x axis position on canvas} x 
     * @param {y axis position on canvas} y 
     * @param {width of player} width 
     * @param {height of player} height 
     * @param {default charater type is a miner} characterType 
     */
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = 100;

        this.attack = false;

        this.pDirection = "r";
    }
getSelectedPlayer(imageType){
    let characterType;
    if(imageType === 1) {
        const goldArmorImg = new Image();
        goldArmorImg.src = "../images/hss-sprite.png";
            characterType = goldArmorImg;
    }
    if(imageType === 2) {
        const monsterImg = new Image();
        monsterImg.src = "../images/hsd-sprite.png";
        characterType = monsterImg;
       
    }
    if(imageType === 3) {
        const elfImg = new Image();
        elfImg.src = "../images/hgs-sprite.png";
        characterType = elfImg; 
    }
    if(imageType === 4) {
        const elfImg = new Image();
        elfImg.src = "../images/hgd-sprite.png";
        characterType = elfImg; 
    }

    if(imageType === 5) {
        const goldArmorImg = new Image();
        goldArmorImg.src = "../images/oss-sprite.png";
            characterType = goldArmorImg;
    }
    if(imageType === 6) {
        const monsterImg = new Image();
        monsterImg.src = "../images/osd-sprite.png";
        characterType = monsterImg;
       
    }
    if(imageType === 7) {
        const elfImg = new Image();
        elfImg.src = "../images/ogs-sprite.png";
        characterType = elfImg; 
    }
    if(imageType === 8) {
        const elfImg = new Image();
        elfImg.src = "../images/ogd-sprite.png";
        characterType = elfImg; 
    }

    if(imageType === 9) {
        const goldArmorImg = new Image();
        goldArmorImg.src = "../images/sss-sprite.png";
            characterType = goldArmorImg;
    }
    if(imageType === 10) {
        const monsterImg = new Image();
        monsterImg.src = "../images/ssd-sprite.png";
        characterType = monsterImg;
       
    }
    if(imageType === 11) {
        const elfImg = new Image();
        elfImg.src = "../images/sgs-sprite.png";
        characterType = elfImg; 
    }
    if(imageType === 12) {
        const elfImg = new Image();
        elfImg.src = "../images/sgd-sprite.png";
        characterType = elfImg; 
    }
   return characterType;  
}
    /**
     * move method for Player object
     * @param {new x axis position on canvas} futureX 
     * @param {new y axis position on canvas} futureY 
     * @param {canvas width} canvasWidth 
     * @param {canvas height} canvasHeight 
     */
    movePlayer(futureX, futureY, canvasWidth, canvasHeight) {
        if(futureX + this.width <= canvasWidth && futureX >= 0 && 
            futureY + this.height <= canvasHeight && futureY >= 0) {
            this.x = futureX;
            this.y = futureY;
        }
    }

    
}
