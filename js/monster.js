class Monster {
    /**
     * 
     * @param {x axis position on canvas} x 
     * @param {y axis position on canvas} y 
     * @param {width of player} width 
     * @param {height of player} height 
     */
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = 100;

        // default character is a snake
        const snakeImg = new Image();
        snakeImg.src = "../images/enemy-snake.png";
        this.monsterType = snakeImg;
        const batImg = new Image();
        batImg.src = '../images/enemy-bat.png';
        this.monsterType1 = batImg

    }

    /**
     * randomly moves the monster throughout the board 
     * @param {canvas width} canvasWidth 
     * @param {canvas height} canvasHeight 
     */
    moveMonster(canvasWidth, canvasHeight) {
        let futureX = 0;
        let futureY = 0;
        let monsterSpeed = 10;
        let counter = 0;
        
         setInterval(()=>{
                futureX = Math.floor(Math.random()*canvasWidth-this.width);
                futureY = Math.floor(Math.random()*canvasWidth-this.height);
                if(this.checkMonsterBoundary(futureX, futureY, canvasWidth, canvasHeight)) {

                    this.x = futureX;
                    this.y = futureY;

             }
             
             
            let move = setInterval(()=>{
                if(this.checkMonsterBoundary(this.x + monsterSpeed, this.y + monsterSpeed, canvasWidth, canvasHeight)) {
                    
                    if(this.x%2 === 0 && this.y%2 === 0){
                       this.x += monsterSpeed; 
                       counter++;
                    } else if(this.x%2 !== 0 && this.y%2 !== 0){
                        this.x -= monsterSpeed;
                        counter++;
                    }
                    else if(this.x%2 === 0 && this.y%2 !== 0){
                        this.y += monsterSpeed;
                        counter++;
                    } else if(this.x%2 !== 0 && this.y%2 === 0){
                        this.y -= monsterSpeed;
                        counter++;
                    }
                    
                } else{
                     this.x = Math.floor(Math.random()*canvasWidth-this.width);
                     this.y = Math.floor(Math.random()*canvasWidth-this.height);
                     counter++;
                }
            },1000)
            if(counter>=10){
                clearInterval(move);
                counter = 0;
            }
           
            
        },10000)   
    
    }
    

    /**
     * checks if the new position of the monster is within the canvas
     * @param {new x axis position} futureX 
     * @param {new x axis position} futureY 
     * @param {canvas width} canvasWidth 
     * @param {canvas height} canvasHeight 
     */
    checkMonsterBoundary(futureX, futureY, canvasWidth, canvasHeight) {
        if(futureX + this.width <= canvasWidth && futureX >= 0 && 
            futureY + this.height <= canvasHeight && futureY >= 0) {
            return true;
        }
        return false;
    }

    
}