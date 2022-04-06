import Game from "./game.js";
const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
canvas1.width = WIDTH;
canvas1.height = HEIGHT-4;
const button = document.getElementById('button1');


let numHumans = 200;
let timeSetting = 100;
let game = new Game(WIDTH,HEIGHT);
game.start(numHumans,timeSetting);
requestAnimationFrame(gameLoop);
button.onclick = function(){
    cancelAnimationFrame(req);
    game = new Game(WIDTH,HEIGHT);
    game.start(numHumans,timeSetting);
    requestAnimationFrame(gameLoop);
}

let req;
function gameLoop(){

    if(!game.isPaused){
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        game.update();
        game.draw(ctx); 
    } 
    ctx.clearRect(0,0,WIDTH/2,15);
    ctx.font = '200 px Ariel';
    ctx.strokeText(`playerHP: ${game.player.hp}    NumHumans: ${game.numHumans}      TimeSetting: ${game.timeSetting}    isPaused: ${game.isPaused}`, 5,10);

    if(!game.isWin && !game.isLose){
        req = requestAnimationFrame(gameLoop);
    } else{
        cancelAnimationFrame(req);
    }
}