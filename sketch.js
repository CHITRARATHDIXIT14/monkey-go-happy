var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,banana_img
var stone,stone_image;
var Foodgroup;
var stonegroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0


function preload(){
  backImage=loadImage("sprites/jungle.jpg");
  player_running = loadAnimation("sprites/Monkey_01.png","sprites/Monkey_02.png","sprites/Monkey_03.png","sprites/Monkey_04.png","sprites/Monkey_05.png","sprites/Monkey_06.png","sprites/Monkey_07.png","sprites/Monkey_08.png","sprites/Monkey_09.png","sprites/Monkey_10.png");
  banana_img=loadImage("sprites/banana.png")
stone_image=loadImage("sprites/stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
Foodgroup = new Group();
stonegroup = new Group();

}

function draw() { 
  background(0);

  
   
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    spawnfood();
    spawnstone();
    player.collide(ground);

  }  

if(player.isTouching(Foodgroup)){
  Foodgroup.destroyEach();
score +=  2;
player.scale += +0.05
}


if(player.isTouching(stonegroup)){
gameState = END;
}

else if(gameState === END){

  player.visible=false;
  backgr.velocityX=0;

  Foodgroup.destroyEach();
  stonegroup.destroyEach();

  stroke(100);
  textSize(50)
fill(255)
text("GAME OVER",400,200)
}

  drawSprites();
  textSize(20)
  stroke(100)
  fill("#F7F7F7")
  text("SCORE:"+score,650,20)
 
}

function spawnfood(){
if(frameCount%80===0){

  banana=createSprite(680,200,5,5)
  banana.addImage(banana_img)
  banana.y=random(120,200)
  banana.scale=0.05
  banana.velocityX=-5

  banana.lifetime=150
  player.depth = banana.depth +1 
 
  Foodgroup.add(banana);
}

}

function spawnstone(){
if(frameCount%100===0){
stone=createSprite(800,340,20,20)
stone.addImage(stone_image)
stone.scale = 0.2;
stone.velocityX=-8

stone.lifetime=150;
stonegroup.add(stone);

}
}