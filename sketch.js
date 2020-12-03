var trex, trex_running, trex_collided,cloudsGrp, obsGrp;
var ground, invisibleGround, groundImage;
var cloud_still;
var o1, o2, o3, o4, o5, o6;
var score = 0; 
var gameState = "play";
var die;
var checkpoint;
var jump;


function preload(){
  trex_running = loadAnimation("trex1.png","trex4.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  die = loadSound("die.mp3")
 checkpoint = loadSound("jump.mp3")
  jump = loadSound("jump.mp3")
  
  groundImage = loadImage("ground2.png");
  cloud_still = loadImage("cloud.png");
  o1 = loadImage ("obstacle1.png");
  o2 = loadImage ("obstacle2.png");
  o3 = loadImage ("obstacle3.png");
  o4 = loadImage ("obstacle4.png");
  o5 = loadImage ("obstacle5.png");
  o6 = loadImage ("obstacle6.png");
}

function setup() {
  background(220)
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided);
  //trex.debug = true;
  trex.setCollider("circle",0,0,52.5);
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
 // console.log(rand)

  cloudsGrp = new Group();
  obsGrp = new Group();
}

function draw() {
  //set background color
  background(180);
  if(gameState === "play")
    {
      // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 156) {
    trex.velocityY = -12.5;
    jump.play();
  }
       spawnClouds()
  obstacles();
      
       trex.velocityY = trex.velocityY + 0.8
  
   ground.velocityX = -(7+3*score/100);
      
    if(score%100===0) {
     if(score !==0){
         checkpoint.play();
     }
    
      
    }
      
      
   if (ground.x < 0){
    ground.x = ground.width/2;
  }
      
  if(frameCount%5===0)
    score = score+1;
    if(obsGrp.isTouching(trex))
      {
        gameState = "end"
      
      }
      
      
      
      
    }
  else if(gameState==="end"){
    ground.velocityX = 0
    trex.velocityY = 0
    obsGrp.setVelocityXEach(0)
    cloudsGrp.setVelocityXEach(0)
    trex.changeAnimation("collided",trex_collided)
  textSize (12.5)
    text("Game Over, Press R To Restart",200,50)
    if(keyDown("r")){
      gameState ="play"
  obsGrp.destroyEach();
      cloudsGrp.destroyEach();
      score = 0;
    trex.changeAnimation("running", trex_running);
      
  }
    
  }
  textSize (20)
    text("score =" +score, 500,50) 

 
  

  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
    
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
  if(frameCount%70===0){
    var cloud = createSprite (600,Math.round(random(50,80)));
  cloud.velocityX = -3
    cloud.addImage (cloud_still);
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 600/3;
    cloudsGrp.add(cloud);
    
  }
  
}

function obstacles (){
  if(frameCount%70 ===0){
    var ob1 = createSprite (600,160);
    var r = Math.round(random(1,6));
    ob1.scale = 0.5
    ob1.lifetime = 600/7
    //ob1.debug = true;
  
  if(r===1){
    ob1.addImage(o1)
    
  }
  else
    if(r===2){
      ob1.addImage(o2)
    }
  else
    if(r===3){
      ob1.addImage(o3)
    }
  else
    if(r===4){
      ob1.addImage(o4)
      
    }
  else
    if(r===5){
      ob1.addImage(o5)
    }
  else
    if(r===6){
      ob1.addImage(o6)
    }
    obsGrp.add(ob1);
    
    ob1.velocityX = -7;
}  
}
