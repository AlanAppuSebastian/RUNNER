var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Runner,runner_running;
var back,backImg,invisibleGround;
var Coin,CoinImg,Police,PoliceImg;
var CoinGroup,PoliceGroup;
var gameOver,gameOverImg;
var restart,restartImg;

var score;

function preload(){
runner_running = loadAnimation("sub.png");
  //doraemon_fallen = loadAnimation("doraemon_fallen.png")
backImg = loadImage("download.jpg");
  
CoinImg = loadImage("coin.jpg");
PoliceImg = loadImage("TheInspector.png"); 
  
  gameOverImg = loadImage("gameover3.png");
  restartImg = loadImage("restart.png");
}
function setup() {
  createCanvas(600, 600);
  
  
  back = createSprite(600,300,400,20);
  back.addImage(backImg);
  back.scale = 2; 

  Runner = createSprite(80,490,20,50);
  Runner.addAnimation("running",runner_running);
  Runner.scale = 0.09;
  
  gameOver = createSprite(300,150);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,300);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.3;
  restart.scale = 1.2;
  
  invisibleGround = createSprite(200,510,800,10);
  invisibleGround.visible = false;
  
  CoinGroup = createGroup();
  PoliceGroup = createGroup();
  
//  Runner.setCollider("rectangle",0,0,Runner.width,Runner.height);
  Runner.debug = false;
  
  score = 0;
}

function draw() {
   background(255);
back.velocityX = -5;
  
  PoliceImg.scale=0.05;
  
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
  back.velocityX = -(4 + 3* score/100);
  
  
  if(back.x < 0){
    back.x = back.width/2;
  }
  
  if(keyDown("space") && Runner.y >= 300){
    Runner.velocityY = -20;
  }
    
  Runner.velocityY = Runner.velocityY + 1;
  
    //monkey.collide(ground);
  cake();
  Police();
  
    if(PoliceGroup.isTouching(Runner)) {
   gameState = END; 
    }
      if(CoinGroup.isTouching(Runner)){
      CoinGroup.destroyEach();
        score = score+2;
      }
   }
  
  else if(gameState === END){
    
   //Runner.changeAnimation("fallen",doraemon_fallen);
   CoinGroup.destroyEach();
    gameOver.visible = true;
      restart.visible = true;
     
    if(mousePressedOver(restart)) {
      reset();
    }
    
    back.velocityX = 0;
    Runner.velocityX = 0;
    Runner.velocityY = 0; 
    
    PoliceGroup.setLifetimeEach(-1);
    CoinGroup.setLifetimeEach(-1);
    
     PoliceGroup.setVelocityXEach(0);
     CoinGroup.setVelocityXEach(0); 
  
    }
  
  
  Runner.collide(invisibleGround);
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  textFont("algerian");
  text("SCORE : "+score,250,50);
 

}
function cake(){
  if(World.frameCount % 80 === 0){
   var cake = createSprite(550,500,10,10);
    cake.y = Math.round(random(100,450));
    cake.addImage(CoinImg);
    cake.scale = 0.06;
    cake.velocityX = -6;
    
    cake.lifetime = 100;
    
    cake.depth = Runner.depth;
    Runner.depth = Runner.depth+1;
  
    CoinGroup.add(cake);
  
  }
}
function Police(){
  if(World.frameCount % 100 === 0){  
  var Police = createSprite(400,470,10,10);
  Police.addImage(PoliceImg);
  Police.velocityX = -(6 + score/100);
  Police.scale = 0.5;
  Police.lifetime = 100;
  
  PoliceGroup.add(Police);
}
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  CoinGroup.destroyEach();
  PoliceGroup.destroyEach();
  Runner.changeAnimation("running",runner_running);
  score = 0;
}
