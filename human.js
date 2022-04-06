export default class Human{
    constructor(game){
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.player = game.player;
        this.lasers = game.player.lasers;

        this.speed = 0.5;
        this.width = 32;
        this.height = 32;
        this.seed =Math.ceil(Math.random() * 4);
        this.pos = {
            x:0,
            y:0,
        }
        switch(this.seed){
            case 1:
                this.pos = {
                    x:Math.floor(Math.random() * (this.gameWidth - this.width)),
                    y:0-this.height,
                }
                break;
            case 2:
                this.pos = {
                    x:Math.floor(Math.random() * (this.gameWidth - this.width)),
                    y:this.gameHeight,
                }
            case 3:
                this.pos = {
                    x:0-this.width,
                    y:Math.floor(Math.random() * (this.gameHeight - this.height)),
                }
                break;
            case 4:
                this.pos = {
                    x:this.gameWidth,
                    y:Math.floor(Math.random() * (this.gameHeight - this.height)),
                }
                break;
        }

        this.direction = {
            x:0,
            y:0,
        }

        setInterval(() =>{
            if(!this.player.isImmune){
                this.angle = Math.atan2(
                    this.player.pos.y - this.pos.y,
                    this.player.pos.x - this.pos.x );
                this.direction = {
                    x: Math.cos(this.angle),
                    y: Math.sin(this.angle)
                }
            } else{
                this.direction = {
                    x:0,
                    y:0,
                }
            }

        }, 1);


        this.hp = 1;
        this.isHit = false;

        this.img = new Image();
        this.img.src = './assets/human .png'
        this.imgFrame = {
            x: 0,
            y: 0,
        }
    }

    update(){
        this.pos.x += this.speed * this.direction.x;
        this.pos.y += this.speed * this.direction.y;
        if(this.isHit){
            this.hp -= 1;
            this.isHit = false;
        }

        if(this.speed * this.direction.x > 0 && Math.abs(this.speed * this.direction.x) > Math.abs(this.speed * this.direction.y)){
            this.imgFrame = {
                x:96,
                y:96,
            }
        }
        if(this.speed * this.direction.x < 0 && Math.abs(this.speed * this.direction.x) > Math.abs(this.speed * this.direction.y)){
            this.imgFrame = {
                x:0,
                y:96,
            }
        }
        if(this.speed * this.direction.y > 0 && Math.abs(this.speed * this.direction.x) < Math.abs(this.speed * this.direction.y)){
            this.imgFrame = {
                x:0,
                y:0,
            }
        }
        if(this.speed * this.direction.y < 0 && Math.abs(this.speed * this.direction.x) < Math.abs(this.speed * this.direction.y)){
            this.imgFrame = {
                x:96,
                y:0,
            }
        }
    }

    draw(ctx){
        ctx.drawImage(this.img, this.imgFrame.x,this.imgFrame.y,32,32,this.pos.x,this.pos.y,this.width,this.height);
    }

    



}