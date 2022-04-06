export default class Laser{
    constructor(game,direction){
        this.game = game;
        this.player = game.player;
        this.playerPos = {
            x: this.player.pos.x,
            y: this.player.pos.y
        }
        this.direction = direction;

        this.width = 32;
        this.height = 32;

        this.speed = {
            x: 5,
            y: 5,
        }

        this.pos = {
            x: this.player.pos.x,
            y: this.player.pos.y
        }

        this.mousePos ={
            x:1,
            y:0,
        }

        this.isHit = false;
        this.time = 0;

        this.img = new Image();
        this.img.src = './assets/player_pic.png'
        this.imgFrame = {
            x: 192,
            y: 192,
        }

    }
    update(){
        this.pos.x += this.speed.x * this.direction.x;
        this.pos.y += this.speed.y * this.direction.y;
        this.time += 1;

        if(this.speed.x * this.direction.x > 0 && Math.abs(this.speed.x * this.direction.x) > Math.abs(this.speed.y * this.direction.y)){
            this.imgFrame = {
                x:192,
                y:192,
            }
        }
        if(this.speed.x * this.direction.x < 0 && Math.abs(this.speed.x * this.direction.x) > Math.abs(this.speed.y * this.direction.y)){
            this.imgFrame = {
                x:224,
                y:192,
            }
        }
        if(this.speed.y * this.direction.y > 0 && Math.abs(this.speed.x * this.direction.x) < Math.abs(this.speed.y * this.direction.y)){
            this.imgFrame = {
                x:192,
                y:224,
            }
        }
        if(this.speed.y * this.direction.y < 0 && Math.abs(this.speed.x * this.direction.x) < Math.abs(this.speed.y * this.direction.y)){
            this.imgFrame = {
                x:256,
                y:192,
            }
        }
    }

    draw(ctx){
        ctx.drawImage(this.img, this.imgFrame.x,this.imgFrame.y,32,32,this.pos.x,this.pos.y,this.width,this.height);
    }

}