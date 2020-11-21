var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score=0;
var groundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("ground.webp")
}



function setup() {
 createCanvas(400,360) 
  
  //Ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;

  
  
  //monkey
   monkey = createSprite(50, 320, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 
  //score
  score = 0;

  FoodGroup =  createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  background(220)
  stroke("black");
    fill("black");
      textSize(20);
  text("Score:"+  score, 300, 30);
  
  
  if (gameState===PLAY){

  if(keyDown("space")&& monkey.y>300){
    monkey.velocityY=-12
  }
    
     if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
    
  monkey.velocityY=monkey.velocityY+0.6
  
  Food();
  obstacles(); 
  }
  
   if (ground.x <0){
    ground.x=ground.width/2;
  }
  
  monkey.collide(ground)
    
  
  if(obstaclesGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  
  if (gameState === END) {
     obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
    ground.setVelocity=0
     
    textSize(30);
  text("Game Over", 110, 200);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey got injured", 100, 240);
   }
  
  drawSprites();
}

function Food(){
  if(frameCount%50===0){
    banana= createSprite(400,310,40,10)
    banana.addImage(bananaImage)
    banana.y=Math.round(random(120,180))
    banana.scale=0.1
   
    banana.velocityX=-10
    banana.lifetime=40
    
    FoodGroup.add(banana)
  }
}

function obstacles(){
  if(frameCount %200===0){
    obstacle= createSprite(250,330,10,10);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -10;
    obstacle.lifetime = 25;
    obstacle.scale = 0.1 ;
    obstaclesGroup.add(obstacle);
  }
}


