import Player from "./player.js";
import Human from "./human.js";


export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.isPaused = false;
        this.isLose = false;
        this.isWin = false;
        this.isStart = false;
        addEventListener('keydown',event => {
            if(event.keyCode === 27){
                this.isPaused = !this.isPaused;
            }
        });
    }

    start(numHumans, timeSetting){
        this.isStart = true;
        this.player = new Player(this);
        this.gameObjects = [];
        this.lasers = [];
        this.humans = [];
        this.gameObjects.push(this.player);
        this.isSpawning = false;

        this.numHumans = numHumans;
        this.timeSetting = timeSetting;

        // if(!this.isPaused){
        //     this.spawning = setInterval(() => {
        //         this.humans.push(new Human(this));
        //     }, this.timeSetting);
        //     setTimeout(() => {
        //         clearInterval(this.spawning);
        //     },this.timeSetting * this.numHumans);

        // }

    }

    update(){
        if(!this.isLose){
            this.gameObjects.forEach((object) => object.update());
            this.lasers.forEach(object => object.update());
            this.humans.forEach(object => object.update());
        }
        for(let i = 0; i < this.lasers.length; i++){
            this.detectLaserCollision(this.lasers.at(i));
        }
        for(let i =0; i < this.humans.length; i++){
            this.detectHumanCollision(this.humans.at(i), i);
        }
        this.detectPlayerCollision(this.player);

        this.lasers = this.lasers.filter((laser) => !laser.isHit);
        this.lasers = this.lasers.filter((laser) => laser.time < 200);
        this.humans = this.humans.filter((human) => human.hp > 0);

        if(this.player.hp <= 0){
            this.lasers = null;
            this.humans = null;
            this.gameObjects = null;
            this.isLose = true;
        }

        if(!this.isPaused && this.numHumans > 0 && !this.player.isImmune){
            if(!this.isSpawning){
                this.isSpawning = true;
                this.humans.push(new Human(this));
                this.numHumans -= 1;
                setTimeout(() => {this.isSpawning = false}, this.timeSetting);
            }
        }

    }

    draw(ctx){
        if(!this.isLose){
            this.gameObjects.forEach((object) => object.draw(ctx));
            this.lasers.forEach(object => object.draw(ctx));
            this.humans.forEach(object => object.draw(ctx));
        }


    }

    detectLaserCollision(laser){
        for(let i = 0; i < this.humans.length; i++){
            if(laser.pos.x + laser.width > this.humans.at(i).pos.x
                && laser.pos.x < this.humans.at(i).pos.x + this.humans.at(i).width
                && laser.pos.y + laser.height > this.humans.at(i).pos.y
                && laser.pos.y < this.humans.at(i).pos.y + this.humans.at(i).height){
                    this.humans.at(i).isHit = true;
                    laser.isHit = true;
            }
        }
    }
    detectHumanCollision(human, index){
        for(let i = 0; i < this.humans.length; i++){
            if(human.pos.x < this.humans.at(i).pos.x + this.humans.at(i).width 
            && human.pos.x + human.width > this.humans.at(i).pos.x 
            && human.pos.y < this.humans.at(i).pos.y + this.humans.at(i).height 
            && human.pos.y + human.height > this.humans.at(i).pos.y && i != index){
                if(human.pos.x < this.humans.at(i).pos.x){
                    human.pos.x -= 1;
                } else{
                    human.pos.x += 1;
                }
                if(human.pos.y < this.humans.at(i).pos.y){
                    human.pos.y -= 1;
                } else{
                    human.pos.y += 1;
                }
            }
        }
    }
    detectPlayerCollision(player){
        for(let i = 0; i < this.humans.length; i++){
            if(player.pos.x < this.humans.at(i).pos.x + this.humans.at(i).width 
            && player.pos.x + player.width > this.humans.at(i).pos.x 
            && player.pos.y < this.humans.at(i).pos.y + this.humans.at(i).height 
            && player.pos.y + player.height > this.humans.at(i).pos.y){
                player.damaged();
            }
        }
    }
}
