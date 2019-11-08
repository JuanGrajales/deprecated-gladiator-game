class Sound {
    constructor(backgroundSrc, grabSoundSrc, damageSoundSrc){
        this.backgroundSrc = backgroundSrc;
        this.grabSoundSrc = grabSoundSrc;
        this.damageSoundSrc = damageSoundSrc;
        this.background = new Audio(backgroundSrc);
        this.grabSound = new Audio(grabSoundSrc);
        this.damageSound = new Audio(damageSoundSrc);
        this.timerSound = new Audio();
        this.timerSound.src= '../music/timer-ending.mp3'
        this.diamonSound = new Audio();
        this.diamonSound.src ='../music/diamond-sound.mov';
        this.walkingSound = new Audio();
        this.walkingSound.src ='../music/walking.mov'
        this.crashingSound = new Audio();
        this.crashingSound.src = "../music/crash-rock.mov"
        this.fallingSound = new Audio();
        this.fallingSound.src = "../music/falling-sound.mov"
        this.level2 = new Audio();
        this.level2.src = "../music/level2-main.mp3"
        this.level3 = new Audio();
        this.level3.src = "../music/level3-main.mp3"
        this.powerUpSound = new Audio();
        this.powerUpSound.src = '../music/power-up.mp3'
        this.explosionSound = new Audio();
        this.explosionSound.src = "../music/explosion-FX.mov"
        this.luckySound = new Audio();
        this.luckySound.src = "../music/lucky-charm-sound.mp3"
        this.winningSound = new Audio();
        this.winningSound.src = "../music/winning-sound-fx.mov"
        this.monsterDamageSound = new Audio();
        this.monsterDamageSound.src = "../music/monster-sound.mov"
        this.rockBreakingSound = new Audio();
        this.rockBreakingSound.src = "../music/rock-breaking.mov"
        this.sound = document.createElement("audio");
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        
    }

    playBackground(){
        this.background.play();
    }

    stopBackground(){
        console.log("Works")
        this.background.pause();
        
    }
    playLevel2(){
        this.level2.play();
    }

    playLevel3(){
        this.level3.play();
    }

    playGrabSound(){
        this.grabSound.play();
    }

    playDamageSound(){
        this.damageSound.play();
    }

    playTimerSound(){
        this.timerSound.play();
    }

    stopTimer(){
        this.timerSound.pause();
    }

    playDiamondSound(){
        this.diamonSound.play();
        
    }

    playWalkingSound(){
        this.walkingSound.play();
    }

    playCrashingSound(){
        this.crashingSound.play();
    }

    playFallingSound(){
        this.fallingSound.play();
    }

    stop(){
        this.pause();
    }

    playPowerUp(){
        this.powerUpSound.play();
    }

    stopPowerUp(){
        this.powerUpSound.pause();
    }

    playExplosion(){
        this.explosionSound.play();
    }

    playLuckySound(){
        this.luckySound.play();
    }

    stopLuckySound(){
        this.luckySound.pause();
    }

    stopObstaclesSound(){
        this.fallingSound.pause();
        this.crashingSound.pause();
    }

    playWinningSound(){
        this.winningSound.play();
    }

    playMonsterSound(){
        this.monsterDamageSound.play();
    }

    playRockBreakingSound(){
        this.rockBreakingSound.play();
    }


}
