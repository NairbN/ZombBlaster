
import { boolean } from "boolean";
import Laser from "./laser.js";

export default class Player{
    constructor(game){
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        
        this.isShooting = false;
        this.isMovingVert = false;
        this.isMovingHorizontal = false;
        
        this.width = 32;
        this.height = 32;

        this.pos = {
            x: this.gameWidth/2 - this.width/2,
            y: this.gameHeight/2 - this.height/2,
        }

        this.movSpeed = {
            x:0,
            y:0,
        }

        this.maxSpeed = 1;

        this.hp = 3;
        this.isImmune = false;

        addEventListener('keydown', event =>{
            if(!game.isPaused){
                switch(event.keyCode){
                    case 87:
                        if(!this.isMovingVert){
                            this.isMovingVert = true;
                            this.movSpeed.y += -1 * this.maxSpeed;
                        }
                        break;
                    case 83:
                        if(!this.isMovingVert){
                            this.isMovingVert = true;
                            this.movSpeed.y += 1 * this.maxSpeed;
                        }
                        break;
                    case 65:
                        if(!this.isMovingHorizontal){
                            this.isMovingHorizontal = true;
                            this.movSpeed.x += -1 * this.maxSpeed;
                        }
                        break;
                    case 68:
                        if(!this.isMovingHorizontal){
                            this.isMovingHorizontal = true;
                            this.movSpeed.x += 1 * this.maxSpeed;
                        }
                        break;
                }
            }
        });

        addEventListener('keyup', event =>{
            switch(event.keyCode){
                case 87:
                    if(this.isMovingVert){
                        this.isMovingVert = false;
                        this.moveStopVert();
                    }
                    break;
                case 83:
                    if(this.isMovingVert){
                        this.isMovingVert = false;
                        this.moveStopVert();
                    }
                    break;
                case 65:
                    if(this.isMovingHorizontal){
                        this.isMovingHorizontal = false;
                        this.moveStopHorizontal();
                    }
                    break;
                case 68:
                    if(this.isMovingHorizontal){
                        this.isMovingHorizontal = false;
                        this.moveStopHorizontal();
                    }
                    break;
            }
        });

        addEventListener('click', event =>{
            if(!game.isPaused){
                if(!this.isShooting && !this.isImmune){
                    this.isShooting = true;
                    this.angle = Math.atan2(
                        event.clientY - this.pos.y,
                        event.clientX - this.pos.x,
                    )
                    this.direction = {
                        x: Math.cos(this.angle),
                        y: Math.sin(this.angle)
                    }
                    this.shoot();
                }
            }


        });

        this.img = new Image();
        this.img.src = './assets/player_pic.png'
        this.imgFrame = {
            x: 0,
            y: 0,
        }


    }

    update(){
        
        this.pos.y += this.movSpeed.y;
        this.pos.x += this.movSpeed.x;
        if(this.pos.x < 0){
            this.pos.x = 0;
        }
        if(this.pos.x > this.gameWidth - this.width){
            this.pos.x = this.gameWidth - this.width;
        }
        if(this.pos.y < 0){
            this.pos.y = 0;
        }
        if(this.pos.y > this.gameHeight - this.height){
            this.pos.y = this.gameHeight - this.height;
        }

        if(this.movSpeed.x > 0 && Math.abs(this.movSpeed.x) >= Math.abs(this.movSpeed.y)){
            this.imgFrame = {
                x:0,
                y:96,
            }

        }

        if(!this.isImmune){
            if(this.movSpeed.x > 0 && Math.abs(this.movSpeed.x) >= Math.abs(this.movSpeed.y)){
                this.imgFrame = {
                    x:0,
                    y:96,
                }
    
            }
            if(this.movSpeed.x < 0 && Math.abs(this.movSpeed.x) >= Math.abs(this.movSpeed.y)){
                this.imgFrame = {
                    x:192,
                    y:0,
                }
            }
            if(this.movSpeed.x === 0 && this.movSpeed.y === 0){
                this.imgFrame = {
                    x: 0,
                    y: 0,
                }
            }
            if(this.movSpeed.y > 0 && Math.abs(this.movSpeed.y) > Math.abs(this.movSpeed.x)){
                this.imgFrame = {
                    x:0,
                    y:0,
                }
            }
            if(this.movSpeed.y < 0 && Math.abs(this.movSpeed.y) > Math.abs(this.movSpeed.x)){
                this.imgFrame = {
                    x:96,
                    y:0,
                }
                
            }
        } else {
            if(this.movSpeed.x > 0 && Math.abs(this.movSpeed.x) >= Math.abs(this.movSpeed.y)){
                this.imgFrame = {
                    x:96,
                    y:192,
                }
    
            }
            if(this.movSpeed.x < 0 && Math.abs(this.movSpeed.x) >= Math.abs(this.movSpeed.y)){
                this.imgFrame = {
                    x:0,
                    y:192,
                }
            }
            if(this.movSpeed.x === 0 && this.movSpeed.y === 0){
                this.imgFrame = {
                    x: 96,
                    y: 96,
                }
            }
            if(this.movSpeed.y > 0 && Math.abs(this.movSpeed.y) > Math.abs(this.movSpeed.x)){
                this.imgFrame = {
                    x:96,
                    y:96,
                }
            }
            if(this.movSpeed.y < 0 && Math.abs(this.movSpeed.y) > Math.abs(this.movSpeed.x)){
                this.imgFrame = {
                    x:192,
                    y:96,
                }
                
            }
        }

    }

    draw(ctx){
        ctx.drawImage(this.img, this.imgFrame.x,this.imgFrame.y,32,32,this.pos.x,this.pos.y,this.width,this.height); 
    }

    moveStopHorizontal(){
        this.movSpeed.x = 0;
    }

    moveStopVert(){
        this.movSpeed.y = 0;
    }

    shoot(){
        this.game.lasers.push(new Laser(this.game,this.direction));

        setTimeout(() =>{
            this.isShooting = false;
        }, 10);
    }

    damaged(){
        if(!this.isImmune){
            this.hp -= 1;
            this.isImmune = true;
            setTimeout(() => {
                this.isImmune = false;
            },3000);
        }
    }
}
