class Obstacle {
     /**
     * constructor for Player object
     * @param {x axis position on canvas} x 
     * @param {y axis position on canvas} y 
     * @param {width of player} width 
     * @param {height of player} height 
     * @param {default money type is random} obstacleType 
     */
    constructor(x,y,width,height,obstacleType){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.obstacleType = obstacleType; 
        this.pumpkinSpeed = -1;
    }

    revealObstacleType(obstacleType) {
        if(obstacleType === 1) {
            const rockImg = new Image();
            rockImg.src = "../images/rock.png";
            return rockImg;
        }
        if(obstacleType === 2) {
            const potholeImg = new Image();
            potholeImg.src = "../images/rock.png";
            return potholeImg;
        }
        if(obstacleType === 3) {
            const pumpkinImg = new Image();
            pumpkinImg.src = "../images/rock.png";
            return pumpkinImg;
        }
    }

    getObstacleValue(obstacleType, luckyCharmFlag) {
        let val;
       
      if(obstacleType === 1) {
          if(!luckyCharmFlag) {
            val = -10;
          } else {
            val = 10;
           
          }
        
      }
      if(obstacleType === 2) {
          if(!luckyCharmFlag) {
            val = -20;
          } else {
              val = 20;
              
          }
         
      }
      if(obstacleType === 3) {
        if(!luckyCharmFlag) {
          val = -40;
        } else {
            val = 40;
            
        }
       
    }
      return val;
    }

    movePumpkin( originalY, canvasHeight, obstacleType) {
        if(obstacleType === 3) {
            setTimeout(() => {
               setInterval(()=>{
                   
                    this.y=this.y*this.pumpkinSpeed;
                  
                
                },500);
            }, 1000)
           
            }

        }
      
}